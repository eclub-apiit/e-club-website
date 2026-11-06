import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {getPageSeo} from './site.js';
import useConvergencePromotion from '../hooks/useConvergencePromotion';

// Keep the head correct when React navigates without requesting a new HTML file.
export default function PageSeo(){
  const {pathname}=useLocation();
  const showConvergence=useConvergencePromotion();
  useEffect(()=>{
    const seo=getPageSeo(pathname);
    document.title=seo.title;
    const meta=(key,value,property=false)=>{
      const attribute=property?'property':'name';
      let node=document.head.querySelector(`meta[${attribute}="${key}"]`);
      if(!node){node=document.createElement('meta');node.setAttribute(attribute,key);document.head.append(node);}
      node.content=value;
    };
    meta('description',seo.description);meta('robots',seo.indexable?'index,follow,max-image-preview:large':'noindex,follow');
    for(const [key,value] of Object.entries({'og:type':'website','og:site_name':'APIIT Entrepreneurship Club','og:title':seo.title,'og:description':seo.description,'og:url':seo.url,'og:image':seo.image,'og:image:width':'1200','og:image:height':'630','og:image:alt':seo.heading,'og:locale':'en_LK'}))meta(key,value,true);
    for(const [key,value] of Object.entries({'twitter:card':'summary_large_image','twitter:title':seo.title,'twitter:description':seo.description,'twitter:image':seo.image,'twitter:image:alt':seo.heading}))meta(key,value);
    let canonical=document.head.querySelector('link[rel="canonical"]');
    if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.append(canonical);}
    canonical.href=seo.url;
    let structured=document.getElementById('site-structured-data');
    if(!structured){structured=document.createElement('script');structured.id='site-structured-data';structured.type='application/ld+json';document.head.append(structured);}
    structured.textContent=JSON.stringify(seo.structuredData);
  },[pathname,showConvergence]);
  return null;
}
