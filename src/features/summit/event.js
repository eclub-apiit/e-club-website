// Programme from the supplied brief, with later organiser corrections taking precedence.
// Date retained from the organiser; venue updated from their supplied Google Maps place.
export const summit = {
  name: "The Convergence Summit 2026",
  route: "/convergence-summit-2026/",
  organiser: "Entrepreneurship Club of APIIT",
  context: "Entrepreneurship Week",
  theme: "Entrepreneurship Thrives Here.",
  startsAt: "2026-11-26T10:00:00+05:30",
  arrivalAt: "2026-11-26T09:30:00+05:30",
  endsAt: "2026-11-26T16:00:00+05:30",
  timeZone: "Asia/Colombo",
  venue: "University of Staffordshire Building (APIIT)",
  venueDetails: { name: "University of Staffordshire in collaboration with APIIT", address: "85 Braybrooke Place, Colombo 00200, Sri Lanka", mapsUrl: "https://www.google.com/maps?ftid=0x3ae2590054cd6db5%3A0xf7050eed8ee76b9e" },
  panel: { startTime: "10:30", endTime: "12:00", includesQA: true },
  registrationUrl: import.meta.env?.VITE_SUMMIT_REGISTRATION_URL || "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=7YWlTTjWHE6_NwK3MWfhtDvJY25WNy9Lt3ujJyzCjfBUMkszWDQyUE80Q0NPWFpDVzBRNkNGNkY1Ty4u",
  assets: {
    logo: "/summit/summit-wordmark.webp",
    eclub: "/eclub-logo-trimmed.png",
    apiit: "/sandbox/assets/apiit-logo.png",
    gew: "/summit/gew-logo.png",
  },
  copy: {
    boardroom: "An interactive, team-based business simulation where participants take on C-suite leadership roles and navigate a business in crisis. Through strategic decision-making, teamwork and adaptability, teams will respond to unexpected developments and compete to emerge as the strongest boardroom team.",
    heroLine: "Where Ideas Inspire Action.",
    introduction: "An inaugural summit bringing aspiring entrepreneurs, industry professionals, university students, academics, and innovators into one room to exchange experiences and inspire what comes next.",
    purpose: "The strongest ideas rarely grow in isolation. Convergence creates a space where perspectives meet, experiences are shared, and entrepreneurial ambition becomes action.",
  },
  magazine: { title: "Innovator’s Digest", edition: 4, volume: 4, timing: "Following the panel discussion", url: "" },
  // Add confirmed portraits here. Supports 5 or 6 people; no moderator assumed.
  speakers: Array.from({ length: 5 }, (_, index) => ({ id: `speaker-${index + 1}`, confirmed: false, name: "", role: "", organisation: "", image: "", imageAlt: "" })),
  experiences: [
    { id: "listen", verb: "Listen.", title: "The stories behind the decisions.", description: "Hear entrepreneurial experiences and the perspectives that shape them. Make room for a different way of thinking.", detail: "Panel discussion", target: "panel" },
    { id: "ask", verb: "Ask.", title: "Bring your questions into the room.", description: "An open exchange between the people on stage and the people in the audience. Curiosity is part of the conversation.", detail: "Audience Q&A", target: "panel" },
    { id: "discover", verb: "Discover.", title: "A new chapter in print.", description: "Join the launch of the club’s magazine. Entrepreneurial stories and ideas to take beyond the room.", detail: "Magazine launch", target: "magazine" },
    { id: "connect", verb: "Connect.", title: "Let one conversation lead to another.", description: "Meet fellow students, aspiring founders, and professionals. Share a perspective. Find a common interest. Start a conversation.", detail: "Networking", target: "audience" },
  ],
  audiences: [
    { title: "Students", description: "An inter-university experience. Bring your curiosity beyond the classroom and connect with students from other universities." },
    { title: "Aspiring entrepreneurs", description: "Explore what it takes to move an idea forward." },
    { title: "Innovators & startup teams", description: "Find fresh perspectives on what you’re building." },
    { title: "Academics", description: "Connect academic perspectives with entrepreneurial thinking and the realities of business." },
    { title: "Business professionals", description: "Exchange experience across industries and generations." },
  ],
  boardroom: { maxTeamSize: 10, recognisedTeams: 3 },
  agenda: [
    { id: "arrival", start: "09:30", end: "10:00", title: "Registration & Welcome", description: "Arrive, register and meet the university communities joining the summit." },
    { id: "opening", start: "10:00", end: "10:30", title: "Opening Ceremony", description: "The opening of the Convergence Summit 2026, organised as part of Global Entrepreneurship Week." },
    { id: "panel", start: "10:30", end: "12:00", title: "Industry Panel Discussion & Q&A", description: "Industry leaders explore entrepreneurship, business realities and professional experience, followed by audience questions.", featured: true },
    { id: "magazine", start: "12:00", end: "12:15", title: "Official Launch of Innovator’s Digest: Volume 4", description: "The official launch of the club’s annual entrepreneurship magazine, celebrating innovation, industry perspectives and student engagement." },
    { id: "networking", start: "12:15", end: "12:30", title: "Refreshments & Networking", description: "Students, academics, speakers and industry representatives connect, exchange ideas and build relationships." },
    { id: "challenge", start: "12:30", end: "14:00", title: "The Boardroom Challenge", description: "Take on C-suite roles and navigate a business in crisis. Teams of up to 10 members analyse the scenario, make strategic decisions and adapt to unexpected developments." },
    { id: "showdown", start: "14:00", end: "15:00", title: "The Boardroom Showdown", description: "Put your decision-making, teamwork and business acumen to the test. The top three performing teams will be recognised." },
    { id: "closing", start: "15:00", end: "16:00", approximateEnd: true, title: "Closing Ceremony & Final Networking", description: "Close the day with new perspectives and continue the connections made throughout the summit." },
  ],
  programmeReview: {
    source: "The Convergence Summit 2026 Brief.pdf, page 2",
    note: "Eight sessions based on the supplied brief. The organiser later requested an approximate 4 pm finish instead of 3:45 pm. The organiser supplied the event date and the Google Maps venue; the latter resolves to 85 Braybrooke Place.",
  },
};
const date = new Date(summit.startsAt);
const dateFormat = options => new Intl.DateTimeFormat("en-GB", { ...options, timeZone: summit.timeZone }).format(date);
export const summitDate = {
  full: dateFormat({ day: "numeric", month: "long", year: "numeric" }),
  day: dateFormat({ day: "2-digit" }), month: dateFormat({ month: "long" }),
  shortMonth: dateFormat({ month: "short" }), year: dateFormat({ year: "numeric" }),
  weekday: dateFormat({ weekday: "long" }), time: dateFormat({ hour: "numeric", minute: "2-digit", hour12: true }),
};
export function formatTime(time) {
  const [hours, minutes] = time.split(":").map(Number);
  if (hours === 12 && minutes === 0) return "12 noon";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${hours >= 12 ? "pm" : "am"}`;
}
export function agendaTime(item) {
  if (item.timing === "panel") return `${formatTime(summit.panel.startTime)} – ${formatTime(summit.panel.endTime)}`;
  if (item.timing === "afterPanel") return "Following the panel";
  if (item.timing === "afterLaunch") return "Following the launch";
  return `${formatTime(item.start)} – ${item.approximateEnd?"around ":""}${formatTime(item.end)}`;
}
export function getRegistrationUrl(value = summit.registrationUrl) {
  try {
    const url = new URL(value.trim());
    if(url.protocol!=="https:"||url.username||url.password)return "";
    const microsoft=url.hostname==="forms.cloud.microsoft"&&url.pathname==="/Pages/ResponsePage.aspx"&&Boolean(url.searchParams.get('id'));
    const google=url.hostname==="forms.gle"||(url.hostname==="docs.google.com"&&url.pathname.startsWith('/forms/'));
    return microsoft||google?url.href:"";
  } catch { return ""; }
}
export function downloadCalendar() {
  const escape = value => value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  const stamp = value => value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const calendarLines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//APIIT E-Club//Convergence//EN", "BEGIN:VEVENT", "UID:convergence-summit-2026@apiit.lk", `DTSTAMP:${stamp(new Date())}`, `DTSTART:${stamp(new Date(summit.arrivalAt))}`, `DTEND:${stamp(new Date(summit.endsAt))}`, `SUMMARY:${escape(summit.name)}`, `LOCATION:${escape([summit.venue, summit.venueDetails.address].filter(Boolean).join(", "))}`, `DESCRIPTION:${escape(`${summit.theme} From 9:30 am onwards; expected finish around 4:00 pm. Saving this date does not register you for the summit.`)}`, "END:VEVENT", "END:VCALENDAR", ""];
  const encoder = new TextEncoder();
  const foldLine = line => { let result="",current="";for(const char of line){if(encoder.encode(current+char).length>75){result+=current+"\r\n";current=" ";}current+=char;}return result+current; };
  const content = calendarLines.map(foldLine).join("\r\n");
  const url = URL.createObjectURL(new Blob([content], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a"); link.href = url; link.download = `convergence-summit-${summitDate.year}.ics`; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
