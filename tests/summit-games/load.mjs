// Explicitly run against a TEST project; creates and deletes its own isolated room.
import {randomBytes,randomUUID} from 'node:crypto';
import {writeFile} from 'node:fs/promises';
const env=process.env;
const count=Number(process.argv.find(a=>a.startsWith('--players='))?.split('=')[1]||10);
if(!Number.isInteger(count)||count<1||count>150)throw new Error('Use --players=1 through --players=150.');
for(const name of ['SUPABASE_URL','SUPABASE_PUBLISHABLE_KEY','GAMES_HOST_EMAIL','GAMES_HOST_PASSWORD'])if(!env[name])throw new Error(`Missing ${name} in your private .env.games-test.local file.`);
if(env.SUPABASE_PUBLISHABLE_KEY.startsWith('sb_secret_'))throw new Error('Use the publishable key.');
const guest={token:env.SUPABASE_PUBLISHABLE_KEY},host={};
async function request(path,body,client){const response=await fetch(env.SUPABASE_URL+path,{method:'POST',headers:{apikey:env.SUPABASE_PUBLISHABLE_KEY,Authorization:'Bearer '+client.token,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(20000)});const data=await response.json();if(!response.ok)throw new Error(data.message||data.msg||'Supabase request failed.');return data;}
const timings={};
async function rpc(client,name,args={}){const start=performance.now();const data=await request('/rest/v1/rpc/'+name,args,client);(timings[name]??=[]).push(performance.now()-start);return data;}
async function batches(items,fn,size=10){const out=[];for(let i=0;i<items.length;i+=size){const result=await Promise.allSettled(items.slice(i,i+size).map(fn));for(const r of result){if(r.status==='rejected')throw r.reason;out.push(r.value);}}return out;}
let room;
try{
 const session=await request('/auth/v1/token?grant_type=password',{email:env.GAMES_HOST_EMAIL,password:env.GAMES_HOST_PASSWORD},guest);host.token=session.access_token;
 room=await rpc(host,'sg_create_room',{p_title:`LOAD TEST ${new Date().toISOString()}`});
 const players=Array.from({length:count},(_,i)=>({nickname:`Load ${i+1}`,token:randomBytes(32).toString('hex'),request:randomUUID()}));
 await batches(players,p=>rpc(guest,'sg_join',{p_pin:room.pin,p_nickname:p.nickname,p_token:p.token}));
 let state=await rpc(host,'sg_host_state',{p_room_id:room.id});if(state.counts.players!==count)throw new Error('Join count mismatch.');
 const bank=await rpc(host,'sg_bank'),games=[];
 for(const game of ['shuffle','brand','deal']){
  for(const p of players)p.request=randomUUID();
  state=await rpc(host,'sg_control',{p_room_id:room.id,p_action:'start',p_revision:state.room.revision,p_options:{game,minutes:10,profile:'progressive',seconds:120,hints:true}});
  const q=bank.find(q=>q.game===game&&(game==='brand'?q.public_data.clues[0]===state.round.data.clues[0]:q.public_data.prompt===state.round.data.prompt));if(!q)throw new Error('Could not match the host question.');
  await batches(players,p=>rpc(guest,'sg_state',{p_pin:room.pin,p_token:p.token}));
  const submit=p=>rpc(guest,'sg_answer',{p_pin:room.pin,p_token:p.token,p_round_id:state.round.id,p_answer:q.answers[0],p_request_id:p.request,p_hint:false});
  const results=await batches(players,submit,25);if(results.some(r=>!r.correct))throw new Error('An expected correct answer failed.');
  await batches(players,submit,25);
  state=await rpc(host,'sg_control',{p_room_id:room.id,p_action:'reveal',p_revision:state.room.revision,p_options:{}});
  if(state.gameRoster.length!==count||state.gameRoster.some(p=>p.score<1000||p.score>1200))throw new Error('Score count or duplicate award mismatch.');
  games.push({game,correct:results.length,submittedTwiceScoredOnce:true});
 }
 const report={players:count,games,burstConcurrency:25,latency:Object.fromEntries(Object.entries(timings).map(([name,values])=>{const sorted=values.sort((a,b)=>a-b);return[name,{requests:values.length,p95ms:Math.round(sorted[Math.ceil(sorted.length*.95)-1]),maxMs:Math.round(sorted.at(-1))}]}))};
 await writeFile('/tmp/convergence-games-load-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{
 if(room){try{const s=await rpc(host,'sg_host_state',{p_room_id:room.id});await rpc(host,'sg_control',{p_room_id:room.id,p_action:'delete',p_revision:s.room.revision,p_options:{}});console.log('Isolated test room deleted.');}catch{console.error('Cleanup failed: delete the LOAD TEST room in the host desk.');process.exitCode=1;}}
 if(host.token)await fetch(env.SUPABASE_URL+'/auth/v1/logout',{method:'POST',headers:{apikey:env.SUPABASE_PUBLISHABLE_KEY,Authorization:'Bearer '+host.token}});
}
