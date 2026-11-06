import sharp from 'sharp';
import {readFile} from 'node:fs/promises';
import {getPageSeo, pageDefinitions, origin} from '../src/seo/site.js';
import {summit, summitDate, getRegistrationUrl, agendaTime} from '../src/features/summit/event.js';
import {sandbox, isConvergencePromoted} from '../src/data/registrations.js';

const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function staticContent(seo, registrationUrl){
  const summitRegistration=getRegistrationUrl(registrationUrl ?? summit.registrationUrl);
  const register=summitRegistration?`<p><a href="${escape(summitRegistration)}">Register for Convergence Summit</a></p>`:'';
  const summary=`<p>${escape(summitDescription())}</p><p>Organised by the Entrepreneurship Club of APIIT for Global Entrepreneurship Week.</p>`;
  const separation=`<p>The Convergence Summit is an entrepreneurship summit for university communities and industry. Sandbox 3.0 is a separate inter-school business pitching competition for school students. Each event has its own registration form.</p>`;
  let content='';
  if(seo.path===summit.route){
    content=`${summary}<p>${summitDate.full} · ${escape(summit.venue)}</p><h2>Registration</h2><p>9:30 am onwards · ${escape(summit.venueDetails.address)}</p>${register}<h2>The programme</h2>${summit.agenda.map(item=>`<section><h3>${escape(item.title)}</h3><p>${escape(agendaTime(item))}</p><p>${escape(item.description)}</p></section>`).join('')}<h2>Who can attend?</h2><p>${summit.audiences.map(a=>escape(a.title)).join(', ')}.</p><h2>Two separate E-Club events</h2>${separation}`;
  }else if(seo.path==='/'){
    const convergence=isConvergencePromoted()?`<section><h2>${escape(summit.name)}</h2>${summary}<p>${summitDate.full} · ${escape(summit.venue)}</p>${register}<a href="${summit.route}">Explore the Convergence Summit</a></section>`:'';
    content=`<p>${escape(seo.description)}</p>${convergence}<section><h2>${sandbox.name}</h2><p>${escape(sandbox.description)}</p><p>Applications close 30 November 2026.</p><a href="${sandbox.registrationUrl}">Register for Sandbox</a> · <a href="${sandbox.route}">Explore Sandbox</a></section>${convergence?separation:''}`;
  }else if(seo.path==='/sandbox/'){
    content=`<p>${escape(sandbox.description)}</p><p>Where Ideas Take Flight.</p><p>Applications close 30 November 2026.</p><p><a href="${sandbox.registrationUrl}">Register for Sandbox 3.0</a></p><a href="/sandbox/about/">About the competition</a> · <a href="/sandbox/faqs/">Sandbox FAQs</a>`;
  }else content=`<p>${escape(seo.description)}</p>`;
  const dark=seo.path===summit.route || seo.path.startsWith('/sandbox/');
  return `<div class="seo-initial" style="min-height:100svh;padding:48px 24px;background:${dark?'#061719':'#faf9f6'};color:${dark?'#e9efea':'#0b3d2e'}"><style>.seo-initial a{color:inherit;text-underline-offset:3px}</style><main style="max-width:960px;margin:0 auto;font:16px/1.7 system-ui,sans-serif"><nav aria-label="Main navigation"><a href="/">APIIT E-Club</a> · <a href="${summit.route}">Convergence Summit</a> · <a href="${sandbox.route}">Sandbox</a></nav><h1>${escape(seo.heading)}</h1>${content}</main></div>`;
}
function summitDescription(){return 'An entrepreneurship summit with an industry panel discussion and Q&A, the Innovator’s Digest Volume 4 magazine launch, networking and The Boardroom business simulation.';}
function renderPage(template, seo, registrationUrl){
  const meta=(name,value,attribute='name')=>`<meta ${attribute}="${name}" content="${escape(value)}" />`;
  const head=[`<title>${escape(seo.title)}</title>`,meta('description',seo.description),meta('robots','index,follow,max-image-preview:large'),`<link rel="canonical" href="${seo.url}" />`,
    ...Object.entries({'og:type':'website','og:site_name':'APIIT Entrepreneurship Club','og:title':seo.title,'og:description':seo.description,'og:url':seo.url,'og:image':seo.image,'og:image:width':'1200','og:image:height':'630','og:image:alt':seo.heading,'og:locale':'en_LK'}).map(([key,value])=>meta(key,value,'property')),
    ...Object.entries({'twitter:card':'summary_large_image','twitter:title':seo.title,'twitter:description':seo.description,'twitter:image':seo.image,'twitter:image:alt':seo.heading}).map(([key,value])=>meta(key,value)),
    `<script id="site-structured-data" type="application/ld+json">${JSON.stringify(seo.structuredData).replace(/</g,'\\u003c')}</script>`].join('\n    ');
  return template.replace('<body>', '<body style="margin:0">').replace(/<title>[^<]*<\/title>/,'').replace(/<meta name="description"[^>]*\/>/,'').replace('</head>',`${head}\n  </head>`).replace('<div id="root"></div>',`<div id="root">${staticContent(seo,registrationUrl)}</div>`);
}
async function socialCard(asset,colour,kicker,footer){
  const logo=await sharp(await readFile(new URL(`../public${asset}`,import.meta.url))).resize({width:960,height:240,fit:'inside'}).png().toBuffer();
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630"><defs><linearGradient id="bg"><stop stop-color="#061719"/><stop offset="1" stop-color="${colour}"/></linearGradient></defs><rect width="1200" height="630" fill="url(#bg)"/><path d="M60 80H1140M60 540H1140" stroke="#ffffff30"/><text x="80" y="130" fill="#e6f4ef" font-family="sans-serif" font-size="23" letter-spacing="3">${escape(kicker)}</text><image x="120" y="200" width="960" height="240" preserveAspectRatio="xMidYMid meet" xlink:href="data:image/png;base64,${logo.toString('base64')}"/><text x="80" y="505" fill="#e6f4ef" font-family="sans-serif" font-size="23">${escape(footer)}</text><text x="80" y="588" fill="#b2ded2" font-family="sans-serif" font-size="21">eclub.apiit.lk</text></svg>`;
  return sharp(Buffer.from(svg)).jpeg({quality:88}).toBuffer();
}
export default function seoPages(options={}){
  return {name:'eclub-search-pages',apply:'build',enforce:'post',async generateBundle(_output,bundle){
    const entry=bundle['index.html'];
    if(!entry)throw new Error('SEO build requires the Vite HTML entry.');
    const template=String(entry.source);
    for(const path of Object.keys(pageDefinitions)){
      const seo=getPageSeo(path,options),html=renderPage(template,seo,options.registrationUrl);
      if(path==='/')entry.source=html;
      else this.emitFile({type:'asset',fileName:`${path.slice(1)}index.html`,source:html});
    }
    this.emitFile({type:'asset',fileName:'robots.txt',source:`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`});
    this.emitFile({type:'asset',fileName:'sitemap.xml',source:`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(pageDefinitions).map(path=>`<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>\n`});
    for(const [fileName,asset,colour,kicker,footer] of [
      ['summit/social-card.jpg',summit.assets.logo,'#10463f','APIIT E-CLUB · GLOBAL ENTREPRENEURSHIP WEEK','26 NOVEMBER 2026 · COLOMBO, SRI LANKA'],
      ['social/sandbox.jpg','/sandbox/assets/sandbox-logo-cropped.png','#4e225b','APIIT E-CLUB · INTER-SCHOOL BUSINESS PITCHING','SANDBOX 3.0 · APPLICATIONS CLOSE 30 NOVEMBER 2026'],
      ['social/eclub.jpg','/eclub-logo-trimmed.png','#144b3e','IDEAS. PEOPLE. POSSIBILITIES.','APIIT ENTREPRENEURSHIP CLUB · SRI LANKA'],
    ])this.emitFile({type:'asset',fileName,source:await socialCard(asset,colour,kicker,footer)});
  }};
}
