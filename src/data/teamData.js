// teamData.js
// Drop into: src/data/teamData.js
//
// PLACEHOLDER ROSTER — swap names/roles/bios/links for the real Sandbox 4.0 board
// once Communications confirms them. Every member uses the shared placeholder image
// until real headshots land in assets/ (rename them sandbox-team-<name>.png).

const placeholderImage = '/sandbox/assets/placeholder-image.png';

export const CATEGORIES = [
  { id: 'all', label: 'View all' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'it', label: 'IT & Development' },
  { id: 'comms', label: 'Communications' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'media', label: 'Media' },
  { id: 'logistics', label: 'Logistics & Finance' },
]

// ---------------------------------------------------------------------------
// CURRENT COMMITTEE — SANDBOX 3.0 (the edition in progress).
// Rendered in the "Meet the Team" section under About Us, below Our History.
// Roster is REAL, from the official committee sheet. Bios are one-line stubs —
// replace with 2–3 sentence backgrounds as members send them in. LinkedIn URLs
// are being filled in manually (cards hide the link while ''). Headshots: save
// as assets/sandbox3-<first-name>.png and swap placeholderImage per member.
// ---------------------------------------------------------------------------
export const TEAM = [
  // --- Leadership ---
  { name: 'Sudeesha Fonseka', role: 'President of Entrepreneurship Club', category: 'leadership', image: '/sandbox/assets/Sudeesha Fonseka Treasurer.webp', linkedin: '', bio: 'President of the Entrepreneurship Club.' },
  { name: 'Maneesha Thatuwalakanda', role: 'Chairperson', category: 'leadership', image: '/sandbox/assets/Maneesha Thatuwalakanda communications.webp', linkedin: '', bio: 'Co-chairs the Sandbox 3.0 organising committee.' },
  { name: 'Himansa Indusara', role: 'Chairperson', category: 'leadership', image: '/sandbox/assets/Himansa Indusara Communication.webp', linkedin: '', bio: 'Co-chairs the Sandbox 3.0 organising committee.' },
  { name: 'Ayodya Perera', role: 'Project Coordinator', category: 'leadership', image: '/sandbox/assets/Ayodya Sasuni Perera Marketing.webp', linkedin: '', bio: 'Coordinates the Sandbox 3.0 project across every sub-team.' },
  { name: 'Tyanna Franchesca Avory', role: 'Secretary', category: 'leadership', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/tyanna-avory-a879a32b2', bio: 'Secretary of the Sandbox 3.0 organising committee.', education: 'BSc (Hons) Computer Science' },
  { name: 'Pujaa Shruti Senthilnathan', role: 'Treasurer', category: 'leadership', image: placeholderImage, linkedin: '', bio: 'Manages the Sandbox 3.0 budget and finances.' },
  // linkedin: distinctive name match, but headline says Edith Cowan University -
  // confirm with Yunus directly before shipping:
  { name: 'Yunus Nuhman', role: 'Head of IT', category: 'it', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/yunusnuhman/', bio: 'Leads IT - the Sandbox site, registrations and infrastructure.', education: 'BSc (Hons) Cyber Security and Networking' },
  // --- Heads ---
  { name: 'Nadyah Riyaz', role: 'Head of Media', category: 'media', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/nadyah-riyaz-9384b8290', bio: 'Co-leads media - photography, videography and event coverage.', education: 'BSc (Hons) Business Management (Digital Marketing)' },
  { name: 'Sameeha Fahim', role: 'Head of Media', category: 'media', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/sameeha-fahim-819023280', bio: 'Co-leads media - photography, videography and event coverage.', education: 'BSc (Hons) Cyber Security and Networking' },
  { name: 'Kulthoom Husni', role: 'Head of Marketing', category: 'marketing', image: '/sandbox/assets/Kulthoom Husni media.webp', linkedin: 'https://www.linkedin.com/in/kulthoom-husni-54b8432b7', bio: 'Co-leads marketing - campaigns across schools and socials.', education: 'BSc (Hons) Business Management (Digital Marketing)' },
  { name: 'Tharushika Gamage', role: 'Head of Marketing', category: 'marketing', image: placeholderImage, linkedin: '', bio: 'Co-leads marketing - campaigns across schools and socials.' },
  { name: 'Nadha Rizan', role: 'Head of Communications', category: 'comms', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/nadha-rizan-077977327', bio: 'Co-leads communications with schools, sponsors and participants.', education: 'BSc (Hons) International Business Management' },
  { name: 'Raveen', role: 'Head of Communications', category: 'comms', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/raveen-gunasekara-552441248', bio: 'Co-leads communications with schools, sponsors and participants.', education: 'BSc (Hons) International Business Management' },
  { name: 'Asna Azver', role: 'Head of Logistics', category: 'logistics', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/asna-azver-310249365', bio: 'Co-leads logistics - venues, operations and event-day flow.', education: 'LLB (Hons) Law' },
  { name: 'Burhanuddin', role: 'Head of Logistics', category: 'logistics', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/m-burhanuddin-m-mansoor-bharmal-09373a249', bio: 'Co-leads logistics - venues, operations and event-day flow.', education: 'BSc (Hons) Business Management (Innovation & Entrepreneurship)' },
  // --- IT Team ---
  { name: 'Murad Hussain', role: 'IT Team', category: 'it', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/murad-hussain-6801702b2', bio: 'IT team, Sandbox 3.0.', education: 'BSc (Hons) Computer Science' },
  { name: 'Hana Careem', role: 'IT Team', category: 'it', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/hana-careem-4304b2349', bio: 'IT team, Sandbox 3.0.', education: 'BSc (Hons) Computer Science' },
  // --- Media Team ---
  { name: 'Tuan Shaahid Rainudeen', role: 'Media Team', category: 'media', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/tuan-shaahid-rainudeen-47b705374', bio: 'Media team, Sandbox 3.0.', education: 'BSc (Hons) Computer Science' },
  { name: 'Dasanya', role: 'Media Team', category: 'media', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/dasanya-dahanayake-b09427363', bio: 'Media team, Sandbox 3.0.', education: 'BSc (Hons) International Business Management' },
  // --- Marketing Team ---
  { name: 'Diseni Chanulya Dharmadasa', role: 'Marketing Team', category: 'marketing', image: '/sandbox/assets/Diseni Chanulya Dharmadhasa Marketing.webp', linkedin: '', bio: 'Marketing team, Sandbox 3.0.' },
  { name: 'Umar Shafeek', role: 'Marketing Team', category: 'marketing', image: placeholderImage, linkedin: '', bio: 'Marketing team, Sandbox 3.0.' },
  { name: 'Thahnees Thariq', role: 'Marketing Team', category: 'marketing', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/thahnees-tariq-04072124b', bio: 'Marketing team, Sandbox 3.0. Previously Head of Logistics for Sandbox 1.0.', education: 'BSc (Hons) International Business Management' },
  // --- Communications Team ---
  { name: 'Bosandi de Alwis Goonatilake', role: 'Communications Team', category: 'comms', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/disenka-bosandi-de-a-goonatilake-46916630a', bio: 'Communications team, Sandbox 3.0.', education: 'BSc (Hons) International Business Management' },
  { name: 'Ayuni Randeena Karunatilaka', role: 'Communications Team', category: 'comms', image: placeholderImage, linkedin: '', bio: 'Communications team, Sandbox 3.0.' },
  { name: 'Noor Fazeena Faiz', role: 'Communications Team', category: 'comms', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/fazeena-faiz-a5999b355', bio: 'Communications team, Sandbox 3.0.', education: 'BSc (Hons) International Business Management' },
  { name: 'Suresh Kumar Habilashinie', role: 'Communications Team', category: 'comms', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/habilashinie-suresh-kumar-61095633a', bio: 'Communications team, Sandbox 3.0.', education: 'BSc (Hons) International Business Management' },
  { name: 'Nevanya Nonis', role: 'Communications Team', category: 'comms', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/nevanya-nonis-9088b1355', bio: 'Communications team, Sandbox 3.0.', education: 'BSc (Hons) Business Management' },
  { name: 'Kavindhaya Samanmali', role: 'Communications Team', category: 'comms', image: placeholderImage, linkedin: '', bio: 'Communications team, Sandbox 3.0.' },
  // --- Logistics Team ---
  { name: 'Nithispranav', role: 'Logistics Team', category: 'logistics', image: placeholderImage, linkedin: '', bio: 'Logistics team, Sandbox 3.0.' },
  { name: 'Sarith Kariyawasam', role: 'Logistics Team', category: 'logistics', image: placeholderImage, linkedin: '', bio: 'Logistics team, Sandbox 3.0.' },
  { name: 'Rakkshetha Soundararajan', role: 'Logistics Team', category: 'logistics', image: placeholderImage, linkedin: 'https://www.linkedin.com/in/rakkshetha-undefined-160347393', bio: 'Logistics team, Sandbox 3.0.', education: 'BSc (Hons) Business Management' },
]

// ---------------------------------------------------------------------------
// PAST BOARDS — Past Editions page (cards don't flip there, so no bios needed).
//
// SANDBOX 1.0 roster is REAL, taken from the official Sandbox 1.0 page
// (eclub.apiit.lk, 2023). Headshots: save the 12 photos into assets/ with the
// exact filenames below (they're listed in the same order as the official
// "Meet the Sandbox Team" section), then swap `image: placeholderImage` for the
// matching import.
//
//   import kavinduImg  from '../assets/sandbox1-kavindu-wannisinghe.png'
//   ...etc — uncomment the imports block below once the files exist.
//
// LINKEDIN: left as '' for you to fill in. Ones I could pre-verify via
// Staffordshire/APIIT affiliation are filled in and marked — double-check them.
// Cards automatically hide the LinkedIn link while the URL is empty.
// ---------------------------------------------------------------------------

export const PAST_TEAMS = [
  {
    edition: 'Sandbox 2.0',
    year: '2025',
    // Full roster from the official Sandbox 2.0 meet_the_team page
    // (sandbox.apiit.lk) — Executive Board + Committee Members, photos wired to
    // the files in public/assets. `group` renders as a sub-header on the page.
    members: [
      // --- Executive Board ---
      { group: 'Executive Board', name: 'Methuli Perera', role: 'President of E-Club', image: '/sandbox/assets/Methuli perera 2.0 Club president.webp', linkedin: '' },
      { group: 'Executive Board', name: 'Suhayla Ralick', role: 'Chairperson', image: '/sandbox/assets/Suhalya ralick chairperson.webp', linkedin: '' },
      { group: 'Executive Board', name: 'Craleeth Gunathilake', role: 'Chairperson', image: '/sandbox/assets/Craleeth Gunathilake Chairperson.webp', linkedin: '' },
      { group: 'Executive Board', name: 'Shevan Gomis', role: 'Secretary', image: '/sandbox/assets/Shevan Gomis secretary.webp', linkedin: '' },
      { group: 'Executive Board', name: 'Dewdun Jayakody', role: 'Asst. Secretary', image: '/sandbox/assets/Dewdun Jayakody asst secretay.webp', linkedin: '' },
      { group: 'Executive Board', name: 'Sudeesha Fonseka', role: 'Treasurer', image: '/sandbox/assets/Sudeesha Fonseka Treasurer.webp', linkedin: '' },
      { group: 'Executive Board', name: 'Mukthar Riyaz', role: 'Asst. Treasurer', image: '/sandbox/assets/Mukthar Riyaz asst treasurer.webp', linkedin: '' },
      { group: 'Executive Board', name: 'Thevnaka De Silva', role: 'Head of Marketing', image: '/sandbox/assets/Thevnaka De Silva Head of marketingwebp.webp', linkedin: '' },
      { group: 'Executive Board', name: 'Reema Mushtaq', role: 'Head of Marketing', image: '/sandbox/assets/Reema Mushtaq head of marketing.webp', linkedin: '' },
      // linkedin: business undergraduate, Sri Lanka — likely him, verify APIIT:
      { group: 'Executive Board', name: 'Sunera Dhammage', role: 'Head of Media', image: '/sandbox/assets/Sunera Dhammage Head of media .webp', linkedin: 'https://www.linkedin.com/in/sunera-dhammage' },
      // LLB @ Staffordshire confirmed via public records, but her profile URL isn't
      // search-indexed — grab it from LinkedIn search directly:
      { group: 'Executive Board', name: 'Gajaanie Nandakumar', role: 'Head of Media', image: '/sandbox/assets/Gajaanie Nandakumar head of media.webp', linkedin: '' },
      { group: 'Executive Board', name: 'Senula Silva', role: 'Head of Communications', image: '/sandbox/assets/Senula Silva Head of communicaations3.webp', linkedin: '' },
      { group: 'Executive Board', name: 'Tihara Sanulya', role: 'Head of Communications', image: '/sandbox/assets/Tihara Sanulya Head of communications.webp', linkedin: '' },
      // linkedin: lk profile 'Atheek Azmy' — likely him, verify APIIT:
      { group: 'Executive Board', name: 'Mohamed Atheek Azmy', role: 'Head of Logistics', image: '/sandbox/assets/Mohamed Atheek Azmy Head of logistics .webp', linkedin: 'https://www.linkedin.com/in/atheek-azmy-39674132b' },
      { group: 'Executive Board', name: 'Muaadh Mazloom', role: 'Head of Logistics', image: '/sandbox/assets/Muaadh Mazloom Head of logistics.webp', linkedin: '' },
      { group: 'Executive Board', name: 'Ashok Ainkaran Jeyathasan', role: 'Head of IT', image: '/sandbox/assets/Ashok Ainkaran Jeyathasan Head of IT .webp', linkedin: '' },
      // linkedin derived from his own LinkedIn post URL (distinctive name) — verify:
      { group: 'Executive Board', name: 'Jason Montini Fernando', role: 'Head of IT', image: '/sandbox/assets/Jason Montini Fernando Head of IT.webp', linkedin: 'https://www.linkedin.com/in/jason-montini-fernando-006317261/' },
      // --- Committee Members ---
      { group: 'Committee Members', name: 'Ayodya Sasuni Perera', role: 'Marketing', image: '/sandbox/assets/Ayodya Sasuni Perera Marketing.webp', linkedin: '' },
      { group: 'Committee Members', name: 'Diseni Chanulya Dharmadhasa', role: 'Marketing', image: '/sandbox/assets/Diseni Chanulya Dharmadhasa Marketing.webp', linkedin: '' },
      { group: 'Committee Members', name: 'Nethaya Mewni Gunathilaka', role: 'Marketing', image: '/sandbox/assets/Nethaya Mewni Gunathilaka Head of marketing.webp', linkedin: '' },
      { group: 'Committee Members', name: 'V. Denam Pathmanathan', role: 'Marketing', image: '/sandbox/assets/V. Denam Pathmanathan marketing.webp', linkedin: '' },
      { group: 'Committee Members', name: 'Nohim Roosara Vidanapathirana', role: 'Media', image: '/sandbox/assets/Nohim Roosara Vidanapathirana media .webp', linkedin: '' },
      { group: 'Committee Members', name: 'Kulthoom Husni', role: 'Media', image: '/sandbox/assets/Kulthoom Husni media.webp', linkedin: '' },
      { group: 'Committee Members', name: 'Himansa Indusara', role: 'Communications', image: '/sandbox/assets/Himansa Indusara Communication.webp', linkedin: '' },
      { group: 'Committee Members', name: 'Maneesha Thatuwalakanda', role: 'Communications', image: '/sandbox/assets/Maneesha Thatuwalakanda communications.webp', linkedin: '' },
      { group: 'Committee Members', name: 'Sajali Yehansa Waidyaratne', role: 'Communications', image: '/sandbox/assets/Sajali Yehansa Waidyaratne communications.webp', linkedin: '' },
      { group: 'Committee Members', name: 'Keiseray Zahir', role: 'Communications', image: '/sandbox/assets/Keiseray Zahir communications.webp', linkedin: '' },
      { group: 'Committee Members', name: 'Keith Jason Moraes', role: 'Logistics', image: '/sandbox/assets/Keith Jason Moraes logistics.webp', linkedin: '' },
      { group: 'Committee Members', name: 'Hifaz Hizni', role: 'Logistics', image: '/sandbox/assets/Hifaz Hizni logistics.webp', linkedin: '' },
      { group: 'Committee Members', name: 'Garuka Kalhara', role: 'Logistics', image: '/sandbox/assets/Garuka Kalhara logistics.webp', linkedin: '' },
      { group: 'Committee Members', name: 'Nethmi Fernando', role: 'IT', image: '/sandbox/assets/Nethmi Fernando IT.webp', linkedin: '' },
      { group: 'Committee Members', name: 'Nehaa Shruthi Senthilnathan', role: 'IT', image: '/sandbox/assets/Nehaa Shruthi Senthilnathan IT.webp', linkedin: '' },
    ],
  },
  {
    edition: 'Sandbox 1.0',
    year: '2023',
    members: [
      // headshot: assets/sandbox1-kavindu-wannisinghe.png
      // linkedin pre-verified via APIIT E-Club VP + Staffordshire — double-check:
      { name: 'Kavindu Wannisinghe', role: 'Chairperson', image: '/sandbox/assets/Kavindu chairperson-1.png', linkedin: 'https://www.linkedin.com/in/kavinduisi/' },
      // headshot: assets/sandbox1-vidussh-gunasekera.png
      // linkedin verified — BA Business Innovation & Entrepreneurship, Staffordshire:
      { name: 'Vidussh Gunasekera', role: 'Chairperson', image: '/sandbox/assets/Vidussh chairperson-1.png', linkedin: 'https://www.linkedin.com/in/vidussh-gunasekera/' },
      // headshot: assets/sandbox1-himidiri-paranayapa.png
      { name: 'Himidiri Paranayapa', role: 'Chairperson', image: '/sandbox/assets/Himidiri chairperson.png', linkedin: '' },
      // headshot: assets/sandbox1-reema-shiyam.png
      // linkedin verified — BSc Computer Science, Staffordshire + Sandbox committee:
      { name: 'Reema Shiyam', role: 'Secretary', image: '/sandbox/assets/Reema  secretary.png', linkedin: 'https://www.linkedin.com/in/reema-shiyam-266987280/' },
      // headshot: assets/sandbox1-piyumiji-dangalle.png
      // linkedin likely (spelled "Dangalla" there, APIIT/APU marketing degree) — verify:
      { name: 'Piyumiji Dangalle', role: 'Head of Marketing', image: '/sandbox/assets/Beenali Head of Marketing.png', linkedin: 'https://www.linkedin.com/in/piyumiji-dangalla-84382a212/' },
      // headshot: assets/sandbox1-umar-hakeem.png
      { name: 'Umar Hakeem', role: 'Head of Marketing', image: '/sandbox/assets/Umar Head of Marketing.png', linkedin: '' },
      // headshot: assets/sandbox1-shevan-gomis.png
      { name: 'Shevan Gomis', role: 'Head of Media', image: '/sandbox/assets/Shevan-Head of Media1.png', linkedin: '' },
      // headshot: assets/sandbox1-rimzana-basheer.png
      { name: 'Rimzana Basheer', role: 'Head of Media', image: '/sandbox/assets/Rimzana Head of Media.png', linkedin: '' },
      // headshot: assets/sandbox1-devon-bastianz.png
      { name: 'Devon Bastianz', role: 'Head of Logistics', image: '/sandbox/assets/Devon Head of Logistics.png', linkedin: '' },
      // headshot: assets/sandbox1-thahnees-thariq.png
      { name: 'Thahnees Thariq', role: 'Head of Logistics', image: '/sandbox/assets/Thahnees Head of Logistics.png', linkedin: '' },
      // headshot: assets/sandbox1-amaya-fonseka.png
      { name: 'Amaya Fonseka', role: 'Head of Communications', image: '/sandbox/assets/Amaya Head of Communications.png', linkedin: '' },
      // headshot: assets/sandbox1-ranudi-abeysekera.png
      { name: 'Ranudi Abeysekera', role: 'Head of Communications', image: '/sandbox/assets/Ranudi Head of Communications.png', linkedin: '' },
    ],
  },
]
