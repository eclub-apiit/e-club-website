-- Read-only checks. Run in Supabase SQL Editor after the migrations and host seed.
-- All rows should report PASS before using the updated live games.
with checks(check_name,passed) as (values
 ('Countdown columns installed',
  (select count(*)=2 from information_schema.columns where table_schema='summit_game_private' and table_name='rooms' and column_name in ('auto_pace','next_round_at'))),
 ('Current state API includes countdown and personal ranking',
  coalesce(pg_get_functiondef(to_regprocedure('public.sg_state(text,text)')),'') like '%nextRoundAt%'
  and coalesce(pg_get_functiondef(to_regprocedure('public.sg_state(text,text)')),'') like '%standing%'),
 ('Database auto progression installed',
  to_regprocedure('summit_game_private.tick(uuid)') is not null),
 ('Current question bank has 84 enabled questions',
  (select count(*)=84 from summit_game_private.questions where game<>'deal' or public_data->>'format'='pivot')),
 ('Founder Shuffle has 30 questions',
  (select count(*)=30 from summit_game_private.questions where game='shuffle')),
 ('Brand Detective has 24 questions including Red Bull',
  (select count(*)=24 and bool_or(title='Red Bull') from summit_game_private.questions where game='brand')),
 ('Brand clues no longer use spelling giveaways',
  not exists(select 1 from summit_game_private.questions q cross join lateral jsonb_array_elements_text(q.public_data->'clues') c where q.game='brand' and c ~* '(starts? with|begins? with|ends? with|six-letter|five-letter)')),
 ('Founder''s Call has 30 scenarios',
  (select count(*)=30 from summit_game_private.questions where game='deal' and public_data->>'format'='pivot')),
 ('E-Club Auth account is confirmed and enabled as host',
  exists(select 1 from auth.users u join summit_game_private.hosts h on h.user_id=u.id where lower(u.email)='eclub@apiit.lk' and u.email_confirmed_at is not null)),
 ('Guest host creation is denied',
  not has_function_privilege('anon','public.sg_create_room(text)','EXECUTE')),
 ('Authenticated host RPC access is available',
  has_function_privilege('authenticated','public.sg_control(uuid,text,integer,jsonb)','EXECUTE')),
 ('Private schema is inaccessible to browser roles',
  not has_schema_privilege('anon','summit_game_private','USAGE') and not has_schema_privilege('authenticated','summit_game_private','USAGE')),
 ('Guest join and state access are available',
  has_function_privilege('anon','public.sg_join(text,text,text)','EXECUTE') and has_function_privilege('anon','public.sg_state(text,text)','EXECUTE'))
)
select check_name,case when passed then 'PASS' else 'FAIL — complete the corresponding setup step' end as result
from checks order by check_name;
