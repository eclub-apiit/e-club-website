// Real publications, sourced directly from the PDFs in
// `public/Innovator's Digest Editions/`. Cover thumbnails in
// `public/newsletters/` are rendered from each PDF's actual first page.

const DIGEST_DIR = "/Innovator's Digest Editions";
const PULSE_DIR = "/Innovator's Digest Editions/Monthly Newsletters";

export const innovatorsDigest = [
  {
    volume: 3,
    title: "Innovator's Digest",
    date: "January 2026",
    cover: "/newsletters/digest-03.jpg",
    file: `${DIGEST_DIR}/Innovator's Digest Edition 03 - 2026.pdf`,
  },
  {
    volume: 2,
    title: "Innovator's Digest",
    date: "December 2024",
    cover: "/newsletters/digest-02.jpg",
    file: `${DIGEST_DIR}/Innovator's Digest Edition 02 - 2024.pdf`,
  },
  {
    volume: 1,
    title: "Innovator's Digest - Special Edition",
    date: "August 2023",
    cover: "/newsletters/digest-01.jpg",
    file: `${DIGEST_DIR}/Innovator's Digest Edition 01 - 2023.pdf`,
  },
];

export const entrepreneurialPulse = [
  {
    issue: 1,
    title: "The Annual General Meeting",
    date: "March 2024",
    cover: "/newsletters/pulse-01.jpg",
    file: `${PULSE_DIR}/Entrepreneurial Pulse - Issue 01 (March).pdf`,
  },
  {
    issue: 2,
    title: "The Art of Negotiation",
    date: "April 2024",
    cover: "/newsletters/pulse-02.jpg",
    file: `${PULSE_DIR}/Entrepreneurial Pulse - Issue 02 (April).pdf`,
  },
  {
    issue: 3,
    title: "Creator's Corner",
    date: "May 2024",
    cover: "/newsletters/pulse-03.jpg",
    file: `${PULSE_DIR}/Entrepreneurial Pulse - Issue 03 (May).pdf`,
  },
  {
    issue: 4,
    title: "Summer with APIIT",
    date: "June 2024",
    cover: "/newsletters/pulse-04.jpg",
    file: `${PULSE_DIR}/Entrepreneurial Pulse - Issue 04 (June).pdf`,
  },
  {
    issue: 5,
    title: "FoodFest Fun Fair",
    date: "July 2024",
    cover: "/newsletters/pulse-05.jpg",
    file: `${PULSE_DIR}/Entrepreneurial Pulse - Issue 05 (July).pdf`,
  },
  {
    issue: 6,
    title: "Unleash Your Best U",
    date: "August 2024",
    cover: "/newsletters/pulse-06.jpg",
    file: `${PULSE_DIR}/Entrepreneurial Pulse - Issue 06 (August).pdf`,
  },
  {
    issue: 7,
    title: "Sandbox Opening",
    date: "September 2024",
    cover: "/newsletters/pulse-07.jpg",
    file: `${PULSE_DIR}/Entrepreneurial Pulse - Issue 07 (September).pdf`,
  },
];
