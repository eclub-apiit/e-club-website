-- Run after 003. Additive upgrade: no rooms, accounts, answers or scores are deleted.
begin;
alter table summit_game_private.rooms add column if not exists auto_pace boolean not null default false;
alter table summit_game_private.rooms add column if not exists next_round_at timestamptz;
create or replace function summit_game_private.scoreboard(room uuid,run uuid default null) returns jsonb language sql security definer set search_path='' as $$
 select coalesce(jsonb_agg(to_jsonb(ranked) order by ranked.score desc,ranked.nickname),'[]'::jsonb) from (
  select totals.*,rank() over(order by totals.score desc)::int rank from (
   select p.id,p.nickname,coalesce(sum(g.points) filter(where not r.voided and (run is null or r.run_id=run)),0)::int score,
    count(*) filter(where g.solved and not r.voided and (run is null or r.run_id=run))::int solved
   from summit_game_private.players p left join summit_game_private.progress g on g.player_id=p.id
   left join summit_game_private.rounds r on r.id=g.round_id
   where p.room_id=room and p.active group by p.id,p.nickname
  ) totals
 ) ranked
$$;

create or replace function summit_game_private.next_round(room uuid) returns void language plpgsql security definer set search_path='' as $$
declare rm summit_game_private.rooms;ru summit_game_private.runs;q summit_game_private.questions;ri uuid;sec int;data jsonb;letters text;
begin
 select * into rm from summit_game_private.rooms where id=room;
 select * into ru from summit_game_private.runs where id=rm.run_id;
 if ru.cursor>=cardinality(ru.plan) then update summit_game_private.rooms set phase='finished',auto_pace=false,next_round_at=null where id=room;return;end if;
 select * into q from summit_game_private.questions where id=ru.plan[ru.cursor+1];
 sec:=case when ru.seconds_override>0 then ru.seconds_override else case q.difficulty when 'easy' then 25 when 'medium' then 35 else 45 end + case when ru.minutes=15 then 5 else 0 end end;
 data:=q.public_data;
 if q.game='shuffle' then
  select string_agg(c,'' order by random()) into letters from regexp_split_to_table(regexp_replace(upper(q.answers->>0),'[^A-Z]','','g'),'') c;
  if letters=replace(q.answers->>0,' ','') then letters:=substr(letters,2)||left(letters,1);end if;
  data:=data||jsonb_build_object('letters',letters);
 end if;
 insert into summit_game_private.rounds(run_id,question_id,number,seconds,public_data,resumed_at,deadline)
 values(ru.id,q.id,ru.cursor+1,sec,data,clock_timestamp(),clock_timestamp()+make_interval(secs=>sec)) returning id into ri;
 update summit_game_private.runs set cursor=cursor+1 where id=ru.id;
 update summit_game_private.rooms set round_id=ri,phase='question',next_round_at=null where id=room;
end $$;

create or replace function summit_game_private.tick(p_room uuid) returns void language plpgsql security definer set search_path='' as $$
declare rm summit_game_private.rooms;rd summit_game_private.rounds;mins int;begin
 select * into rm from summit_game_private.rooms where id=p_room;
 if not found or not rm.auto_pace or rm.expires_at<=clock_timestamp() or rm.phase not in ('question','reveal') then return;end if;
 select * into rd from summit_game_private.rounds where id=rm.round_id;
 if not ((rm.phase='question' and rd.deadline<=clock_timestamp()) or (rm.phase='reveal' and rm.next_round_at<=clock_timestamp())) then return;end if;
 select * into rm from summit_game_private.rooms where id=p_room for update skip locked;
 if not found or not rm.auto_pace then return;end if;
 select * into rd from summit_game_private.rounds where id=rm.round_id;
 if rm.phase='question' and rd.deadline<=clock_timestamp() then
  select minutes into mins from summit_game_private.runs where id=rm.run_id;
  update summit_game_private.rounds set elapsed=elapsed+greatest(0,extract(epoch from deadline-resumed_at)),revealed_at=clock_timestamp() where id=rd.id;
  update summit_game_private.rooms set phase='reveal',next_round_at=clock_timestamp()+make_interval(secs=>case when mins=15 then 10 else 15 end) where id=rm.id;
 elsif rm.phase='reveal' and rm.next_round_at<=clock_timestamp() then
  perform summit_game_private.next_round(rm.id);
 else return;end if;
 update summit_game_private.rooms set revision=revision+1,board_cache=summit_game_private.scoreboard(id,run_id) where id=rm.id;
