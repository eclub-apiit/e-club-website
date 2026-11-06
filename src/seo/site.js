import {summit, getRegistrationUrl} from '../features/summit/event.js';
import {sandbox, isConvergencePromoted} from '../data/registrations.js';

export const origin = 'https://eclub.apiit.lk';
export const organisation = {
  '@type': 'Organization', '@id': `${origin}/#organisation`,
  name: 'Entrepreneurship Club of APIIT', alternateName: 'APIIT E-Club',
  url: `${origin}/`, logo: `${origin}/eclub-logo-trimmed.png`,
};
export const summitDescription = 'The Convergence Summit 2026 by APIIT E-Club: 26 November in Colombo. Panel discussion, Q&A, networking, Innovator’s Digest Volume 4 and The Boardroom.';
export const pageDefinitions = {
  '/': {title: 'APIIT Entrepreneurship Club | Convergence Summit & Sandbox', heading: 'APIIT Entrepreneurship Club', description: 'Explore APIIT E-Club. Register for The Convergence Summit 2026, an entrepreneurship summit in Colombo, or Sandbox 3.0, our separate inter-school pitching competition.', image: '/social/eclub.jpg'},
  '/convergence-summit-2026/': {title: 'The Convergence Summit 2026 | APIIT E-Club | 26 November', heading: summit.name, description: summitDescription, image: '/summit/social-card.jpg'},
  '/sandbox/': {title: 'Sandbox 3.0 | Inter-School Business Pitching | APIIT E-Club', heading: sandbox.name, description: 'Apply for Sandbox 3.0, APIIT E-Club’s national inter-school business pitching competition for school students. Applications close 30 November 2026.', image: '/social/sandbox.jpg'},
  '/about/': {title: 'About APIIT Entrepreneurship Club | Our Community & Committee', heading: 'About APIIT Entrepreneurship Club', description: 'Meet the APIIT Entrepreneurship Club community and committee. Learn about our mission, student opportunities and entrepreneurship initiatives.'},
  '/events/': {title: 'APIIT E-Club Events | Entrepreneurship, Workshops & Community', heading: 'APIIT E-Club Events', description: 'Explore APIIT Entrepreneurship Club events from 2023 to 2026: pitching competitions, workshops, founder panels, The Boardroom and creative community sessions.'},
  '/newsletter/': {title: 'Innovator’s Digest | APIIT Entrepreneurship Club', heading: 'Innovator’s Digest', description: 'Explore Innovator’s Digest, the APIIT Entrepreneurship Club magazine, sharing entrepreneurial stories, ideas and perspectives.'},
  '/contact/': {title: 'Contact APIIT Entrepreneurship Club', heading: 'Contact APIIT E-Club', description: 'Get in touch with the APIIT Entrepreneurship Club about student entrepreneurship, events, partnerships and collaboration.'},
  '/sandbox/about/': {title: 'About Sandbox | APIIT E-Club’s Inter-School Competition', heading: 'About Sandbox', description: sandbox.description},
  '/sandbox/about/editions/': {title: 'Past Sandbox Editions | APIIT E-Club', heading: 'Past Sandbox Editions', description: 'Explore past editions of Sandbox, the APIIT Entrepreneurship Club inter-school business pitching competition.'},
  '/sandbox/about/team/': {title: 'The Sandbox Team | APIIT E-Club', heading: 'The Sandbox Team', description: 'Meet the team behind Sandbox, the APIIT Entrepreneurship Club inter-school business pitching competition.'},
  '/sandbox/contact/': {title: 'Contact Sandbox | APIIT E-Club', heading: 'Contact Sandbox', description: 'Contact the Sandbox team about the inter-school business pitching competition, applications and partnerships.'},
  '/sandbox/faqs/': {title: 'Sandbox FAQs | Inter-School Competition | APIIT E-Club', heading: 'Sandbox FAQs', description: 'Find answers about Sandbox, APIIT E-Club’s inter-school business pitching competition for school students.'},
  '/sandbox/sponsors/': {title: 'Sandbox Sponsors & Partners | APIIT E-Club', heading: 'Sandbox Sponsors & Partners', description: 'Explore the partners supporting Sandbox and school-student entrepreneurship through the APIIT Entrepreneurship Club.'},
  '/sandbox/what-we-offer/': {title: 'What Sandbox Offers | School Entrepreneurship | APIIT E-Club', heading: 'What Sandbox Offers', description: 'Discover the learning, mentoring and pitching opportunities offered by Sandbox, APIIT E-Club’s inter-school competition.'},
};
export const normalisePath = path => path === '/' ? '/' : `/${path.split('/').filter(Boolean).join('/')}/`;
export function getPageSeo(pathname, options = {}) {
  const path = normalisePath(pathname);
  const definition = pageDefinitions[path];
  let page = definition || {title: 'Page not found | APIIT E-Club', heading: 'Page not found', description: 'Explore the official APIIT Entrepreneurship Club website.'};
  const promoteConvergence = isConvergencePromoted(options.now ?? Date.now());
  if(path === '/' && !promoteConvergence) page = {...page,
    title:'APIIT Entrepreneurship Club | Sandbox & Student Entrepreneurship',
    description:'Explore APIIT E-Club, our student entrepreneurship community and events. Discover Sandbox 3.0, our national inter-school business pitching competition.',
  };
  const url = origin + path;
  const image = origin + (page.image || (path.startsWith('/sandbox/') ? '/social/sandbox.jpg' : '/social/eclub.jpg'));
  const graph = [organisation, {'@type': 'WebSite', '@id': `${origin}/#website`, name: 'APIIT Entrepreneurship Club', url: `${origin}/`, publisher: {'@id': organisation['@id']}}];
  const webPage = {'@type':'WebPage', '@id': `${url}#webpage`, url, name:page.title, description:page.description, isPartOf:{'@id':`${origin}/#website`}, publisher:{'@id':organisation['@id']}};
  if(path === summit.route) {
    const registration = getRegistrationUrl(options.registrationUrl ?? summit.registrationUrl);
    const event = {
      '@type':'Event', '@id':`${url}#event`, name:summit.name, url,
      description: 'An entrepreneurship summit organised by the Entrepreneurship Club of APIIT for Global Entrepreneurship Week. Includes an industry panel and Q&A, Innovator’s Digest Volume 4 launch, networking and The Boardroom business simulation.',
      startDate:summit.startsAt,
      eventStatus:'https://schema.org/EventScheduled', eventAttendanceMode:'https://schema.org/OfflineEventAttendanceMode',
      image:[image], organizer:{'@id':organisation['@id']},
      location:{'@type':'Place', name:summit.venue, address:{'@type':'PostalAddress', streetAddress:'85 Braybrooke Place', addressLocality:'Colombo', postalCode:'00200', addressCountry:'LK'}},
      ...(registration ? {potentialAction:{'@type':'RegisterAction', name:'Register for The Convergence Summit 2026', target:registration}} : {}),
    };
    webPage.mainEntity = {'@id':event['@id']}; graph.push(event);
  } else if(path.startsWith('/sandbox/')) {
    webPage.about = {'@type':'Thing', '@id':`${origin}/sandbox/#competition`, name:sandbox.name, description:sandbox.description};
  } else if(path === '/') {
    webPage.about = [ ...(promoteConvergence ? [{'@type':'Thing', name:summit.name, url:origin+summit.route}] : []), {'@type':'Thing', name:sandbox.name, url:origin+sandbox.route} ];
  }
  graph.push(webPage);
  return {...page, path, url, image, indexable:Boolean(definition), structuredData:{'@context':'https://schema.org','@graph':graph}};
}
