import {createClient} from '@supabase/supabase-js';
const url=import.meta.env.VITE_GAMES_SUPABASE_URL||'';
const key=import.meta.env.VITE_GAMES_SUPABASE_PUBLISHABLE_KEY||'';
export const isConfigured=Boolean(url&&key);
export const canRehearse=import.meta.env.DEV;
let hostClient,guestClient;
function client(host=false){
 if(!isConfigured)throw new Error('Live play is not connected yet.');
 let role='';try{role=JSON.parse(atob(key.split('.')[1].replace(/-/g,'+').replace(/_/g,'/'))).role;}catch{/* Publishable keys are not JWTs. */}
 if(key.startsWith('sb_secret_')||role==='service_role')throw new Error('Use the publishable key, never a Supabase secret key.');
 if(host){hostClient??=createClient(url,key,{auth:{storageKey:'convergence-games-host-v1',persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});return hostClient;}
 guestClient??=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});return guestClient;
}
async function rpc(name,args={},host=false){
 const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),12000);
 try{
  const {data,error}=await client(host).rpc(name,args).abortSignal(controller.signal);
  if(error)throw new Error(error.code==='PGRST202'?'The games database needs its setup SQL. Ask the organiser.':error.message);
  return data;
 }finally{clearTimeout(timeout);}
}
const live={
 isDemo:false,
 session:async()=>{const {data,error}=await client(true).auth.getSession();if(error)throw error;return data.session;},
 login:async(email,password)=>{const {data,error}=await client(true).auth.signInWithPassword({email,password});if(error)throw error;return data.session;},
 logout:()=>client(true).auth.signOut(),
 rooms:()=>rpc('sg_host_rooms',{},true),
 bank:()=>rpc('sg_bank',{},true),
 create:title=>rpc('sg_create_room',{p_title:title},true),
 join:(pin,nickname,token)=>rpc('sg_join',{p_pin:pin,p_nickname:nickname,p_token:token}),
 state:(pin,token=null,id=null)=>id?rpc('sg_host_state',{p_room_id:id},true):rpc('sg_state',{p_pin:pin,p_token:token}),
 control:(id,action,revision,options={})=>rpc('sg_control',{p_room_id:id,p_action:action,p_revision:revision,p_options:options},true),
 answer:(pin,token,round,answer,request,hint=false)=>rpc('sg_answer',{p_pin:pin,p_token:token,p_round_id:round,p_answer:answer,p_request_id:request,p_hint:hint}),
};
export async function gamesApi(rehearsal){
 if(rehearsal){
  // Dead-code eliminated from production. Live answers never enter the public build.
  if(import.meta.env.DEV)return (await import('./rehearsal.js')).default;
  throw new Error('Local rehearsal is available with npm run dev. Live rooms need Supabase.');
 }
 return live;
}