end $$;

create or replace function public.sg_create_room(p_title text) returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=summit_game_private.require_host();rm summit_game_private.rooms;pin text;begin
 if length(trim(p_title)) not between 3 and 60 then raise exception 'Use a room title of 3–60 characters.';end if;
 if (select count(*) from summit_game_private.rooms where host_id=u and expires_at>clock_timestamp())>=5 then raise exception 'You already have five active rooms. Delete an old room first.';end if;
 loop
  pin:=(floor(random()*900000)+100000)::int::text;
  begin insert into summit_game_private.rooms(host_id,pin,title,auto_pace) values(u,pin,trim(p_title),true) returning * into rm;exit;
  exception when unique_violation then null;end;
 end loop;
 return jsonb_build_object('id',rm.id,'pin',rm.pin);
end $$;

create or replace function public.sg_state(p_pin text,p_token text default null) returns jsonb language plpgsql security definer set search_path='' as $$
declare rm summit_game_private.rooms;ru summit_game_private.runs;rd summit_game_private.rounds;q summit_game_private.questions;pl summit_game_private.players;
 pr summit_game_private.progress;own_score jsonb;tie_count int;phase text;data jsonb;elapsed numeric:=0;clue_count int;me jsonb:=null;board jsonb:='[]';rev jsonb:=null;total int;answered int;
begin
 select * into rm from summit_game_private.rooms where pin=p_pin;
 if not found or rm.expires_at<=clock_timestamp() then raise exception 'Room not found or expired.';end if;
 perform summit_game_private.tick(rm.id);select * into rm from summit_game_private.rooms where id=rm.id;
 phase:=rm.phase;
 if rm.run_id is not null then select * into ru from summit_game_private.runs where id=rm.run_id;end if;
 if rm.round_id is not null then
  select * into rd from summit_game_private.rounds where id=rm.round_id;
  select * into q from summit_game_private.questions where id=rd.question_id;
  elapsed:=rd.elapsed+case when rm.phase='question' then greatest(0,extract(epoch from clock_timestamp()-rd.resumed_at)) else 0 end;
  if rm.phase='question' and rd.deadline<=clock_timestamp() then phase:='locked';end if;
  data:=rd.public_data;
  if q.game='brand' and phase in ('question','paused','locked') then
   clue_count:=least(3,1+floor(elapsed/(rd.seconds::numeric/3))::int);
   data:=(data-'clues')||jsonb_build_object('clues',(select jsonb_agg(value) from jsonb_array_elements(data->'clues') with ordinality t(value,n) where n<=clue_count));
  end if;
  if q.game='deal' and data->>'format'='pivot' then
   data:=data||jsonb_build_object('updateReady',not coalesce((data->>'hasUpdate')::boolean,false) or elapsed>=rd.seconds::numeric/2 or phase in ('reveal','finished'));
   if not (data->>'updateReady')::boolean then data:=data-'update';end if;
  end if;
  if phase in ('reveal','finished') then rev:=jsonb_build_object('answer',q.answers->>0,'answerLabel',coalesce((select upper(value->>'id')||' · '||(value->>'text') from jsonb_array_elements(q.public_data->'options') where value->>'id'=q.answers->>0),q.answers->>0),'explanation',q.explanation,'source',q.source,'voided',rd.voided);end if;
 end if;
 if p_token is not null then
  select * into pl from summit_game_private.players where room_id=rm.id and token_hash=summit_game_private.token_hash(p_token);
  if not found or not pl.active then raise exception 'Player session is not active. Rejoin or ask the host.';end if;
  select * into pr from summit_game_private.progress where player_id=pl.id and round_id=rm.round_id;
  me:=jsonb_build_object('id',pl.id,'nickname',pl.nickname,'attempts',coalesce(pr.attempts,0),'hints',coalesce(pr.hints,0),'solved',coalesce(pr.solved,false),'points',coalesce(pr.points,0));
  if coalesce(pr.hints,0)>0 then me:=me||jsonb_build_object('hint','Starts with '||left(q.answers->>0,case when pr.hints=1 then 1 else 3 end));end if;
  if phase in ('reveal','finished') then
   select value into own_score from jsonb_array_elements(rm.board_cache) where value->>'id'=pl.id::text;
   if own_score is not null then
    select count(*)::int into tie_count from jsonb_array_elements(rm.board_cache) where (value->>'score')::int=(own_score->>'score')::int;
    me:=me||jsonb_build_object('standing',own_score||jsonb_build_object('tied',tie_count>1));
   end if;
  end if;
 end if;
 if phase in ('lobby','reveal','finished') then select coalesce(jsonb_agg(value),'[]') into board from jsonb_array_elements(rm.board_cache) with ordinality b(value,n) where n<=25;end if;
 select count(*)::int into total from summit_game_private.players where room_id=rm.id and active;
 select count(*)::int into answered from summit_game_private.progress g join summit_game_private.players p on p.id=g.player_id where g.round_id=rm.round_id and g.attempts>0 and p.active;
 return jsonb_build_object('serverTime',extract(epoch from clock_timestamp())*1000,'room',jsonb_build_object('id',rm.id,'pin',rm.pin,'title',rm.title,'phase',phase,'autoPace',rm.auto_pace,'nextRoundAt',extract(epoch from rm.next_round_at)*1000,'joinOpen',rm.join_open,'revision',rm.revision,'runId',rm.run_id,'game',ru.game,'roundNumber',ru.cursor,'roundCount',cardinality(ru.plan),'minutes',ru.minutes,'hintsEnabled',ru.hints,'expiresAt',rm.expires_at),
 'round',case when rd.id is not null then jsonb_build_object('id',rd.id,'difficulty',q.difficulty,'seconds',rd.seconds,'deadline',extract(epoch from rd.deadline)*1000,'remaining',rd.remaining,'elapsed',elapsed,'revealedAt',extract(epoch from rd.revealed_at)*1000,'data',data) else null end,
 'me',me,'board',board,'reveal',rev,'counts',jsonb_build_object('players',total,'answered',answered));
