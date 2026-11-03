import { useEffect, useRef, useState } from 'react';
import { summit, agendaTime } from './event';

const story=[
  ['A seat for experience.', 'Meet the people bringing real business perspectives to the stage.'],
  ['A different point of view.', 'Each voice adds another perspective to the conversation.'],
  ['Look beyond the headline.', 'Get curious about the decisions and experiences behind an entrepreneurial journey.'],
  ['Your questions belong here.', 'Industry insight meets audience curiosity in the panel Q&A.'],
  ['Take a perspective with you.', 'Continue the conversation in the connections you make after the panel.'],
];

export default function Speakers(){
  const root=useRef(null),sticky=useRef(null);
  const [active,setActive]=useState(0),[entered,setEntered]=useState(false);
  const [reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[]);
  useEffect(()=>{
    if(reduced){setEntered(true);return;}
    let frame=0;
    const update=()=>{frame=0;const el=root.current;if(!el||!sticky.current||!el.isConnected)return;const rect=el.getBoundingClientRect(),header=innerWidth<760?68:innerWidth<850?76:88;
      if(rect.top<innerHeight*.75&&rect.bottom>header)setEntered(true);
      const travel=el.offsetHeight-sticky.current.offsetHeight;
      const p=Math.max(0,Math.min(1,(header-rect.top)/Math.max(1,travel)));
      setActive(Math.round(p*(summit.speakers.length-1)));
    };
    const request=()=>{if(!frame)frame=requestAnimationFrame(update);};
    addEventListener('scroll',request,{passive:true});addEventListener('resize',request);update();
    return()=>{cancelAnimationFrame(frame);removeEventListener('scroll',request);removeEventListener('resize',request);};
  },[reduced]);
  function focusSeat(index){
    const el=root.current;if(!el||!sticky.current)return;const header=innerWidth<760?68:innerWidth<850?76:88;
    scrollTo({top:el.offsetTop-header+(el.offsetHeight-sticky.current.offsetHeight)*index/Math.max(1,summit.speakers.length-1),behavior:reduced?'instant':'smooth'});
  }
  const narrative=story[Math.min(active,story.length-1)],speaker=summit.speakers[active];
  return <section id="voices" ref={root} className={`si-voices si-speaker-story ${entered?'is-revealed':''} ${reduced?'is-still':''}`} aria-labelledby="voices-heading">
    <div ref={sticky} className="si-speaker-sticky si-wrap">
      <div className="si-speaker-introduction"><p className="si-eyebrow">Panel Discussion / {agendaTime(summit.agenda.find(a=>a.id==='panel'))}</p><h2 id="voices-heading">People with stories.<br/><em>Perspectives worth hearing.</em></h2>
        <div className="si-speaker-narrative" key={active}><span>{String(active+1).padStart(2,'0')} / {String(summit.speakers.length).padStart(2,'0')} · The conversation</span><h3>{narrative[0]}</h3><p>{narrative[1]}</p></div>
        <p className="si-speaker-scroll-cue">Scroll to meet the voices <span aria-hidden="true">↓</span></p>
      </div>
      <div className="si-speaker-theatre">
        <div className="si-speakers si-speaker-cast" style={{'--speaker-count':summit.speakers.length}}>
          {summit.speakers.map((person,i)=><article key={person.id} className={`si-speaker-card ${i===active?'is-focused':''}`} aria-hidden={!reduced&&i!==active} inert={!reduced&&i!==active} style={{'--seat-offset':i-active,'--seat-distance':Math.abs(i-active),'--speaker-order':i,zIndex:summit.speakers.length-Math.abs(i-active)}}>
            <div className="si-speaker-seat" aria-hidden="true"><span className="si-speaker-spotlight"/>{person.confirmed&&person.image?<img className="si-speaker-portrait" src={person.image} alt="" loading="lazy"/>:<><span className="si-seat-back"/><span className="si-seat-bottom"/><span className="si-seat-leg"/><span className="si-seat-leg second"/></>}<b>{String(i+1).padStart(2,'0')}</b></div>
            <div className="si-speaker-card-copy"><p className="si-eyebrow">The panel / {String(i+1).padStart(2,'0')}</p><h3>{person.confirmed&&person.name?person.name:'To be announced'}</h3><p>{person.confirmed?[person.role,person.organisation].filter(Boolean).join(' · '):'Speaker announcement coming soon'}</p></div>
          </article>)}
        </div>
        <div className="si-speaker-controls" role="group" aria-label="Explore the panel speakers">{summit.speakers.map((person,i)=><button key={person.id} type="button" aria-label={`Focus speaker ${i+1}${person.confirmed&&person.name?`: ${person.name}`:''}`} aria-current={active===i?'step':undefined} onClick={()=>focusSeat(i)}><span/>{String(i+1).padStart(2,'0')}</button>)}</div>
        <p className="si-speaker-status" aria-live="polite">{speaker.confirmed&&speaker.name?speaker.name:'The seats are set. The voices will be announced soon.'}</p>
      </div>
    </div>
  </section>;
}
