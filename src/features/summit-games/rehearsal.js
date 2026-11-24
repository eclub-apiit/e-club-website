// Development-only transport. NEVER imported in production (see api.js).
import bank from '../../../supabase/content/questions.json';
import {LEVELS,planCounts,secondsFor,shuffleLetters,normaliseAnswer,pointsFor,newId} from './rules';
const KEY='convergence-local-rehearsal-v2';
const clone=x=>structuredClone(x);
const load=()=>JSON.parse(localStorage.getItem(KEY)||'{}');
async function edit(fn){
 const work=()=>{const all=load(),result=fn(all);localStorage.setItem(KEY,JSON.stringify(all));return clone(result);};
 return navigator.locks?navigator.locks.request(KEY,work):work();
}
function roomFor(all,pin){const r=Object.values(all).find(r=>r.pin===pin);if(!r||r.expiresAt<=Date.now())throw new Error('Room not found or expired.');return r;}
function playerFor(r,token){const p=r.players.find(p=>p.token===token);if(!p||!p.active)throw new Error('Player session is not active.');return p;}
function board(r,overall=false){return r.players.filter(p=>p.active).map(p=>({id:p.id,nickname:p.nickname,score:r.rounds.filter(rd=>!rd.voided&&(overall||rd.runId===r.runId)).reduce((n,rd)=>n+(rd.progress[p.id]?.points||0),0),solved:r.rounds.filter(rd=>!rd.voided&&(overall||rd.runId===r.runId)&&rd.progress[p.id]?.solved).length})).sort((a,b)=>b.score-a.score||a.nickname.localeCompare(b.nickname)).map((p,i,all)=>({...p,rank:1+all.filter(x=>x.score>p.score).length}));}
function next(r){
 if(r.cursor>=r.plan.length){r.phase='finished';r.autoPace=false;r.nextRoundAt=null;return;}
 const questionId=r.plan[r.cursor++];
 const q=bank.find(q=>q.id===questionId),seconds=secondsFor(r.settings.minutes,q.difficulty,r.settings.seconds);
 r.round={id:newId(),questionId:q.id,runId:r.runId,number:r.cursor,seconds,data:{...clone(q.public_data),...(q.game==='shuffle'?{letters:shuffleLetters(q.answers[0])}:{})},resumedAt:Date.now(),elapsed:0,deadline:Date.now()+seconds*1000,remaining:null,progress:{},voided:false,revealedAt:null};
 r.rounds.push(r.round);r.phase='question';r.nextRoundAt=null;
}
function tick(r){
 if(!r.autoPace||r.expiresAt<=Date.now())return;
 if(r.phase==='question'&&r.round.deadline<=Date.now()){
  const rd=r.round;rd.elapsed+=Math.max(0,(rd.deadline-rd.resumedAt)/1000);rd.revealedAt=Date.now();r.phase='reveal';r.nextRoundAt=Date.now()+(r.settings.minutes===15?10000:15000);
  r.rounds[r.rounds.findIndex(x=>x.id===rd.id)]=rd;r.revision++;
 }else if(r.phase==='reveal'&&r.nextRoundAt&&r.nextRoundAt<=Date.now()){next(r);r.revision++;}
}
function snapshot(r,token,host=false){
 const rd=r.round,q=rd&&bank.find(q=>q.id===rd.questionId);
 const elapsed=rd?rd.elapsed+(r.phase==='question'?Math.max(0,(Date.now()-rd.resumedAt)/1000):0):0;
 const phase=r.phase==='question'&&rd.deadline<=Date.now()?'locked':r.phase;
 const data=rd&&clone(rd.data);
 if(q?.game==='brand'&&['question','paused','locked'].includes(phase))data.clues=data.clues.slice(0,Math.min(3,1+Math.floor(elapsed/(rd.seconds/3))));
 if(q?.game==='deal'&&data.format==='pivot'){data.updateReady=!data.hasUpdate||elapsed>=rd.seconds/2||['reveal','finished'].includes(phase);if(!data.updateReady)delete data.update;}
 const p=token?playerFor(r,token):null,progress=p&&rd?.progress[p.id];
 const standing=p&&['reveal','finished'].includes(phase)?board(r).find(x=>x.id===p.id):null;
 const me=p?{...(standing?{standing:{...standing,tied:board(r).filter(x=>x.score===standing.score).length>1}}:{}),id:p.id,nickname:p.nickname,attempts:progress?.attempts||0,hints:progress?.hints||0,solved:progress?.solved||false,points:progress?.points||0,...(progress?.hints?{hint:'Starts with '+q.answers[0].slice(0,progress.hints===1?1:3)}:{})}:null;
 return {serverTime:Date.now(),room:{id:r.id,pin:r.pin,title:r.title,phase,autoPace:Boolean(r.autoPace),nextRoundAt:r.nextRoundAt||null,joinOpen:r.joinOpen,revision:r.revision,runId:r.runId,game:r.settings?.game,roundNumber:r.cursor||0,roundCount:r.plan?.length,minutes:r.settings?.minutes,hintsEnabled:r.settings?.hints,expiresAt:new Date(r.expiresAt).toISOString()},round:rd?{id:rd.id,difficulty:q.difficulty,seconds:rd.seconds,deadline:rd.deadline,remaining:rd.remaining,elapsed,revealedAt:rd.revealedAt,data}:null,me,board:['lobby','reveal','finished'].includes(phase)?board(r):[],reveal:rd&&['reveal','finished'].includes(phase)?{answer:q.answers[0],answerLabel:q.public_data.options?.find(o=>o.id===q.answers[0])?.text||q.answers[0],explanation:q.explanation,source:q.source,voided:rd.voided}:null,counts:{players:r.players.filter(p=>p.active).length,answered:rd?Object.entries(rd.progress).filter(([id,g])=>g.attempts>0&&r.players.some(p=>p.id===id&&p.active)).length:0},...(host?{gameRoster:board(r),roster:board(r,true),removed:r.players.filter(p=>!p.active)}:{})};
}
const api={
 isDemo:true,session:async()=>({user:{email:'Local rehearsal'}}),login:async()=>({}),logout:async()=>{},bank:async()=>clone(bank),
 rooms:async()=>Object.values(load()).filter(r=>r.expiresAt>Date.now()).map(r=>({id:r.id,pin:r.pin,title:r.title,phase:r.phase,expiresAt:r.expiresAt})),
 create:title=>edit(all=>{if(title.trim().length<3)throw new Error('Use a title of at least three characters.');const id=newId();let pin;do{pin=String(Math.floor(Math.random()*900000)+100000);}while(Object.values(all).some(r=>r.pin===pin));all[id]={id,pin,title,phase:'lobby',autoPace:true,nextRoundAt:null,joinOpen:true,revision:0,expiresAt:Date.now()+172800000,players:[],rounds:[],requests:{}};return{id,pin};}),
 join:(pin,nickname,token)=>edit(all=>{const r=roomFor(all,pin),existing=r.players.find(p=>p.token===token);if(existing){if(!existing.active)throw new Error('This entry was removed by the host.');return existing;}if(!r.joinOpen)throw new Error('Joining is locked.');if(!/^[A-Za-z0-9][A-Za-z0-9 _-]{1,23}$/.test(nickname))throw new Error('Use a nickname of 2–24 letters, numbers, spaces, hyphens or underscores.');if(r.players.some(p=>p.nickname.toLowerCase()===nickname.trim().toLowerCase()))throw new Error('That nickname is taken.');if(r.players.filter(p=>p.active).length>=150)throw new Error('This room is full.');const p={id:newId(),nickname:nickname.trim(),token,active:true};r.players.push(p);return{id:p.id,nickname:p.nickname,pin};}),
 state:async(pin,token=null,id=null)=>{
  const all=load(),r=id?all[id]:roomFor(all,pin);if(!r)throw new Error('Room not found.');
  const due=r.autoPace&&((r.phase==='question'&&r.round.deadline<=Date.now())||(r.phase==='reveal'&&r.nextRoundAt&&r.nextRoundAt<=Date.now()));
  if(!due)return snapshot(r,token,Boolean(id));
  return edit(fresh=>{const current=id?fresh[id]:roomFor(fresh,pin);if(!current)throw new Error('Room not found.');tick(current);return snapshot(current,token,Boolean(id));});
 },
 control:(id,action,revision,options={})=>edit(all=>{
  const r=all[id];if(!r)throw new Error('Room not found.');if(r.revision!==revision)throw new Error('Room changed in another tab. Refresh and try again.');const rd=r.round;
  if(action==='start'){
   if(['question','paused'].includes(r.phase))throw new Error('Finish or reveal the current round first.');
   const counts=planCounts(options.minutes,options.profile),plan=[];
   LEVELS.forEach((level,i)=>{const pool=bank.filter(q=>q.game===options.game&&q.difficulty===level&&!options.exclude?.includes(q.id)).sort(()=>Math.random()-.5);if(pool.length<counts[i])throw new Error(`Not enough ${level} questions. Restore excluded questions.`);plan.push(...pool.slice(0,counts[i]).map(q=>q.id));});
   r.settings={...options,hints:options.hints!==false};r.runId=newId();r.plan=plan;r.cursor=0;next(r);
  }else if(action==='pause'){
   if(r.phase!=='question'||rd.deadline<=Date.now())throw new Error('Only an active round can be paused.');rd.elapsed+=(Date.now()-rd.resumedAt)/1000;rd.remaining=Math.max(0,(rd.deadline-Date.now())/1000);r.phase='paused';
  }else if(action==='resume'){
   if(r.phase!=='paused')throw new Error('This round is not paused.');rd.resumedAt=Date.now();rd.deadline=Date.now()+rd.remaining*1000;r.phase='question';
  }else if(action==='extend'){
   if(!['question','paused'].includes(r.phase))throw new Error('Start a round first.');if(r.phase==='paused')rd.remaining+=15;else rd.deadline=Math.max(rd.deadline,Date.now())+15000;
  }else if(['reveal','void','finish'].includes(action)){
   if(rd){if(r.phase==='question')rd.elapsed+=(Date.now()-rd.resumedAt)/1000;rd.revealedAt=Date.now();rd.voided||=action==='void';}r.phase=action==='finish'?'finished':'reveal';if(['finish','void'].includes(action))r.autoPace=false;r.nextRoundAt=r.autoPace&&action==='reveal'?Date.now()+(r.settings.minutes===15?10000:15000):null;
  }else if(action==='next'){if(r.phase!=='reveal')throw new Error('Reveal the current round first.');next(r);}
  else if(action==='autopace'){r.autoPace=Boolean(options.enabled);r.nextRoundAt=r.autoPace&&r.phase==='reveal'?Date.now()+(r.settings.minutes===15?10000:15000):null;}
  else if(action==='joining')r.joinOpen=!r.joinOpen;
  else if(action==='remove'){const p=r.players.find(p=>p.id===options.playerId);if(p)p.active=false;}
  else if(action==='delete'){delete all[id];return{deleted:true};}
  else throw new Error('Unknown host action.');
  // Keep the current round and historical ledger in sync after JSON round-trips.
  if(r.round){const i=r.rounds.findIndex(rd=>rd.id===r.round.id);r.rounds[i]=r.round;}
  r.revision++;return snapshot(r,null,true);
 }),
 answer:(pin,token,round,answer,request,hint=false)=>edit(all=>{
  const r=roomFor(all,pin),p=playerFor(r,token),rd=r.round;
  if(r.requests[request]){const old=r.requests[request];if(old.player!==p.id||old.round!==round||old.hint!==hint)throw new Error('Invalid request identifier.');return old.result;}
  if(rd?.id!==round)throw new Error('This round has changed.');if(r.phase!=='question'||rd.deadline<Date.now())throw new Error('Answers are closed for this round.');
  const q=bank.find(q=>q.id===rd.questionId);
  if(q.game==='deal'){if(q.public_data.hasUpdate&&rd.elapsed+(Date.now()-rd.resumedAt)/1000<rd.seconds/2)throw new Error('Wait for the briefing update before locking your decision.');if(!q.public_data.options.some(o=>o.id===answer))throw new Error('Choose one of the four decisions.');}
  const pr=rd.progress[p.id]??={attempts:0,hints:0,solved:false,points:0},max=q.game==='deal'?1:2;
  if(pr.solved||pr.attempts>=max)throw new Error('Your answer is already locked.');let result;
  if(hint){if(q.game!=='shuffle'||!r.settings.hints||pr.hints>=2)throw new Error('No more hints are available.');pr.hints++;result={hint:'Starts with '+q.answers[0].slice(0,pr.hints===1?1:3),hints:pr.hints};}
  else{const correct=q.answers.some(a=>normaliseAnswer(a)===normaliseAnswer(answer)),points=correct?pointsFor(rd.elapsed+(Date.now()-rd.resumedAt)/1000,rd.seconds,pr.hints,pr.attempts):0;pr.points=points;pr.solved=correct;pr.attempts++;result={correct,points,attempts:pr.attempts,attemptsRemaining:max-pr.attempts,locked:correct||pr.attempts>=max};}
  r.rounds[r.rounds.findIndex(x=>x.id===rd.id)]=rd;r.requests[request]={player:p.id,round,hint,result};return result;
 }),
};
export default api;
