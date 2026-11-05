import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Menu, X, CalendarDays, Plus, Minus } from 'lucide-react';
import { summit, summitDate, agendaTime, getRegistrationUrl, downloadCalendar } from './event';
import Speakers from './Speakers';
import './summit.css';

const chapters=[
  {name:'The arrival',point:0}, {name:'Panel Discussion',point:.22}, {name:'Audience Q&A',point:.46},
  {name:'Magazine Launch',point:.64}, {name:'The boardroom',point:.81}, {name:'Your invitation',point:.96},
];
const boundaries=[0,.18,.35,.56,.735,.89];
// A short, scaled desktop window needs a flowing story rather than a clipped pinned viewport.
const flowingStoryQuery='(prefers-reduced-motion: reduce), (min-width:760px) and (max-height:560px)';
function BrandMarks(){
  return <div className="si-brand-marks" aria-label="E-Club, APIIT and Global Entrepreneurship Week">
    <div className="si-brand si-brand-eclub"><img src={summit.assets.eclub} width="782" height="224" alt="Entrepreneurship Club of APIIT"/></div>
    <div className="si-brand si-brand-apiit"><img src={summit.assets.apiit} width="272" height="145" alt="APIIT — Inspire love for learning"/></div>
    <div className="si-brand si-brand-gew"><img src={summit.assets.gew} width="768" height="284" alt="Global Entrepreneurship Week Sri Lanka"/></div>
  </div>;
}
function Register({children='Register your interest',className=''}) {
  const url=getRegistrationUrl();
  return <a data-summit-register className={`si-button ${className}`} href={url||'#registration'} {...(url?{target:'_blank',rel:'noopener noreferrer'}:{})}>{children}<ArrowUpRight size={17}/></a>;
}
function RoomFallback(){return <svg className="si-fallback" viewBox="0 0 900 650" aria-hidden="true"><defs><linearGradient id="si-floor"><stop stopColor="#263a40"/><stop offset="1" stopColor="#0e1c23"/></linearGradient></defs><path d="M80 420 430 210 830 390 470 610Z" fill="url(#si-floor)" stroke="#4f7475"/><path d="M80 420V180L430 30V210Z" fill="#344447"/><path d="M430 30 830 210V390L430 210Z" fill="#202f35"/><path d="m480 100 280 128v105L480 210Z" fill="#082a33" stroke="#5fc8bb"/><text x="530" y="185" fill="#7ce0ca" transform="rotate(24 530 185)" fontSize="23" fontFamily="sans-serif">CONVERGENCE</text>{Array.from({length:5},(_,r)=>Array.from({length:7},(_,c)=><g key={`${r}-${c}`} transform={`translate(${180+c*55+r*28} ${375+r*31-c*17})`}><path d="M0 0V-30L24-42 42-32V0L20 12Z" fill="#2b6267" stroke="#588188"/><path d="M0 0v16m42-16v16" stroke="#7b9190"/></g>))}</svg>;}
function Journey({onArrivalExit}){
  const section=useRef(null),canvas=useRef(null),engine=useRef(null),progressBar=useRef(null),micAnnotations=useRef(null);
  const [active,setActive]=useState(0),[ready,setReady]=useState(false),[failed,setFailed]=useState(false),[bookOpen,setBookOpen]=useState(false);
  const [reduced,setReduced]=useState(()=>window.matchMedia(flowingStoryQuery).matches);
  useEffect(()=>{const m=matchMedia(flowingStoryQuery);const change=()=>setReduced(m.matches);m.addEventListener('change',change);return()=>m.removeEventListener('change',change);},[]);
  useEffect(()=>{
    let cancelled=false,raf=0;const element=section.current;setReady(false);
    function update(){raf=0;if(!element.isConnected)return;const rect=element.getBoundingClientRect();const flowing=reduced||element.classList.contains('si-no-webgl');const p=flowing?0:Math.max(0,Math.min(1,-rect.top/(element.offsetHeight-innerHeight)));engine.current?.update(p);let next=0;boundaries.forEach((b,i)=>{if(p>=b)next=i;});setActive(next);onArrivalExit(flowing?(element.querySelector('.si-intro')?.getBoundingClientRect().bottom??Infinity)<110:next>0);if(progressBar.current)progressBar.current.style.transform=`scaleX(${p})`;}
    const scroll=()=>{if(!raf)raf=requestAnimationFrame(update);};
    import('./scene').then(({createSummitScene})=>{if(cancelled)return;engine.current=createSummitScene(canvas.current,{reduced,annotations:micAnnotations.current,onReady:()=>setReady(true),onError:()=>setFailed(true)});update();}).catch(()=>setFailed(true));
    window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);update();
    return()=>{cancelled=true;cancelAnimationFrame(raf);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll);engine.current?.dispose();engine.current=null;};
  },[reduced,onArrivalExit]);
  function go(index){const el=section.current;window.scrollTo({top:el.offsetTop+(el.offsetHeight-innerHeight)*chapters[index].point,behavior:reduced?'instant':'smooth'});}
  function flip(){setBookOpen(v=>{engine.current?.setBook(!v);return !v;});}
  const staticMode=reduced||failed;
  const visible=(i)=>({className:`si-story-panel ${i===0?'si-intro':''} ${active===i?'is-active':''}`,inert:!staticMode&&active!==i,'aria-hidden':!staticMode&&active!==i});
  return <section id="journey" ref={section} className={`si-journey ${staticMode?'si-reduced':''} ${failed?'si-no-webgl':''}`} aria-label="The Convergence story">
    <div className="si-stage">
      <div className="si-scene" aria-hidden="true"><div className={`si-canvas-layer ${ready&&!failed?'is-ready':''}`}><canvas ref={canvas} className={ready&&!failed?'is-ready':''}/></div>{failed?<RoomFallback/>:!ready&&<div className="si-scene-loading"><span/>Entering the room…</div>}</div>
      <div ref={micAnnotations} className="si-mic-annotations" role="list" aria-label="The summit, through the microphone">
        <svg aria-hidden="true">{[0,1,2].map(i=><g key={i}><polyline data-mic-leader={i}/><circle r="2.5"/></g>)}</svg>
        <div data-mic-callout="voice" role="listitem"><span>01 / Grille</span><h3>A voice.</h3><p>Experience worth hearing.</p></div>
        <div data-mic-callout="idea" role="listitem"><span>02 / Capsule</span><h3>An idea.</h3><p>A question that moves us forward.</p></div>
        <div data-mic-callout="connection" role="listitem"><span>03 / Connector</span><h3>A connection.</h3><p>A conversation to carry beyond the room.</p></div>
      </div>
      <div className="si-scene-shade"/>
      <div className="si-story-content">
        <article {...visible(0)}>
          <div className="si-hero-partners"><BrandMarks/></div>
          <img className="si-hero-wordmark" src={summit.assets.logo} alt="The Convergence Summit 2026" width="1817" height="448"/>
          <h1>Where Ideas<br/><em>Inspire Action.</em></h1>
          <p className="si-lede">One room. Different perspectives.<br/>A shared ambition to create what comes next.</p>
          <div className="si-event-line"><span>26 November 2026</span><span>{summit.venue}</span></div>
          <div className="si-actions"><Register className="si-hero-register">Register Now</Register><button className="si-text-button" onClick={()=>go(1)}>Enter the room <ArrowDown size={16}/></button></div>
        </article>
        <article {...visible(1)}>
          <p className="si-eyebrow">02 / Panel Discussion</p><h2>Take a seat.<br/><em>Shift your perspective.</em></h2>
          <p className="si-lede">The most valuable part of a conversation is often the perspective you didn’t arrive with.</p>
          <div className="si-story-detail"><span>10:30 am — 12 noon</span><strong>The panel discussion</strong><p>Entrepreneurial experiences. Industry insight. An open exchange between the stage and the room.</p></div>
          <a className="si-inline-link" href="#voices">Meet the voices <ArrowUpRight size={16}/></a>
        </article>
        <article {...visible(2)}>
          <p className="si-eyebrow">03 / Audience Q&A</p><h2>Good questions<br/><em>change the conversation.</em></h2>
          <p className="si-lede">The microphone brings a voice into the room. Your curiosity gives it somewhere to go.</p>
          <div className="si-story-detail"><span>Included in the panel</span><strong>Audience Q&A</strong><p>Ask about the decisions, the challenges, and the lessons behind an entrepreneurial journey.</p></div>
          <p className="si-mic-caption">Different parts. One conversation.</p>
          {staticMode&&<ul className="si-mic-summary"><li><strong>A voice.</strong> Experience worth hearing.</li><li><strong>An idea.</strong> A question that moves us forward.</li><li><strong>A connection.</strong> A conversation to carry beyond the room.</li></ul>}
        </article>
        <article {...visible(3)}>
          <p className="si-eyebrow">04 / Magazine Launch</p>{staticMode&&<div className={`si-static-book ${bookOpen?'is-open':''}`} aria-hidden="true"><div className="si-static-pages">Ideas worth<br/>taking forward.</div><div className="si-static-cover"><small>APIIT E-CLUB</small><span>Innovator’s<br/>Digest</span><small>VOLUME 4 · 2026</small></div></div>}<h2>Fresh perspectives.<br/><em>Bound to inspire.</em></h2>
          <p className="si-lede">Be there for the launch of <strong>Innovator’s Digest, Volume 4.</strong> Discover entrepreneurial insights, new perspectives, and ideas to put into action.</p>
          <div className="si-story-detail"><span>Following the panel</span><strong>The magazine launch</strong><p>Ideas. Insights. Innovation.</p></div>
          <button className="si-inline-link" onClick={flip} aria-pressed={bookOpen}>{bookOpen?'Close the cover':'Open the cover'} {bookOpen?<Minus size={16}/>:<Plus size={16}/>}</button>
        </article>
        <article {...visible(4)} data-boardroom>
          <p className="si-eyebrow">05 / The boardroom</p><h2>A different table.<br/><em>A new way to think.</em></h2>
          <p className="si-lede">{summit.copy.boardroom}</p>
          <div className="si-story-detail"><span>12:30 pm — 3:00 pm</span><strong>Challenge. Collaborate. Present.</strong><p>Teams of up to 10. The top three performing teams will be recognised.</p></div>
          <a className="si-inline-link" href="#programme">Follow the day <ArrowUpRight size={16}/></a>
        </article>
        <article {...visible(5)}>
          <p className="si-eyebrow">06 / Your invitation</p><h2>The room is ready<br/><em>for your perspective.</em></h2>
          <p className="si-lede">Students. Aspiring entrepreneurs. Innovators. Professionals. Different starting points, one place to connect.</p>
          <p className="si-invitation-theme">Entrepreneurship thrives here.</p><Register>Join the convergence</Register>
        </article>
      </div>
      <span className="si-model-note" hidden={active===2}>{active===0||active===1||active===5?'A space for possibility':active===2?'Every conversation starts somewhere':active===3?'Innovator’s Digest / Volume 4':'Ideas become decisions'}</span>
      <div className="si-story-bar"><div className="si-current"><span>{String(active+1).padStart(2,'0')} / 06</span><b>{chapters[active].name}</b></div><nav aria-label="Story chapters">{chapters.map((c,i)=><button key={c.name} onClick={()=>go(i)} aria-label={`Chapter ${i+1}: ${c.name}`} aria-current={i===active?'step':undefined}><span/>{String(i+1).padStart(2,'0')}</button>)}</nav><a href="#about" className="si-skip">Skip to event details <ArrowDown size={14}/></a><div className="si-progress"><span ref={progressBar}/></div></div>
    </div>
  </section>;
}
function Programme(){
  const [current,setCurrent]=useState(0);const articles=useRef([]);
  useEffect(()=>{const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setCurrent(Number(entry.target.dataset.index));},{rootMargin:'-30% 0px -40% 0px'});articles.current.forEach(el=>el&&observer.observe(el));return()=>observer.disconnect();},[]);
  const acts=['Settle in.','Set the scene.','Listen closely.','Turn the page.','Start a conversation.','Think together.','Make your case.','Carry it forward.'];
  return <section id="programme" className="si-programme si-wrap" aria-labelledby="programme-heading">
    <div className="si-programme-intro"><p className="si-eyebrow">The programme / 26 November</p><h2 id="programme-heading">A day that<br/><em>moves you forward.</em></h2><p>From your first conversation to your next idea. Follow the day as it unfolds.</p></div>
    <div className="si-programme-layout"><aside className="si-agenda-sticky"><span className="si-agenda-number" aria-hidden="true">{String(current+1).padStart(2,'0')}<small>/ {String(summit.agenda.length).padStart(2,'0')}</small></span><p className="si-eyebrow">{agendaTime(summit.agenda[current])}</p><strong>{acts[current]}</strong><nav aria-label="Programme moments">{summit.agenda.map((item,i)=><a key={item.id} href={`#moment-${item.id}`} aria-label={item.title} aria-current={current===i?'step':undefined}><span/>{String(i+1).padStart(2,'0')}</a>)}</nav><p className="si-programme-note">Follow the day from the first conversation to your next connection.</p></aside>
    <div className="si-agenda-moments">{summit.agenda.map((item,i)=><article key={item.id} id={`moment-${item.id}`} ref={el=>articles.current[i]=el} data-index={i} className={current===i?'is-current':''}><div className="si-moment-meta"><span>{String(i+1).padStart(2,'0')} / {agendaTime(item)}</span>{item.provisional&&<span className="si-tag">Provisional</span>}</div><h3>{acts[i]}</h3><h4>{item.title}</h4><p>{item.description}</p>{item.id==='panel'&&<a href="#voices" className="si-inline-link">The panel <ArrowUpRight size={15}/></a>}</article>)}</div></div>
  </section>;
}
export default function SummitPage(){
  const [menu,setMenu]=useState(false),[showNavWordmark,setShowNavWordmark]=useState(false),[hideNavRegistration,setHideNavRegistration]=useState(true);const menuButton=useRef(null),site=useRef(null);
  useEffect(()=>{const title=document.title;document.title='The Convergence Summit 2026 — Enter the room';document.documentElement.classList.add('si-document');return()=>{document.title=title;document.documentElement.classList.remove('si-document');};},[]);
  useEffect(()=>{
    const root=site.current,main=root.querySelector('main');
    const actions=[...main.querySelectorAll('[data-summit-register]')];
    let frame=0,disposed=false;
    const update=()=>{
      frame=0;if(disposed||!root.isConnected)return;
      const headerBottom=root.querySelector('.si-header').getBoundingClientRect().bottom;
      const inlineVisible=actions.some(action=>{
        const panel=action.closest('.si-story-panel');
        if(action.closest('[inert]'))return false;
        if(panel){if(!panel.classList.contains('is-active')&&!panel.closest('.si-reduced'))return false;}
        else if(getComputedStyle(action).visibility!=='visible')return false;
        const rect=action.getBoundingClientRect();
        const visibleHeight=Math.min(rect.bottom,innerHeight)-Math.max(rect.top,headerBottom+8);
        return rect.width>0&&rect.right>0&&rect.left<innerWidth&&visibleHeight>=Math.min(20,rect.height*.4);
      });
      setHideNavRegistration(inlineVisible);
    };
    const request=()=>{if(!disposed&&!frame)frame=requestAnimationFrame(update);};
    const observer=new MutationObserver(request);
    observer.observe(main,{subtree:true,attributes:true,attributeFilter:['class','inert']});
    addEventListener('scroll',request,{passive:true});addEventListener('resize',request);
    document.fonts.ready.then(request);update();
    return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();removeEventListener('scroll',request);removeEventListener('resize',request);};
  },[]);
  useEffect(()=>{if(!menu)return;const escape=e=>{if(e.key==='Escape'){setMenu(false);menuButton.current?.focus();}};window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape);},[menu]);
  return <div ref={site} className="si-site">
    <a className="si-skip-access" href="#about">Skip the animated story</a>
    <header className="si-header"><a href="#journey" aria-label="Convergence Summit, back to the beginning"><span className={`si-nav-arrival ${showNavWordmark?'is-hidden':''}`} aria-hidden="true">26 November 2026<small>Global Entrepreneurship Week</small></span><img className={showNavWordmark?'si-nav-wordmark is-visible':'si-nav-wordmark'} src={summit.assets.logo} width="1817" height="448" alt="The Convergence Summit 2026"/></a><nav className="si-desktop-nav" aria-label="Summit navigation"><a href="#journey">The experience</a><a href="#voices">The voices</a><a href="#programme">The programme</a><Link to="/">E-Club <ArrowUpRight size={12}/></Link></nav><div className="si-header-actions"><div className={`si-nav-registration is-visible si-nav-action is-register ${hideNavRegistration?'is-suppressed':''}`} inert={hideNavRegistration} aria-hidden={hideNavRegistration}><div className="si-nav-register-label"><Register>Register Now</Register></div></div><button ref={menuButton} className="si-menu-button" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} aria-controls="si-mobile-menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div>{menu&&<nav id="si-mobile-menu" className="si-mobile-menu" aria-label="Mobile summit navigation" onClick={()=>setMenu(false)}><a href="#journey">The experience</a><a href="#voices">The voices</a><a href="#programme">The programme</a><Link to="/">Back to E-Club</Link></nav>}</header>
    <main><Journey onArrivalExit={setShowNavWordmark}/>
      <section id="about" className="si-about si-wrap" aria-labelledby="about-heading"><p className="si-eyebrow">The reason we come together</p><div className="si-about-grid"><h2 id="about-heading">Different perspectives.<br/><em>Shared possibilities.</em></h2><div><p className="si-body-large">{summit.copy.purpose}</p><p>{summit.copy.introduction}</p><div className="si-organiser-brand"><span className="si-eyebrow">Meet the organisers</span><Link to="/" aria-label="Meet the Entrepreneurship Club of APIIT"><img src={summit.assets.eclub} width="782" height="224" alt="Entrepreneurship Club of APIIT"/></Link><p>Bringing university communities and industry together.</p></div></div></div><div className="si-audiences">{summit.audiences.map((a,i)=><div key={a.title}><span>0{i+1}</span><h3>{a.title}</h3><p>{a.description}</p></div>)}</div></section>
      <Speakers/>
      <Programme/>
      <section id="registration" className="si-registration si-wrap" aria-labelledby="registration-heading"><div className="si-registration-top"><p className="si-eyebrow">An invitation to what’s next</p><span>26.11.2026</span></div><h2 id="registration-heading">Bring your curiosity.<br/><em>Find your convergence.</em></h2><div className="si-registration-bottom"><div><p>{summitDate.full} · 9:30 am onwards</p><p>{summit.venue}</p>{summit.venueDetails.address&&<p>{summit.venueDetails.address}</p>}{summit.venueDetails.mapsUrl&&<a className="si-inline-link" href={summit.venueDetails.mapsUrl} target="_blank" rel="noopener noreferrer">View location <ArrowUpRight size={14}/></a>}<p className="si-registration-status" role="status">{getRegistrationUrl()?'Registration is open. Reserve your place using the official Microsoft form.':'Registration link coming soon. Save the date and check back for the official form.'}</p></div><div className="si-registration-actions">{getRegistrationUrl()&&<Register>Register Now</Register>}<button className="si-button si-button-outline" onClick={downloadCalendar}>Save the date <CalendarDays size={17}/></button></div></div></section>
    </main>
    <footer className="si-footer si-wrap">
      <div className="si-footer-top"><div className="si-footer-event"><img src={summit.assets.logo} width="1817" height="448" alt="The Convergence Summit 2026"/><p>Where Ideas Inspire Action.</p><span>26 November 2026 · {summit.venue}</span></div><div className="si-footer-brands"><p className="si-eyebrow">An Entrepreneurship Week experience</p><BrandMarks/></div></div>
      <div className="si-footer-bottom"><p>© {summitDate.year} Entrepreneurship Club of APIIT</p><nav aria-label="Footer summit navigation"><a href="#programme">The programme</a><a href="#registration">Registration <ArrowUpRight size={12}/></a><Link to="/">Back to E-Club <ArrowUpRight size={12}/></Link></nav><a href="#journey">Back to top <ArrowUpRight size={13}/></a></div>
    </footer>
  </div>;
}
