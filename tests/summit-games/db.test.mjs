import test from 'node:test';
import assert from 'node:assert/strict';
import {PGlite} from '@electric-sql/pglite';
import {readFile} from 'node:fs/promises';
import {randomBytes,randomUUID} from 'node:crypto';
const host='11111111-1111-4111-8111-111111111111',other='22222222-2222-4222-8222-222222222222';
const db=new PGlite();
const query=(sql,args=[])=>db.query(sql,args);
const call=async(name,args=[])=>{
 const result=await query(`select public.${name}(${args.map((_,i)=>'$'+(i+1)).join(',')}) as value`,args);return result.rows[0].value;
};
try {
await db.exec(`create role anon;create role authenticated;create schema auth;create function auth.uid() returns uuid language sql as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;`);
await db.exec(await readFile('supabase/migrations/001_summit_games.sql','utf8'));
await db.exec(await readFile('supabase/migrations/002_summit_game_questions.sql','utf8'));
await db.exec(await readFile('supabase/migrations/003_pivot_or_perish.sql','utf8'));
await db.exec(await readFile('supabase/migrations/004_countdowns_and_rankings.sql','utf8'));
} catch(error) { console.error('Migration failed:', error.message, 'position', error.position); process.exit(1); }
await query('insert into summit_game_private.hosts values($1)',[host]);
const asHost=async(uid=host)=>{await query('reset role');await query("select set_config('request.jwt.claim.sub',$1,false)",[uid]);await query('set role authenticated');};
const asGuest=async()=>{await query('reset role');await query("select set_config('request.jwt.claim.sub','',false)");await query('set role anon');};
let room,tokens=[];
await test('Private bank and host controls reject public and non-host access',async()=>{
 await asGuest();await assert.rejects(()=>query('select * from summit_game_private.questions'),/permission denied/);await assert.rejects(()=>call('sg_create_room',['Illegal room']),/permission denied/);
 await asHost(other);await assert.rejects(()=>call('sg_create_room',['Illegal room']),/Host access/);await asHost();const bank=await call('sg_bank');assert.equal(bank.length,84);
 room=await call('sg_create_room',['Database rehearsal']);let initial=await call('sg_host_state',[room.id]);await call('sg_control',[room.id,'autopace',initial.room.revision,{enabled:false}]);
});
await test('100 individual players join; duplicate names and closed joining are enforced',async()=>{
 await asGuest();for(let i=0;i<100;i++){const token=randomBytes(32).toString('hex');tokens.push(token);await call('sg_join',[room.pin,`Founder ${i+1}`,token]);}
 await assert.rejects(()=>call('sg_join',[room.pin,'Founder 1',randomBytes(32).toString('hex')]),/nickname is taken/);
 assert.equal((await call('sg_state',[room.pin,tokens[0]])).counts.players,100);
 await asHost();let state=await call('sg_host_state',[room.id]);await call('sg_control',[room.id,'joining',state.room.revision,{}]);await asGuest();
 await assert.rejects(()=>call('sg_join',[room.pin,'Late guest',randomBytes(32).toString('hex')]),/Joining is locked/);
 assert.equal((await call('sg_join',[room.pin,'Ignored rename',tokens[0]])).nickname,'Founder 1');
});
let state,answer;
await test('Progressive 15-minute run has 18 unique questions and hides future answers',async()=>{
 await asHost();state=await call('sg_host_state',[room.id]);state=await call('sg_control',[room.id,'start',state.room.revision,{game:'shuffle',minutes:15,profile:'progressive',hints:true}]);
 assert.equal(state.room.roundCount,18);assert.equal(state.round.difficulty,'easy');
 await query('reset role');const run=(await query('select * from summit_game_private.runs where id=$1',[state.room.runId])).rows[0];assert.equal(new Set(run.plan).size,18);
 const q=(await query('select q.* from summit_game_private.questions q join summit_game_private.rounds r on r.question_id=q.id where r.id=$1',[state.round.id])).rows[0];answer=q.answers[0];
 await asGuest();const snapshot=await call('sg_state',[room.pin,tokens[0]]);assert.equal(snapshot.reveal,null);assert.ok(!JSON.stringify(snapshot).includes(q.explanation));assert.equal(snapshot.room.revision,state.room.revision);
 await assert.rejects(()=>call('sg_control',[room.id,'finish',state.room.revision,{}]),/permission denied/);
});
await test('Correctness, hint penalties, idempotency and attempt limits are server enforced',async()=>{
 const request=randomUUID();const first=await call('sg_answer',[room.pin,tokens[0],state.round.id,'  '+answer.toLowerCase()+' ',request,false]);assert.equal(first.correct,true);assert.ok(first.points>=1000&&first.points<=1200);
 assert.deepEqual(await call('sg_answer',[room.pin,tokens[0],state.round.id,answer,request,false]),first);
 await assert.rejects(()=>call('sg_answer',[room.pin,tokens[0],state.round.id,answer,randomUUID(),false]),/already locked/);
 const hintRequest=randomUUID();const hint=await call('sg_answer',[room.pin,tokens[1],state.round.id,'',hintRequest,true]);assert.equal(hint.hints,1);
 assert.deepEqual(await call('sg_answer',[room.pin,tokens[1],state.round.id,'',hintRequest,true]),hint);
 const hinted=await call('sg_answer',[room.pin,tokens[1],state.round.id,answer,randomUUID(),false]);assert.ok(hinted.points<=1050);
 await call('sg_answer',[room.pin,tokens[2],state.round.id,'wrong',randomUUID(),false]);await call('sg_answer',[room.pin,tokens[2],state.round.id,'wrong again',randomUUID(),false]);await assert.rejects(()=>call('sg_answer',[room.pin,tokens[2],state.round.id,answer,randomUUID(),false]),/locked/);
 await assert.rejects(()=>call('sg_answer',[room.pin,randomBytes(32).toString('hex'),state.round.id,answer,randomUUID(),false]),/not active/);
});
await test('All 100 player entries can submit without duplicate scores',async()=>{
 await asGuest();
 for(let i=3;i<100;i++){
  const request=randomUUID(),args=[room.pin,tokens[i],state.round.id,answer,request,false];
  const result=await call('sg_answer',args);assert.equal(result.correct,true);assert.deepEqual(await call('sg_answer',args),result);
 }
 await asHost();const scored=await call('sg_host_state',[room.id]);assert.equal(scored.counts.answered,100);assert.equal(scored.gameRoster.length,100);assert.equal(scored.gameRoster.filter(p=>p.score>0).length,99);
});
await test('Pause blocks answers, stale revisions fail, resume preserves time, void removes scores',async()=>{
 await asHost();state=await call('sg_host_state',[room.id]);const revision=state.room.revision;state=await call('sg_control',[room.id,'pause',revision,{}]);assert.equal(state.room.phase,'paused');
 await assert.rejects(()=>call('sg_control',[room.id,'resume',revision,{}]),/Room changed/);
 await asGuest();await assert.rejects(()=>call('sg_answer',[room.pin,tokens[3],state.round.id,answer,randomUUID(),false]),/Answers are closed/);
 await asHost();const remaining=state.round.remaining;state=await call('sg_control',[room.id,'extend',state.room.revision,{}]);assert.ok(Math.abs(state.round.remaining-remaining-15)<.1);
 state=await call('sg_control',[room.id,'resume',state.room.revision,{}]);assert.equal(state.room.phase,'question');
 state=await call('sg_control',[room.id,'reveal',state.room.revision,{}]);assert.equal(state.reveal.answer,answer);assert.ok(state.board.some(p=>p.score>0));
 state=await call('sg_control',[room.id,'void',state.room.revision,{}]);assert.ok(state.board.every(p=>p.score===0));
 const old=state.round.id;state=await call('sg_control',[room.id,'next',state.room.revision,{}]);await asGuest();await assert.rejects(()=>call('sg_answer',[room.pin,tokens[3],old,answer,randomUUID(),false]),/round has changed/);
});
await test('Deadline rejects late answers; removed players cannot resume or submit',async()=>{
 await query('reset role');await query("update summit_game_private.rounds set deadline=clock_timestamp()-interval '1 second' where id=$1",[state.round.id]);await asGuest();assert.equal((await call('sg_state',[room.pin,tokens[3]])).room.phase,'locked');
 await assert.rejects(()=>call('sg_answer',[room.pin,tokens[3],state.round.id,answer,randomUUID(),false]),/closed/);
 await asHost();state=await call('sg_host_state',[room.id]);const id=state.roster.find(p=>p.nickname==='Founder 4').id;state=await call('sg_control',[room.id,'remove',state.room.revision,{playerId:id}]);
 await asGuest();await assert.rejects(()=>call('sg_join',[room.pin,'Founder 4',tokens[3]]),/removed/);await assert.rejects(()=>call('sg_state',[room.pin,tokens[3]]),/not active/);
});
await test('Brand clues reveal gradually; new games have separate scoreboards',async()=>{
 await asHost();state=await call('sg_host_state',[room.id]);state=await call('sg_control',[room.id,'finish',state.room.revision,{}]);state=await call('sg_control',[room.id,'start',state.room.revision,{game:'brand',minutes:10,profile:'challenge'}]);assert.equal(state.round.data.clues.length,1);assert.equal(state.room.roundCount,12);
 await query('reset role');await query('update summit_game_private.rounds set elapsed=seconds*.8 where id=$1',[state.round.id]);await asGuest();const s=await call('sg_state',[room.pin,tokens[0]]);assert.equal(s.round.data.clues.length,3);assert.equal(s.reveal,null);
 await asHost();state=await call('sg_host_state',[room.id]);state=await call('sg_control',[room.id,'reveal',state.room.revision,{}]);assert.ok(state.board.every(p=>p.score===0));
});
await test('Other hosts cannot control rooms and direct tables remain inaccessible',async()=>{
 await asHost(other);await assert.rejects(()=>call('sg_host_state',[room.id]),/Host access/);await asGuest();await assert.rejects(()=>query('select * from summit_game_private.players'),/permission denied/);
 await asHost();state=await call('sg_host_state',[room.id]);assert.equal((await call('sg_control',[room.id,'delete',state.room.revision,{}])).deleted,true);
 await asGuest();await assert.rejects(()=>call('sg_state',[room.pin,tokens[0]]),/not found/);
});


