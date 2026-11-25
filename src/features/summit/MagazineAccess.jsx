import {useEffect,useState} from 'react';
import {ArrowUpRight,BookOpen,QrCode} from 'lucide-react';
import {summit} from './event';

export function magazineLink(value=''){
  if(!value.trim())return '';
  try{const url=new URL(value, 'https://eclub.apiit.lk');return url.protocol==='https:'&&!url.username&&!url.password?url.href:'';}catch{return '';}
}
export default function MagazineAccess(){
  const {qrImage='',url='',title,volume}=summit.magazine;
  const [imageFailed,setImageFailed]=useState(false);
  useEffect(()=>setImageFailed(false),[qrImage]);
  const link=magazineLink(url),hasQr=Boolean(qrImage&&!imageFailed),available=Boolean(hasQr||link);
  return <section id="digital-magazine" className="si-digital-magazine si-wrap" aria-labelledby="digital-magazine-heading">
    <div className="si-magazine-copy"><p className="si-eyebrow">Official Publication / {title}</p><h2 id="digital-magazine-heading">The next page.<br/><em>In your hands.</em></h2><p>The official digital launch of {title}, Volume {volume}. Explore inspiring entrepreneur stories, global industry articles, club event highlights, and interactive games — available right on your screen.</p><span className="si-magazine-status"><span aria-hidden="true"/>{available?'Explore the digital edition':'Digital edition coming soon'}</span>{link&&<a className="si-button" href={link} target="_blank" rel="noopener noreferrer">Read the magazine <ArrowUpRight size={17}/></a>}</div>
    <div className="si-magazine-access"><div className="si-magazine-access-top"><BookOpen size={19}/><span>Innovator’s Digest<small>VOLUME {volume} · 2026</small></span></div>{hasQr?<div className="si-magazine-qr"><div className="si-magazine-qr-frame"><img src={qrImage} width="240" height="240" alt={`Scan to view ${title}, Volume ${volume}, online`} onError={()=>setImageFailed(true)}/></div><p>Scan to read on your device · Flipbook edition</p></div>:<div className="si-magazine-qr-placeholder"><QrCode size={44} strokeWidth={1} aria-hidden="true"/><strong>{link?'Your next read is ready.':'A new chapter is on its way.'}</strong><p>{imageFailed?'The magazine QR is temporarily unavailable. Please check back shortly.':link?'Open the digital edition using the magazine link.':'The magazine QR code will be released here soon. Check back for your online copy.'}</p></div>}<span className="si-magazine-access-note">Ideas worth taking forward.</span></div>
  </section>;
}
