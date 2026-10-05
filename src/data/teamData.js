// teamData.js
// Drop into: src/data/teamData.js
//
// Sandbox 3.0 roster and past-edition team data.

export const CATEGORIES = [
  { id: 'all', label: 'View all' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'it', label: 'IT & Development' },
  { id: 'comms', label: 'Communications' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'media', label: 'Media' },
  { id: 'logistics', label: 'Logistics' },
]

// ---------------------------------------------------------------------------
// CURRENT COMMITTEE — SANDBOX 3.0 (the edition in progress).
// Rendered in the "Meet the Team" section under About Us, below Our History.
// Roster is sourced from the Sandbox committee sheet. LinkedIn URLs and
// headshots are kept alongside each member so the team cards stay data-driven.
// ---------------------------------------------------------------------------
export const TEAM = [
  // --- Leadership ---
  { name: 'Sudeesha Fonseka', role: 'President of Entrepreneurship Club', category: 'leadership', image: '/sandbox/assets/Sudeesha-Fonseka.webp', linkedin: 'https://www.linkedin.com/in/sudeeshafonseka/', objectPosition: '50% 0%' },
  { name: 'Maneesha Thatuwalakanda', role: 'Chairperson', category: 'leadership', image: '/sandbox/assets/Maneesha-Vindani.jpeg', linkedin: 'https://www.linkedin.com/in/maneesha-thatuwalakanda-850790267', education: 'International Business Management' },
  { name: 'Himansa Indusara', role: 'Chairperson', category: 'leadership', image: '/sandbox/assets/Himansa-.jpeg', linkedin: 'https://www.linkedin.com/in/himansa-indusara-b36310357', education: 'BSc (Hons) International Business Management', objectPosition: '50% 0%' },
  { name: 'Ayodya Perera', role: 'Project Coordinator and Head of Marketing', category: ['leadership', 'marketing'], image: '/sandbox/assets/Ayodya.webp', linkedin: 'https://www.linkedin.com/in/ayodya-perera-2b4527339/', objectPosition: '50% 0%', longRole: true },
  { name: 'Tyanna Franchesca Avory', role: 'Secretary', category: 'leadership', image: '/sandbox/assets/Tyanna-franchesca.webp', linkedin: 'https://www.linkedin.com/in/tyanna-avory-a879a32b2', education: 'BSc (Hons) Computer Science' },
  { name: 'Pujaa Shruti Senthilnathan', role: 'Treasurer', category: 'leadership', image: '/sandbox/assets/Puja-Shrutinaathilan.webp', linkedin: 'https://www.linkedin.com/in/pujaa-shruti-senthilnathan-678790390', education: 'BSc (Hons) Accounting and Finance', objectPosition: '50% 0%' },
  // linkedin: distinctive name match, but headline says Edith Cowan University -
  // confirm with Yunus directly before shipping:
  { name: 'Yunus Nuhman', role: 'Head of IT', category: 'it', image: '/sandbox/assets/Yunus-Nuhman.webp', linkedin: 'https://www.linkedin.com/in/yunusnuhman/', education: 'BSc (Hons) Cyber Security and Networking' },
  // --- Heads ---
  { name: 'Nadyah Riyaz', role: 'Head of Media', category: 'media', image: '/sandbox/assets/Nadyah.webp', linkedin: 'https://www.linkedin.com/in/nadyah-riyaz-9384b8290', education: 'BSc (Hons) Business Management (Digital Marketing)', objectPosition: '50% 0%' },
  { name: 'Sameeha Fahim', role: 'Head of Media', category: 'media', image: '/sandbox/assets/Sameeha-fahim.webp', linkedin: 'https://www.linkedin.com/in/sameeha-fahim-819023280', education: 'BSc (Hons) Cyber Security and Networking' },
  { name: 'Nadha Rizan', role: 'Head of Communications', category: 'comms', image: '/sandbox/assets/nadha-rizan.webp', linkedin: 'https://www.linkedin.com/in/nadha-rizan-077977327', education: 'BSc (Hons) International Business Management' },
  { name: 'Nevanya Nonis', role: 'Head of Communications', category: 'comms', image: '/sandbox/assets/Nevanya.webp', linkedin: 'https://www.linkedin.com/in/nevanya-nonis-9088b1355', education: 'BSc (Hons) Business Management' },
  { name: 'Asna Azver', role: 'Head of Logistics', category: 'logistics', image: '/sandbox/assets/Asna-Azwer.webp', linkedin: 'https://www.linkedin.com/in/asna-azver-310249365', education: 'LLB (Hons)' },
  { name: 'Burhanuddin MMB', role: 'Head of Logistics', category: 'logistics', image: '/sandbox/assets/Burhan-Mansoor.webp', linkedin: 'https://www.linkedin.com/in/m-burhanuddin-m-mansoor-bharmal-09373a249', education: 'BSc (Hons) Business Management (Innovation & Entrepreneurship)' },
  // --- IT Team ---
  { name: 'Murad Hussain', role: 'IT Team', category: 'it', image: '/sandbox/assets/Murad-Hussain.webp', linkedin: 'https://www.linkedin.com/in/murad-hussain-6801702b2', education: 'BSc (Hons) Computer Science', objectPosition: '50% 0%' },
  { name: 'Hana Careem', role: 'IT Team', category: 'it', image: '/sandbox/assets/Hana-Careem.webp', linkedin: 'https://www.linkedin.com/in/hana-careem-4304b2349', education: 'BSc (Hons) Computer Science', objectPosition: '50% 0%' },
  // --- Media Team ---
  { name: 'Tuan Shaahid', role: 'Media Team', category: 'media', image: '/sandbox/assets/Tuan-shaahid.webp', linkedin: 'https://www.linkedin.com/in/tuan-shaahid-rainudeen-47b705374', education: 'BSc (Hons) Computer Science', objectPosition: '50% 0%' },
  { name: 'Wanmini Dasanya', role: 'Media Team', category: 'media', image: '/sandbox/assets/Dasanya.webp', linkedin: 'https://www.linkedin.com/in/dasanya-dahanayake-b09427363', education: 'BSc (Hons) International Business Management', objectPosition: '50% 0%' },
  // --- Marketing Team ---
  { name: 'Diseni Chanulya', role: 'Marketing Team', category: 'marketing', image: '/sandbox/assets/Diseni-Chanulya.webp', linkedin: 'https://www.linkedin.com/in/diseni-chanulya-a0707a359', objectPosition: '50% 0%' },
  { name: 'Vihini Linaya', role: 'Marketing Team', category: 'marketing', image: '/sandbox/assets/Vihini-Linaya.webp', linkedin: 'https://www.linkedin.com/in/vihini-buddhakorala-9152043b8', objectPosition: '50% 0%' },
  { name: 'Umar Shafeek', role: 'Marketing Team', category: 'marketing', image: '/sandbox/assets/Umar-shafeek.webp', linkedin: 'https://www.linkedin.com/in/umar-shafeek-2a50a2367', objectPosition: '50% 0%' },
  // --- Communications Team ---
  { name: 'Disenka Bosandi', role: 'Communications Team', category: 'comms', image: '/sandbox/assets/Disenka-Bosandi.webp', linkedin: 'https://www.linkedin.com/in/disenka-bosandi-de-a-goonatilake-46916630a', education: 'BSc (Hons) International Business Management', objectPosition: '50% 0%' },
  { name: 'Ayuni Randeena', role: 'Communications Team', category: 'comms', image: '/sandbox/assets/Ayuni-Randeena.webp', linkedin: 'https://www.linkedin.com/in/ayuni-karunatilaka-1a2340422', education: 'LLB (Hons)', objectPosition: '50% 0%' },
  { name: 'Fazeena Faiz', role: 'Communications Team', category: 'comms', image: '/sandbox/assets/Fazeena-Faiz.webp', linkedin: 'https://www.linkedin.com/in/fazeena-faiz-a5999b355', education: 'BSc (Hons) International Business Management' },
  { name: 'Habilashinie Suresh Kumar', role: 'Communications Team', category: 'comms', image: '/sandbox/assets/Habilashinie.webp', linkedin: 'https://www.linkedin.com/in/habilashinie-suresh-kumar-61095633a', education: 'BSc (Hons) International Business Management', objectPosition: '50% 0%', longName: true },
  { name: 'Sanuli Fernando', role: 'Communications Team', category: 'comms', image: '/sandbox/assets/Sanuli-Fernando.webp', linkedin: 'https://www.linkedin.com/in/sanuli-fernando-636982347/', education: 'BSc (Hons) Psychology' },
  // --- Logistics Team ---
  { name: 'Thahnees Tariq', role: 'Logistics Team', category: 'logistics', image: '/sandbox/assets/Thahnees-thaeiq.webp', linkedin: 'https://www.linkedin.com/in/thahnees-tariq-04072124b', education: 'BSc (Hons) International Business Management' },
  { name: 'Nithispranav', role: 'Logistics Team', category: 'logistics', image: '/sandbox/assets/Pranav.webp', linkedin: 'https://www.linkedin.com/in/nithis-pranav-periyannen-a97990335', objectPosition: '50% 0%' },
  { name: 'Rakkshetha Soundararajan', role: 'Logistics Team', category: 'logistics', image: '/sandbox/assets/Raksheta-.webp', linkedin: 'https://www.linkedin.com/in/rakkshetha-undefined-160347393', education: 'BSc (Hons) Business Management', objectPosition: '50% 0%' },
]

// ---------------------------------------------------------------------------
// PAST BOARDS — Past Editions page (cards don't flip there, so no bios needed).
//
// SANDBOX 1.0 roster is sourced from the official Sandbox 1.0 page
// (eclub.apiit.lk, 2023).
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
      { group: 'Committee Members', name: 'Maneesha Thatuwalakanda', role: 'Communications', image: '/sandbox/assets/Maneesha Thatuwalakanda communications.webp', linkedin: 'https://www.linkedin.com/in/maneesha-thatuwalakanda-850790267' },
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