await test('A complete 18-round game ends cleanly after the last reveal',async()=>{
 await asHost();const completeRoom=await call('sg_create_room',['Complete flow']);
 let s=await call('sg_host_state',[completeRoom.id]);s=await call('sg_control',[completeRoom.id,'start',s.room.revision,{game:'deal',minutes:15,profile:'progressive',hints:false}]);
 const rounds=new Set();
 for(let n=1;n<=18;n++){
  assert.equal(s.room.roundNumber,n);assert.equal(s.room.phase,'question');rounds.add(s.round.id);assert.equal(s.round.difficulty,n<=6?'easy':n<=12?'medium':'hard');
  s=await call('sg_control',[completeRoom.id,'reveal',s.room.revision,{}]);assert.ok(s.reveal.explanation);s=await call('sg_control',[completeRoom.id,'next',s.room.revision,{}]);
 }
 assert.equal(rounds.size,18);assert.equal(s.room.phase,'finished');assert.equal(s.room.roundNumber,18);
 await call('sg_control',[completeRoom.id,'delete',s.room.revision,{}]);
});

await test('Pivot supports 100 submissions, hides future updates and locks early decisions on hard rounds',async()=>{
 await asHost();const r=await call('sg_create_room',['Pivot capacity']);
 await asGuest();const sessions=[];for(let i=0;i<100;i++){const t=randomBytes(32).toString('hex');sessions.push(t);await call('sg_join',[r.pin,`Pivot ${i}`,t]);}
 await asHost();let s=await call('sg_host_state',[r.id]);s=await call('sg_control',[r.id,'start',s.room.revision,{game:'deal',minutes:10,profile:'challenge'}]);
 assert.equal(s.round.data.format,'pivot');assert.equal(s.round.data.updateReady,true);
 await query('reset role');let q=(await query('select q.* from summit_game_private.questions q join summit_game_private.rounds rd on q.id=rd.question_id where rd.id=$1',[s.round.id])).rows[0];
 await asGuest();await assert.rejects(()=>call('sg_answer',[r.pin,sessions[0],s.round.id,'accept',randomUUID(),false]),/four decisions/);
 for(const t of sessions){const args=[r.pin,t,s.round.id,q.answers[0],randomUUID(),false];const result=await call('sg_answer',args);assert.ok(result.correct);assert.deepEqual(await call('sg_answer',args),result);}
 await asHost();s=await call('sg_control',[r.id,'reveal',s.room.revision,{}]);assert.equal(s.counts.answered,100);assert.equal(s.gameRoster.filter(p=>p.score>0).length,100);assert.ok(s.reveal.answerLabel.includes(' · '));
 while(s.round.difficulty!=='hard'){s=await call('sg_control',[r.id,'next',s.room.revision,{}]);if(s.round.difficulty!=='hard')s=await call('sg_control',[r.id,'reveal',s.room.revision,{}]);}
 assert.equal(s.round.data.updateReady,false);assert.ok(!Object.hasOwn(s.round.data,'update'));
 await asGuest();await assert.rejects(()=>call('sg_answer',[r.pin,sessions[0],s.round.id,'a',randomUUID(),false]),/briefing update/);
 await asHost();s=await call('sg_control',[r.id,'pause',s.room.revision,{}]);assert.equal(s.round.data.updateReady,false);
 await query('reset role');await query('update summit_game_private.rounds set elapsed=seconds*.6 where id=$1',[s.round.id]);
 q=(await query('select q.* from summit_game_private.questions q join summit_game_private.rounds rd on q.id=rd.question_id where rd.id=$1',[s.round.id])).rows[0];
 await asHost();s=await call('sg_control',[r.id,'resume',s.room.revision,{}]);assert.equal(s.round.data.updateReady,true);assert.equal(s.round.data.update,q.public_data.update);
 await asGuest();assert.equal((await call('sg_answer',[r.pin,sessions[0],s.round.id,q.answers[0],randomUUID(),false])).correct,true);
 await asHost();await call('sg_control',[r.id,'delete',s.room.revision,{}]);
});
await test('150 can join, entry 151 is rejected, and personal ranking survives the top-25 cutoff',async()=>{
 await asHost();const r=await call('sg_create_room',['150 player rank check']);await asGuest();const sessions=[];
 for(let i=0;i<150;i++){const t=randomBytes(32).toString('hex');sessions.push(t);await call('sg_join',[r.pin,`Rank ${i}`,t]);}
 await assert.rejects(()=>call('sg_join',[r.pin,'Overflow player',randomBytes(32).toString('hex')]),/150 players/);
 await asHost();let s=await call('sg_host_state',[r.id]);s=await call('sg_control',[r.id,'start',s.room.revision,{game:'shuffle',minutes:10,profile:'progressive',seconds:120}]);
 await query('reset role');await query(`insert into summit_game_private.progress(player_id,round_id,attempts,solved,points) select id,$1,1,true,case when nickname='Rank 149' then 0 else 1000 end from summit_game_private.players where room_id=$2`,[s.round.id,r.id]);
 await asHost();s=await call('sg_control',[r.id,'reveal',s.room.revision,{}]);await asGuest();const personal=await call('sg_state',[r.pin,sessions[149]]),tied=await call('sg_state',[r.pin,sessions[0]]);
 assert.equal(personal.board.length,25);assert.equal(personal.me.standing.rank,150);assert.equal(personal.me.standing.score,0);assert.ok(!personal.board.some(p=>p.id===personal.me.id));assert.equal(tied.me.standing.rank,1);assert.equal(tied.me.standing.tied,true);assert.ok(personal.board.every(p=>p.rank===1));
 await asHost();await call('sg_control',[r.id,'delete',s.room.revision,{}]);
});
await test('Database auto pace shares a countdown and advances without a host tab; disabling holds the reveal',async()=>{
 await asHost();const r=await call('sg_create_room',['Automatic pace']);let s=await call('sg_host_state',[r.id]);assert.equal(s.room.autoPace,true);
 s=await call('sg_control',[r.id,'start',s.room.revision,{game:'shuffle',minutes:10,profile:'progressive',seconds:15}]);
 await query('reset role');await query("update summit_game_private.rounds set deadline=clock_timestamp()-interval '1 second' where id=$1",[s.round.id]);
 await asGuest();s=await call('sg_state',[r.pin,null]);assert.equal(s.room.phase,'reveal');assert.ok(s.room.nextRoundAt>s.serverTime);const deadline=s.room.nextRoundAt,revision=s.room.revision;
 const again=await call('sg_state',[r.pin,null]);assert.equal(again.room.nextRoundAt,deadline);assert.equal(again.room.revision,revision);
 await query('reset role');await query("update summit_game_private.rooms set next_round_at=clock_timestamp()-interval '1 second' where id=$1",[r.id]);
 await asGuest();s=await call('sg_state',[r.pin,null]);assert.equal(s.room.phase,'question');assert.equal(s.room.roundNumber,2);assert.equal(s.room.nextRoundAt,null);
 await assert.rejects(()=>query('select summit_game_private.tick($1)',[r.id]),/permission denied/);
 await asHost();s=await call('sg_control',[r.id,'reveal',s.room.revision,{}]);s=await call('sg_control',[r.id,'autopace',s.room.revision,{enabled:false}]);assert.equal(s.room.nextRoundAt,null);
 await query('reset role');await query("update summit_game_private.rooms set next_round_at=clock_timestamp()-interval '1 second' where id=$1",[r.id]);
 await asGuest();s=await call('sg_state',[r.pin,null]);assert.equal(s.room.phase,'reveal');assert.equal(s.room.roundNumber,2);
 await asHost();s=await call('sg_control',[r.id,'autopace',s.room.revision,{enabled:true}]);assert.ok(s.room.nextRoundAt>s.serverTime);
 await query('reset role');await query('update summit_game_private.runs set cursor=cardinality(plan) where id=$1',[s.room.runId]);await query("update summit_game_private.rooms set next_round_at=clock_timestamp()-interval '1 second' where id=$1",[r.id]);
 await asGuest();s=await call('sg_state',[r.pin,null]);assert.equal(s.room.phase,'finished');assert.equal(s.room.autoPace,false);assert.equal(s.room.nextRoundAt,null);
 await asHost();await call('sg_control',[r.id,'delete',s.room.revision,{}]);
});
await test('E-Club host seed requires a real Auth user and grants host access idempotently',async()=>{
 await query('reset role');await db.exec('create table auth.users(id uuid primary key,email text unique)');const seed=await readFile('supabase/enable-eclub-host.sql','utf8');
 await assert.rejects(()=>db.exec(seed),/Auth user first/);
 const organiser='33333333-3333-4333-8333-333333333333';await query('insert into auth.users(id,email) values($1,$2)',[organiser,'eclub@apiit.lk']);
 await db.exec(seed);await db.exec(seed);assert.equal((await query('select count(*)::int n from summit_game_private.hosts where user_id=$1',[organiser])).rows[0].n,1);
 await asHost(organiser);const r=await call('sg_create_room',['Club host account']);const s=await call('sg_host_state',[r.id]);await call('sg_control',[r.id,'delete',s.room.revision,{}]);
});
await test('Installation verification SQL detects unconfirmed host and passes after confirmation',async()=>{
 await query('reset role');await db.exec('alter table auth.users add column email_confirmed_at timestamptz');
 const verification=await readFile('supabase/verify-installation.sql','utf8');let rows=(await query(verification)).rows;
 assert.equal(rows.filter(r=>r.result!=='PASS').length,1);assert.match(rows.find(r=>r.result!=='PASS').check_name,/Auth account/);
 await query("update auth.users set email_confirmed_at=clock_timestamp() where email='eclub@apiit.lk'");rows=(await query(verification)).rows;assert.ok(rows.every(r=>r.result==='PASS'),JSON.stringify(rows.filter(r=>r.result!=='PASS')));
});
await db.close();
