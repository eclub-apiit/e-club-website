export const GAME_PATH='/convergence-summit-2026/play';
export const GAMES={
 shuffle:{name:'Founder Shuffle',label:'Think in letters.',description:'Unpick a business idea, one letter at a time. Two attempts. Optional hints cost points.',icon:'↗',accent:'#80e0c5'},
 brand:{name:'Brand Detective',label:'Connect the clues.',description:'Recognise familiar names from three progressively revealed clues. Two attempts per brand.',icon:'◈',accent:'#d6b5ff'},
 deal:{name:'Founder’s Call',label:'Make the call.',description:'Navigate a startup curveball. Choose the strongest move for the stated goal. One final decision; hard rounds unlock after a briefing update.',icon:'⇄',accent:'#ffd280'},
};
export const LEVELS=['easy','medium','hard'];
export function planCounts(minutes,profile){
 const long=Number(minutes)===15;
 return profile==='gentle'?(long?[8,6,4]:[6,4,2]):profile==='challenge'?(long?[4,6,8]:[2,4,6]):(long?[6,6,6]:[4,4,4]);
}
export function secondsFor(minutes,difficulty,override=0){return Number(override)||({easy:25,medium:35,hard:45}[difficulty]+(Number(minutes)===15?5:0));}
export const normaliseAnswer=value=>String(value).toLowerCase().replace(/[^a-z0-9]/g,'');
export function pointsFor(elapsed,seconds,hints=0,wrong=0){return Math.max(100,1000+Math.floor(200*Math.max(0,1-elapsed/seconds))-150*hints-100*wrong);}
export function newToken(){return [...crypto.getRandomValues(new Uint8Array(32))].map(v=>v.toString(16).padStart(2,'0')).join('');}
export function shuffleLetters(answer){
 const letters=answer.replace(/[^a-z]/gi,'').toUpperCase().split('');
 for(let i=letters.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[letters[i],letters[j]]=[letters[j],letters[i]];}
 if(letters.join('')===answer.replace(/\s/g,''))letters.push(letters.shift());
 return letters.join('');
}
export function newId(){
 if(crypto.randomUUID)return crypto.randomUUID();
 const bytes=crypto.getRandomValues(new Uint8Array(16));bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;
 const hex=[...bytes].map(b=>b.toString(16).padStart(2,'0')).join('');return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}
