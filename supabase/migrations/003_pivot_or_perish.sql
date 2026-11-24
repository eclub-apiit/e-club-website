-- Existing installation upgrade: finish active games, run this file, then re-run 002.
-- Preserves rooms and results; old Deal Dash questions are excluded from new games.
begin;
create or replace function public.sg_bank() returns jsonb language plpgsql security definer set search_path='' as $$
begin perform summit_game_private.require_host();return (select jsonb_agg(to_jsonb(q) order by game,difficulty,id) from summit_game_private.questions q where q.game<>'deal' or q.public_data->>'format'='pivot');end $$;

create or replace function public.sg_state(p_pin text,p_token text default null) returns jsonb language plpgsql security definer set search_path='' as $$
declare rm summit_game_private.rooms;ru summit_game_private.runs;rd summit_game_private.rounds;q summit_game_private.questions;pl summit_game_private.players;
 pr summit_game_private.progress;phase text;data jsonb;elapsed numeric:=0;clue_count int;me jsonb:=null;board jsonb:='[]';rev jsonb:=null;total int;answered int;
begin
 select * into rm from summit_game_private.rooms where pin=p_pin;
 if not found or rm.expires_at<=clock_timestamp() then raise exception 'Room not found or expired.';end if;
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
 end if;
 if phase in ('lobby','reveal','finished') then select coalesce(jsonb_agg(value),'[]') into board from jsonb_array_elements(rm.board_cache) with ordinality b(value,n) where n<=25;end if;
 select count(*)::int into total from summit_game_private.players where room_id=rm.id and active;
 select count(*)::int into answered from summit_game_private.progress g join summit_game_private.players p on p.id=g.player_id where g.round_id=rm.round_id and g.attempts>0 and p.active;
 return jsonb_build_object('serverTime',extract(epoch from clock_timestamp())*1000,'room',jsonb_build_object('id',rm.id,'pin',rm.pin,'title',rm.title,'phase',phase,'joinOpen',rm.join_open,'revision',rm.revision,'runId',rm.run_id,'game',ru.game,'roundNumber',ru.cursor,'roundCount',cardinality(ru.plan),'minutes',ru.minutes,'hintsEnabled',ru.hints,'expiresAt',rm.expires_at),
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
  update summit_game_private.rooms set phase=case when p_action='finish' then 'finished' else 'reveal' end where id=rm.id;
 elsif p_action='next' then
  if rm.phase<>'reveal' then raise exception 'Reveal the current round before moving on.';end if;
  perform summit_game_private.next_round(rm.id);
 elsif p_action='joining' then update summit_game_private.rooms set join_open=not join_open where id=rm.id;
 elsif p_action='remove' then update summit_game_private.players set active=false where room_id=rm.id and id=(p_options->>'playerId')::uuid;
 elsif p_action='delete' then delete from summit_game_private.rooms where id=rm.id;return jsonb_build_object('deleted',true);
 else raise exception 'Unknown host action.';end if;
 update summit_game_private.rooms set revision=revision+1,board_cache=summit_game_private.scoreboard(id,run_id) where id=rm.id;
 return public.sg_host_state(rm.id);
end $$;

create or replace function public.sg_answer(p_pin text,p_token text,p_round_id uuid,p_answer text,p_request_id uuid,p_hint boolean default false) returns jsonb language plpgsql security definer set search_path='' as $$
declare rm summit_game_private.rooms;pl summit_game_private.players;rd summit_game_private.rounds;ru summit_game_private.runs;q summit_game_private.questions;pr summit_game_private.progress;old summit_game_private.requests;result jsonb;correct boolean;elapsed numeric;awarded int;max_attempts int;begin
 -- Shared room lock coordinates host transitions with in-flight answers; other players can still answer concurrently.
 select * into rm from summit_game_private.rooms where pin=p_pin for share;
 if not found or rm.expires_at<=clock_timestamp() then raise exception 'Room not found or expired.';end if;
 select * into pl from summit_game_private.players where room_id=rm.id and token_hash=summit_game_private.token_hash(p_token);
 if not found or not pl.active then raise exception 'Player session is not active.';end if;
 -- Serialize retries and hint requests for this player only.
 perform 1 from summit_game_private.players where id=pl.id for update;
 select * into old from summit_game_private.requests where id=p_request_id;
 if found then
  if old.player_id<>pl.id or old.round_id<>p_round_id or old.kind<>(case when p_hint then 'hint' else 'answer' end) then raise exception 'Invalid request identifier.';end if;
  return old.result;
 end if;
 if rm.round_id<>p_round_id then raise exception 'This round has changed. Refresh before answering.';end if;
 select * into rd from summit_game_private.rounds where id=p_round_id;
 if rm.phase<>'question' or clock_timestamp()>rd.deadline then raise exception 'Answers are closed for this round.';end if;
 select * into ru from summit_game_private.runs where id=rd.run_id;
 select * into q from summit_game_private.questions where id=rd.question_id;
 elapsed:=rd.elapsed+greatest(0,extract(epoch from clock_timestamp()-rd.resumed_at));
 if q.game='deal' and rd.public_data->>'format'='pivot' then
  if coalesce((rd.public_data->>'hasUpdate')::boolean,false) and elapsed<rd.seconds::numeric/2 then raise exception 'Wait for the briefing update before locking your decision.';end if;
  if not exists(select 1 from jsonb_array_elements(rd.public_data->'options') o where o->>'id'=p_answer) then raise exception 'Choose one of the four decisions.';end if;
 end if;
 insert into summit_game_private.progress(player_id,round_id) values(pl.id,rd.id) on conflict do nothing;
 select * into pr from summit_game_private.progress where player_id=pl.id and round_id=rd.id for update;
 max_attempts:=case when q.game='deal' then 1 else 2 end;
 if pr.solved or pr.attempts>=max_attempts then raise exception 'Your answer is already locked.';end if;
 if p_hint then
  if q.game<>'shuffle' or not ru.hints or pr.hints>=2 then raise exception 'No more hints are available.';end if;
  update summit_game_private.progress set hints=hints+1 where player_id=pl.id and round_id=rd.id;
  result:=jsonb_build_object('hint','Starts with '||left(q.answers->>0,case when pr.hints=0 then 1 else 3 end),'hints',pr.hints+1);
 else
  if p_answer is null or length(p_answer)>100 then raise exception 'Keep your answer under 100 characters.';end if;
  select exists(select 1 from jsonb_array_elements_text(q.answers) a where summit_game_private.normalise(a)=summit_game_private.normalise(p_answer)) into correct;
  elapsed:=rd.elapsed+greatest(0,extract(epoch from clock_timestamp()-rd.resumed_at));
  awarded:=case when correct then greatest(100,1000+floor(200*greatest(0,1-elapsed/rd.seconds))::int-pr.hints*150-pr.attempts*100) else 0 end;
  update summit_game_private.progress set attempts=attempts+1,solved=correct,points=awarded where player_id=pl.id and round_id=rd.id;
  result:=jsonb_build_object('correct',correct,'points',awarded,'attempts',pr.attempts+1,'attemptsRemaining',max_attempts-pr.attempts-1,'locked',correct or pr.attempts+1>=max_attempts);
 end if;
 insert into summit_game_private.requests(id,player_id,round_id,kind,result) values(p_request_id,pl.id,rd.id,case when p_hint then 'hint' else 'answer' end,result);
 return result;
end $$;
-- Default function privileges are broad in Postgres: explicitly restrict each API.
revoke all on all functions in schema summit_game_private from public,anon,authenticated;
revoke all on function public.sg_host_rooms(),public.sg_create_room(text),public.sg_bank(),public.sg_host_state(uuid),public.sg_control(uuid,text,integer,jsonb) from public,anon,authenticated;
grant execute on function public.sg_host_rooms(),public.sg_create_room(text),public.sg_bank(),public.sg_host_state(uuid),public.sg_control(uuid,text,integer,jsonb) to authenticated;
revoke all on function public.sg_join(text,text,text),public.sg_state(text,text),public.sg_answer(text,text,uuid,text,uuid,boolean) from public,anon,authenticated;
grant execute on function public.sg_join(text,text,text),public.sg_state(text,text),public.sg_answer(text,text,uuid,text,uuid,boolean) to anon,authenticated;
commit;