end $$;

create or replace function public.sg_host_state(p_room_id uuid) returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=summit_game_private.require_host();rm summit_game_private.rooms;s jsonb;begin
 select * into rm from summit_game_private.rooms where id=p_room_id and host_id=u;
 if not found then raise exception 'Room is not owned by this host.' using errcode='42501';end if;
 s:=public.sg_state(rm.pin,null);
 return s||jsonb_build_object('gameRoster',summit_game_private.scoreboard(rm.id,rm.run_id),'roster',summit_game_private.scoreboard(rm.id,null),'removed',(select coalesce(jsonb_agg(jsonb_build_object('id',id,'nickname',nickname)),'[]'::jsonb) from summit_game_private.players where room_id=rm.id and not active));
end $$;

create or replace function public.sg_control(p_room_id uuid,p_action text,p_revision integer,p_options jsonb default '{}') returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=summit_game_private.require_host();rm summit_game_private.rooms;rd summit_game_private.rounds;run uuid;ids text[]:='{}';picked text[];counts int[];lvl text;needed int;minutes int;profile text;override_sec int;g text;idx int:=0;begin
 select * into rm from summit_game_private.rooms where id=p_room_id and host_id=u for update;
 if not found then raise exception 'Room is not owned by this host.' using errcode='42501';end if;
 if rm.revision<>p_revision then raise exception 'Room changed in another tab. Refresh and try again.' using errcode='40001';end if;
 select * into rd from summit_game_private.rounds where id=rm.round_id;
 if p_action='start' then
  if rm.phase in ('question','paused') then raise exception 'Finish or reveal the current round before changing games.';end if;
  g:=p_options->>'game';minutes:=coalesce((p_options->>'minutes')::int,10);profile:=coalesce(p_options->>'profile','progressive');override_sec:=coalesce((p_options->>'seconds')::int,0);
  if g not in ('shuffle','brand','deal') or g is null or minutes not in (10,15) or profile not in ('progressive','gentle','challenge') or (override_sec<>0 and override_sec not between 15 and 120) then raise exception 'Invalid game settings.';end if;
  counts:=case when profile='gentle' then case when minutes=15 then array[8,6,4] else array[6,4,2] end when profile='challenge' then case when minutes=15 then array[4,6,8] else array[2,4,6] end else case when minutes=15 then array[6,6,6] else array[4,4,4] end end;
  foreach lvl in array array['easy','medium','hard'] loop
   idx:=idx+1;needed:=counts[idx];
   select array_agg(id) into picked from (select id from summit_game_private.questions where game=g and difficulty=lvl and (game<>'deal' or public_data->>'format'='pivot') and not coalesce(p_options->'exclude','[]'::jsonb) ? id order by random() limit needed) t;
   if coalesce(cardinality(picked),0)<needed then raise exception 'Not enough % questions. Restore excluded questions or choose another pace.',lvl;end if;
   ids:=ids||picked;
  end loop;
  insert into summit_game_private.runs(room_id,game,plan,minutes,profile,seconds_override,hints) values(rm.id,g,ids,minutes,profile,override_sec,coalesce((p_options->>'hints')::boolean,true)) returning id into run;
  update summit_game_private.rooms set run_id=run where id=rm.id;perform summit_game_private.next_round(rm.id);
 elsif p_action='pause' then
  if rm.phase<>'question' or rd.deadline<=clock_timestamp() then raise exception 'Only an active round can be paused.';end if;
  update summit_game_private.rounds set elapsed=elapsed+extract(epoch from clock_timestamp()-resumed_at),remaining=greatest(0,extract(epoch from deadline-clock_timestamp())) where id=rd.id;
  update summit_game_private.rooms set phase='paused' where id=rm.id;
 elsif p_action='resume' then
  if rm.phase<>'paused' then raise exception 'This round is not paused.';end if;
  update summit_game_private.rounds set resumed_at=clock_timestamp(),deadline=clock_timestamp()+make_interval(secs=>remaining::double precision) where id=rd.id;
  update summit_game_private.rooms set phase='question' where id=rm.id;
 elsif p_action='extend' then
  if rm.phase not in ('question','paused') then raise exception 'Start a round first.';end if;
  if rm.phase='paused' then update summit_game_private.rounds set remaining=remaining+15 where id=rd.id;
  else update summit_game_private.rounds set deadline=greatest(deadline,clock_timestamp())+interval '15 seconds' where id=rd.id;end if;
 elsif p_action in ('reveal','void','finish') then
  if rd.id is not null then
   update summit_game_private.rounds set elapsed=elapsed+case when rm.phase='question' then extract(epoch from clock_timestamp()-resumed_at) else 0 end,revealed_at=clock_timestamp(),voided=voided or p_action='void' where id=rd.id;
  end if;
  update summit_game_private.rooms set phase=case when p_action='finish' then 'finished' else 'reveal' end,
   auto_pace=case when p_action in ('finish','void') then false else auto_pace end,
   next_round_at=case when auto_pace and p_action='reveal' then clock_timestamp()+make_interval(secs=>case when (select planned.minutes from summit_game_private.runs planned where planned.id=rm.run_id)=15 then 10 else 15 end) else null end where id=rm.id;
 elsif p_action='next' then
  if rm.phase<>'reveal' then raise exception 'Reveal the current round before moving on.';end if;
  perform summit_game_private.next_round(rm.id);
 elsif p_action='autopace' then
  update summit_game_private.rooms set auto_pace=coalesce((p_options->>'enabled')::boolean,false),
   next_round_at=case when coalesce((p_options->>'enabled')::boolean,false) and phase='reveal' then clock_timestamp()+make_interval(secs=>case when (select planned.minutes from summit_game_private.runs planned where planned.id=rm.run_id)=15 then 10 else 15 end) else null end where id=rm.id;
 elsif p_action='joining' then update summit_game_private.rooms set join_open=not join_open where id=rm.id;
 elsif p_action='remove' then update summit_game_private.players set active=false where room_id=rm.id and id=(p_options->>'playerId')::uuid;
 elsif p_action='delete' then delete from summit_game_private.rooms where id=rm.id;return jsonb_build_object('deleted',true);
 else raise exception 'Unknown host action.';end if;
 update summit_game_private.rooms set revision=revision+1,board_cache=summit_game_private.scoreboard(id,run_id) where id=rm.id;
 return public.sg_host_state(rm.id);
end $$;
update summit_game_private.rooms set board_cache=summit_game_private.scoreboard(id,run_id);
-- Default function privileges are broad in Postgres: explicitly restrict each API.
revoke all on all functions in schema summit_game_private from public,anon,authenticated;
revoke all on function public.sg_host_rooms(),public.sg_create_room(text),public.sg_bank(),public.sg_host_state(uuid),public.sg_control(uuid,text,integer,jsonb) from public,anon,authenticated;
grant execute on function public.sg_host_rooms(),public.sg_create_room(text),public.sg_bank(),public.sg_host_state(uuid),public.sg_control(uuid,text,integer,jsonb) to authenticated;
revoke all on function public.sg_join(text,text,text),public.sg_state(text,text),public.sg_answer(text,text,uuid,text,uuid,boolean) from public,anon,authenticated;
grant execute on function public.sg_join(text,text,text),public.sg_state(text,text),public.sg_answer(text,text,uuid,text,uuid,boolean) to anon,authenticated;
commit;
