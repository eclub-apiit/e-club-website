import {useEffect,useRef,useState} from 'react';
import {Volume2,VolumeX} from 'lucide-react';

// Original synthesised cues: no music downloads, microphones or third-party audio.
export default function GameSound({state,now}){
 const [enabled,setEnabled]=useState(false),[unavailable,setUnavailable]=useState(false);
 const context=useRef(null),latest=useRef({state,now});latest.current={state,now};
 useEffect(()=>()=>{context.current?.close().catch(()=>{});},[]);
 useEffect(()=>{
  if(!enabled)return;
  let beat=0,lastPhase='',lastTick='';
  const note=(frequency,delay=0,duration=.14,volume=.018)=>{
   const audio=context.current;if(!audio||audio.state!=='running')return;
   const oscillator=audio.createOscillator(),gain=audio.createGain(),start=audio.currentTime+delay;
   oscillator.type='sine';oscillator.frequency.value=frequency;
   gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(volume,start+.015);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
   oscillator.connect(gain);gain.connect(audio.destination);oscillator.start(start);oscillator.stop(start+duration+.02);
   oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};
  };
  const play=()=>{
   const {state,now}=latest.current;if(!state?.round||document.hidden)return;
   const phase=state.room.phase,key=state.round.id+':'+phase;
   if(key!==lastPhase){lastPhase=key;lastTick='';if(phase==='question')[329.63,392,493.88].forEach((f,i)=>note(f,i*.09));else if(['reveal','finished'].includes(phase))[392,493.88,587.33].forEach((f,i)=>note(f,i*.12,.22));return;}
   const deadline=phase==='question'?state.round.deadline:phase==='reveal'&&state.room.autoPace?state.room.nextRoundAt:null;
   const seconds=deadline?Math.max(0,Math.ceil((deadline-now)/1000)):0;
   if(seconds>0&&seconds<=3){const tick=key+seconds;if(tick!==lastTick){lastTick=tick;note(phase==='question'?659.25:783.99,0,.09,.025);}}
   else if(phase==='question'&&seconds>3){const pattern=[164.81,196,246.94,196,164.81,220,196,246.94];note(pattern[beat++%pattern.length],0,.12,.009);}
  };
  play();const timer=setInterval(play,500);return()=>clearInterval(timer);
 },[enabled]);
 const toggle=async()=>{
  if(enabled){setEnabled(false);const audio=context.current;context.current=null;await audio?.close().catch(()=>{});return;}
  try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw new Error('Unsupported');context.current=new Audio();await context.current.resume();setEnabled(true);}catch{context.current?.close().catch(()=>{});context.current=null;setUnavailable(true);}
 };
 return <button type="button" className="sg-sound" onClick={toggle} disabled={unavailable} aria-pressed={enabled} title="Optional quiet music and countdown cues. For the room, enable on the projector only.">{enabled?<Volume2 size={15}/>:<VolumeX size={15}/>}<span>{unavailable?'Sound unavailable':enabled?'Sound on':'Sound off'}</span></button>;
}
