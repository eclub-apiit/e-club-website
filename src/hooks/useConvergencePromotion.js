import {useEffect, useState} from 'react';
import {convergencePromotionEndsAt, isConvergencePromoted} from '../data/registrations';

export default function useConvergencePromotion(){
  const [active,setActive]=useState(()=>isConvergencePromoted());
  useEffect(()=>{
    let timer;
    const refresh=()=>{
      clearTimeout(timer);
      const visible=isConvergencePromoted();
      setActive(visible);
      if(visible)timer=setTimeout(refresh,Math.min(convergencePromotionEndsAt-Date.now(),2147483647));
    };
    refresh();
    // Recheck suspended tabs as soon as visitors return.
    window.addEventListener('focus',refresh);
    window.addEventListener('pageshow',refresh);
    document.addEventListener('visibilitychange',refresh);
    return()=>{clearTimeout(timer);window.removeEventListener('focus',refresh);window.removeEventListener('pageshow',refresh);document.removeEventListener('visibilitychange',refresh);};
  },[]);
  return active;
}
