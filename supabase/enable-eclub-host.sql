-- Run in Supabase SQL Editor AFTER creating eclub@apiit.lk in Authentication > Users.
-- Set the password in the Auth dashboard; never put it in this file.
do $$
declare organiser uuid;
begin
 select id into organiser from auth.users where lower(email)='eclub@apiit.lk';
 if organiser is null then raise exception 'Create the eclub@apiit.lk Auth user first, then run this query again.';end if;
 insert into summit_game_private.hosts(user_id) values(organiser) on conflict do nothing;
end $$;
select email,exists(select 1 from summit_game_private.hosts h where h.user_id=u.id) as games_host_enabled
from auth.users u where lower(email)='eclub@apiit.lk';
