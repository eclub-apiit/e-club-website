import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import QRCode from 'qrcode';
import {readFile,mkdir} from 'node:fs/promises';
const bank=JSON.parse(await readFile('supabase/content/questions.json','utf8'));
const base=process.env.GAMES_TEST_BASE_URL||'http://127.0.0.1:5173',path='/convergence-summit-2026/play';
const output='/tmp/convergence-games-review';await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});let debugHost,debugPlayer;
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000}});context.setDefaultTimeout(15000);context.setDefaultNavigationTimeout(30000);const errors=[];
 const host=await context.newPage(),player=await context.newPage(),screen=await context.newPage();debugHost=host;debugPlayer=player;
 for(const p of [host,player,screen]){p.setDefaultTimeout(15000);p.on('pageerror',e=>errors.push(e.message));}
 console.log('Opening local rehearsal');
 await host.goto(base+path+'/host?rehearsal=1',{waitUntil:'networkidle'});
 await host.getByRole('button',{name:/Create room/}).click();await host.locator('.sg-host-room .sg-pin').waitFor();const pin=(await host.locator('.sg-host-room .sg-pin').innerText()).trim();await host.getByLabel('Auto pace',{exact:true}).uncheck();
 await player.goto(`${base}${path}?room=${pin}&rehearsal=1`,{waitUntil:'networkidle'});await player.getByLabel('Nickname',{exact:false}).fill('Ada Founder');await player.getByRole('button',{name:'Join the room'}).click();await player.locator('.sg-waiting').waitFor();
 await screen.goto(`${base}${path}/screen?room=${pin}&rehearsal=1`,{waitUntil:'networkidle'});await screen.locator('.sg-screen-lobby').waitFor();
 assert.match(await host.locator('.sg-participant-count').innerText(),/Participants joined: 1/);await host.screenshot({path:`${output}/host-lobby.png`});await player.screenshot({path:`${output}/player-lobby.png`});await screen.screenshot({path:`${output}/projector-lobby.png`});
 console.log('Testing Founder Shuffle');await host.getByLabel('Session',{exact:true}).selectOption('15');await host.getByRole('button',{name:/Start Founder Shuffle/}).click();await player.locator('.sg-letters').waitFor();assert.match(await player.locator('.sg-round-meta').innerText(),/18/);
 const answer=async()=>{const id=await host.evaluate(()=>Object.values(JSON.parse(localStorage.getItem('convergence-local-rehearsal-v2')))[0].round.questionId);return bank.find(q=>q.id===id).answers[0];};
 await host.getByRole('button',{name:'Pause',exact:true}).click();await player.waitForFunction(()=>document.querySelector('.sg-phase-note')?.textContent.includes('paused'));assert.equal(await player.locator('#sg-answer').isDisabled(),true);
 await host.getByRole('button',{name:/15 seconds/}).click();await host.getByRole('button',{name:'Resume',exact:true}).click();await player.locator('#sg-answer').waitFor({state:'visible'});await player.waitForFunction(()=>!document.querySelector('#sg-answer').disabled);
 await player.getByRole('button',{name:/Reveal a hint/}).click();await player.locator('.sg-hint-copy').waitFor();await player.locator('#sg-answer').fill(await answer());await player.getByRole('button',{name:/Lock in/}).click();await player.waitForFunction(()=>document.querySelector('.sg-notice')?.textContent.includes('Correct.'));
 assert.equal(await player.locator('#sg-answer').isDisabled(),true);await host.getByRole('button',{name:'Reveal answer'}).click();await player.locator('.sg-reveal').waitFor();assert.match(await player.locator('.sg-board').innerText(),/Ada Founder/);assert.match(await player.locator('.sg-your-rank').innerText(),/#1/);
 const download=host.waitForEvent('download');await host.getByRole('button',{name:'Export CSV'}).click();const dl=await download;let csv='';for await(const chunk of await dl.createReadStream())csv+=chunk;assert.match(csv,/Ada Founder/);assert.match(csv,/Current game points/);
 await host.getByRole('button',{name:/Next round/}).click();await player.locator('.sg-question').waitFor();
 host.once('dialog',d=>d.accept());await host.getByRole('button',{name:'Finish game'}).click();await player.locator('.sg-reveal').waitFor();
 for(const [game,name] of [['brand','Brand Detective'],['deal','Founder’s Call']]){
  await host.getByLabel('Game',{exact:true}).selectOption(game);await host.getByLabel('Session',{exact:true}).selectOption('10');await host.getByRole('button',{name:`Start ${name}`}).click();await player.locator(`.sg-game-${game}`).waitFor();
  if(game==='brand'){assert.equal(await player.locator('.sg-clues li.is-open').count(),1);await player.locator('#sg-answer').fill(await answer());await player.getByRole('button',{name:/Lock in/}).click();}
  else{await player.locator('.sg-pivot-decisions button').nth((await answer()).charCodeAt(0)-97).click();}
  await player.waitForFunction(()=>document.querySelector('.sg-notice')?.textContent.includes('Correct.'));await host.getByRole('button',{name:'Reveal answer'}).click();await player.locator('.sg-reveal').waitFor();
  await host.screenshot({path:`${output}/host-${game}.png`});await screen.screenshot({path:`${output}/screen-${game}.png`});
 }
 console.log('Testing the hard-round briefing update');
 await host.getByLabel('Difficulty progression').selectOption('challenge');await host.getByLabel('Time per question').selectOption('15');await host.getByRole('button',{name:'Start Founder’s Call'}).click();
 for(let n=0;n<6;n++){await host.getByRole('button',{name:'Reveal answer'}).click();await host.getByRole('button',{name:/Next round/}).click();}
 await player.locator('.sg-pivot-update:not(.is-ready)').waitFor();assert.equal(await player.locator('.sg-pivot-decisions button:disabled').count(),4);
 await player.locator('.sg-pivot-update.is-ready').waitFor();assert.equal(await player.locator('.sg-pivot-decisions button:enabled').count(),4);
 await player.locator('.sg-pivot-decisions button').nth((await answer()).charCodeAt(0)-97).click();await player.waitForFunction(()=>document.querySelector('.sg-notice')?.textContent.includes('Correct.'));
 await player.screenshot({path:output+'/pivot-hard-update.png'});await host.getByRole('button',{name:'Reveal answer'}).click();await host.getByLabel('Time per question').selectOption('0');
 for(const [width,height] of [[1440,1000],[1024,768],[390,844],[320,568]]){
  await player.setViewportSize({width,height});await host.getByLabel('Game',{exact:true}).selectOption('shuffle');await host.getByRole('button',{name:/Start Founder Shuffle/}).click();await player.locator('.sg-game-shuffle').waitFor();assert.ok(await player.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Player overflow ${width}`);await player.screenshot({path:`${output}/player-${width}.png`});
  await host.setViewportSize({width,height});assert.ok(await host.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Host overflow ${width}`);if(width===390)await host.screenshot({path:`${output}/host-mobile.png`});
  host.once('dialog',d=>d.accept());await host.getByRole('button',{name:'Finish game'}).click();await host.getByLabel('Game',{exact:true}).selectOption('deal');await host.getByRole('button',{name:'Start Founder’s Call'}).click();await player.locator('.sg-game-deal').waitFor();assert.ok(await player.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Deal overflow ${width}`);if(width===390)await player.screenshot({path:`${output}/deal-mobile.png`});
  host.once('dialog',d=>d.accept());await host.getByRole('button',{name:'Finish game'}).click();await player.getByText('That’s a wrap.',{exact:true}).waitFor();
 }
 await host.getByRole('button',{name:'Lock joining',exact:true}).click();await host.getByRole('button',{name:'Reopen joining',exact:true}).waitFor();
 host.once('dialog',d=>d.accept());await host.getByRole('button',{name:'Remove',exact:true}).click();await player.waitForFunction(()=>document.querySelector('[role=alert]')?.textContent.includes('not active'));
 const fresh=await context.newPage();await fresh.goto(base+path,{waitUntil:'networkidle'});const configured=await fresh.evaluate(async()=>(await import('/src/features/summit-games/api.js')).isConfigured);assert.match(await fresh.locator('main').innerText(),configured?/Take your place/:/not connected yet/);assert.equal(await fresh.locator('.sg-demo-banner').count(),0);
 console.log('Testing magazine publication states');const magazine=await context.newPage();await magazine.emulateMedia({reducedMotion:'reduce'});await magazine.goto(base+'/convergence-summit-2026/#digital-magazine',{waitUntil:'networkidle'});await magazine.locator('#digital-magazine').scrollIntoViewIfNeeded();assert.match(await magazine.locator('#digital-magazine').innerText(),/Digital edition coming soon/);assert.equal(await magazine.locator('.si-magazine-qr img').count(),0);await magazine.locator('#digital-magazine').screenshot({path:output+'/magazine-desktop.png'});await magazine.setViewportSize({width:390,height:844});await magazine.locator('#digital-magazine').screenshot({path:output+'/magazine-mobile.png'});
 const qrPage=await context.newPage();await qrPage.emulateMedia({reducedMotion:'reduce'});
 const fixtureUrl='https://example.com/innovators-digest-volume-4.pdf',qr=await QRCode.toBuffer(fixtureUrl,{width:480,margin:4});
 await qrPage.route('**/summit/test-magazine-qr.png',route=>route.fulfill({contentType:'image/png',body:qr}));
 await qrPage.route('**/src/features/summit/event.js*',async route=>{const response=await route.fetch();const original=await response.text();const body=original.replace(/qrImage:\s*""/,'qrImage: "/summit/test-magazine-qr.png"').replace(/url:\s*""/,'url: "'+fixtureUrl+'"');assert.notEqual(body,original);await route.fulfill({response,body});});
 await qrPage.goto(base+'/convergence-summit-2026/#digital-magazine',{waitUntil:'networkidle'});await qrPage.locator('.si-magazine-qr img').waitFor();assert.equal(await qrPage.getByRole('link',{name:/Read the magazine/}).getAttribute('href'),fixtureUrl);assert.ok(await qrPage.locator('.si-magazine-qr img').evaluate(el=>el.complete&&el.naturalWidth>0));await qrPage.locator('#digital-magazine').screenshot({path:output+'/magazine-qr-fixture.png'});
 console.log('Testing magazine missing-image fallback');
 // A broken asset must retain the reading link and show text, never a broken QR.
 await qrPage.route('**/summit/test-magazine-qr.png',route=>route.fulfill({status:404,body:'Missing test image'}));await qrPage.reload({waitUntil:'networkidle'});await qrPage.getByText('The magazine QR is temporarily unavailable. Please check back shortly.',{exact:true}).waitFor();assert.equal(await qrPage.locator('.si-magazine-qr img').count(),0);assert.equal(await qrPage.getByRole('link',{name:/Read the magazine/}).count(),1);
 console.log('Testing shared auto countdown and optional audio with the host closed');
 const autoHost=await context.newPage();await autoHost.goto(base+path+'/host?rehearsal=1',{waitUntil:'networkidle'});await autoHost.getByRole('button',{name:/Create room/}).click();await autoHost.locator('.sg-host-room .sg-pin').waitFor();const autoPin=(await autoHost.locator('.sg-host-room .sg-pin').innerText()).trim();assert.equal(await autoHost.getByLabel('Auto pace',{exact:true}).isChecked(),true);
 const autoPlayer=await context.newPage();await autoPlayer.goto(`${base}${path}?room=${autoPin}&rehearsal=1`,{waitUntil:'networkidle'});await autoPlayer.getByLabel('Nickname',{exact:false}).fill('Auto player');await autoPlayer.getByRole('button',{name:'Join the room'}).click();await autoPlayer.locator('.sg-waiting').waitFor();
 const autoScreen=await context.newPage();await autoScreen.addInitScript(()=>{window.__qaAudio=[];const Base=window.AudioContext;window.AudioContext=class extends Base{constructor(...args){super(...args);window.__qaAudio.push(this);}};});await autoScreen.goto(`${base}${path}/screen?room=${autoPin}&rehearsal=1`,{waitUntil:'networkidle'});
 await autoScreen.locator('.sg-sound').waitFor();assert.equal(await autoScreen.locator('.sg-sound').getAttribute('aria-pressed'),'false');assert.equal(await autoScreen.evaluate(()=>window.__qaAudio.length),0);
 await autoScreen.locator('.sg-sound').click();await autoScreen.waitForFunction(()=>window.__qaAudio[0]?.state==='running');assert.equal(await autoScreen.locator('.sg-sound').getAttribute('aria-pressed'),'true');
 await autoHost.getByLabel('Time per question').selectOption('15');await autoHost.getByRole('button',{name:/Start Founder Shuffle/}).click();await autoPlayer.locator('.sg-game-shuffle').waitFor();await autoHost.close();
 await autoPlayer.locator('.sg-next-round.is-counting').waitFor({timeout:25000});await autoScreen.locator('.sg-next-round.is-counting').waitFor();assert.match(await autoPlayer.locator('.sg-next-round').innerText(),/Next round in/);assert.match(await autoPlayer.locator('.sg-your-rank').innerText(),/#1/);await autoPlayer.screenshot({path:output+'/countdown-player.png'});await autoScreen.screenshot({path:output+'/countdown-projector.png'});
 await autoPlayer.waitForFunction(()=>document.querySelector('.sg-round-meta')?.textContent.includes('Round 2 / 12'),null,{timeout:22000});
 await autoScreen.locator('.sg-sound').click();await autoScreen.waitForFunction(()=>window.__qaAudio[0]?.state==='closed');assert.equal(await autoScreen.locator('.sg-sound').getAttribute('aria-pressed'),'false');
 assert.deepEqual(errors,[]);console.log('PASS: shared host/player/projector rehearsal; all 3 games; adaptive sessions; hints; pause/resume/extend; scoring; CSV; joining lock/removal; hard briefing lock/unlock; 1440/1024/390/320 layouts; magazine pending/configured/broken-image states; shared countdown and advancement without host; optional audio on/off; personal rank.');
}catch(error){console.error('Host:',await debugHost?.locator('main').innerText());console.error('Player:',await debugPlayer?.locator('main').innerText());await debugHost?.screenshot({path:output+'/failure-host.png'});throw error;}finally{await browser.close()}
