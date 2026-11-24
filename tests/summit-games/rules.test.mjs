import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {planCounts,secondsFor,pointsFor,shuffleLetters,normaliseAnswer} from '../../src/features/summit-games/rules.js';
const bank=JSON.parse(await readFile('supabase/content/questions.json','utf8'));
test('Every pace has enough unique questions and stays near the advertised duration',()=>{
 assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
 for(const game of ['shuffle','brand','deal'])for(const minutes of [10,15])for(const profile of ['gentle','progressive','challenge']){
  const counts=planCounts(minutes,profile);assert.equal(counts.reduce((a,b)=>a+b),minutes===10?12:18);
  let duration=0;['easy','medium','hard'].forEach((level,i)=>{assert.ok(bank.filter(q=>q.game===game&&q.difficulty===level).length>=counts[i]);duration+=counts[i]*(secondsFor(minutes,level)+(minutes===10?15:10));});
  assert.ok(duration/60>=8&&duration/60<=17,`${game} ${minutes} ${profile}: ${duration/60}min`);
 }
});
test('Pivot scenarios have four distinct choices, one accepted decision and meaningful hard updates',()=>{
 const scenarios=bank.filter(q=>q.game==='deal');assert.equal(scenarios.length,30);
 for(const q of scenarios){const d=q.public_data;assert.equal(d.format,'pivot');assert.equal(d.options.length,4);assert.equal(new Set(d.options.map(o=>o.id)).size,4);assert.equal(new Set(d.options.map(o=>o.text)).size,4);assert.equal(q.answers.length,1);assert.ok(d.options.some(o=>o.id===q.answers[0]));assert.ok(d.scenario.length>30);assert.ok(d.objective.length>15);assert.equal(d.hasUpdate,q.difficulty==='hard');if(d.hasUpdate)assert.ok(d.update.length>40);}
 const clues=bank.filter(q=>q.game==='brand').flatMap(q=>q.public_data.clues);assert.ok(clues.every(c=>!/(?:starts? with|begins? with|ends? with|six-letter|five-letter|iPhone|iPad)/i.test(c)));
 assert.ok(bank.some(q=>q.title==='Red Bull'));assert.ok(bank.some(q=>q.title==='Munchee'));
});
test('Word tiles preserve every letter, aliases normalise, and clues do not name their brand',()=>{
 for(const q of bank){assert.ok(q.answers.length);assert.ok(q.explanation.length>15);if(q.game==='shuffle'){assert.equal([...shuffleLetters(q.answers[0])].sort().join(''),[...q.answers[0].toUpperCase().replace(/[^A-Z]/g,'')].sort().join(''));assert.equal(q.public_data.wordLengths.reduce((a,b)=>a+b),normaliseAnswer(q.answers[0]).length);}
 if(q.game==='brand'){assert.equal(q.public_data.clues.length,3);assert.ok(q.source.startsWith('https://'));for(const clue of q.public_data.clues)assert.ok(!clue.toLowerCase().includes(q.answers[0].toLowerCase()),q.id);}}
 assert.equal(normaliseAnswer('Pick-Me!'),'pickme');assert.equal(pointsFor(0,30),1200);assert.equal(pointsFor(30,30),1000);assert.equal(pointsFor(0,30,2,1),800);
});
