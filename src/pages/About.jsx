import { motion } from "framer-motion";
import { Linkedin } from "../components/ui/SocialIcons";
import Container from "../components/ui/Container";
import Reveal, { RevealGroup, RevealItem } from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import GradientBlob from "../components/ui/GradientBlob";
import TextReveal from "../components/ui/TextReveal";
import SignatureMotif from "../components/ui/SignatureMotif";

const COMMITTEE_WATERMARKS = [
  { top: "6%", left: "3%", size: 44, rotate: -12 },
  { top: "16%", right: "5%", size: 32, rotate: 18 },
  { top: "34%", left: "7%", size: 38, rotate: 10 },
  { top: "48%", right: "8%", size: 28, rotate: -20 },
  { top: "60%", left: "4%", size: 48, rotate: 6 },
  { top: "72%", right: "3%", size: 34, rotate: -8 },
  { top: "86%", left: "9%", size: 30, rotate: 22 },
  { top: "92%", right: "10%", size: 40, rotate: -14 },
];

const objectives = [
  {
    title: "Skills & Business Insight",
    description: "To help develop and grow the required entrepreneurial skills and business insights in the students.",
  },
  {
    title: "Values & Good Citizenship",
    description: "To inculcate the appropriate values that will help create good citizens.",
  },
  {
    title: "Career Clarity",
    description: "To help students decide if entrepreneurship is one of their future pathways.",
  },
  {
    title: "Mentor Support",
    description:
      "To solicit support from successful entrepreneurs to help train and guide the budding entrepreneurs.",
  },
  {
    title: "Industry Exposure",
    description:
      "To expose students to different types of businesses and industries that will help fuel their passion and build their know-how.",
  },
];

const executives = [
  { name: "Sudeesha Fonseka", role: "President", img: "/committee/web/president.jpg", linkedin: "https://www.linkedin.com/in/sudeeshafonseka/" },
  { name: "Keith Moraes", role: "Vice President", img: "/committee/web/vice-1.jpg", linkedin: "https://www.linkedin.com/in/keith-moraes-6ba169256/" },
  { name: "Raqeeb Ameen", role: "Vice President", img: "/committee/web/vice-2.jpg", linkedin: "https://www.linkedin.com/in/rockeebb/" },
  { name: "Tihara Peiris", role: "Secretary", img: "/committee/web/sec-1.jpg", linkedin: "https://www.linkedin.com/in/tihara-peris-4643872b7/" },
  { name: "Thahnees Thariq", role: "Assistant Secretary", img: "/committee/web/sec-2.jpg", linkedin: "https://www.linkedin.com/in/thahnees-tariq-04072124b/" },
  { name: "Himansa Indusara", role: "Treasurer", img: "/committee/web/treasurer.jpg", linkedin: "https://www.linkedin.com/in/himansa-indusara-b36310357/" },
];

const departments = [
  {
    name: "Media",
    members: [
      { name: "Nadyah Riyaz", img: "/committee/web/media-1.jpg", linkedin: "https://www.linkedin.com/in/nadyah-riyaz-9384b8290/" },
      { name: "Chanuthmi Gamage", img: "/committee/web/media-2.jpg", linkedin: "https://www.linkedin.com/in/chanuthmi-gamage-a384a3319/" },
    ],
  },
  {
    name: "Marketing",
    members: [
      { name: "Ayodya Perera", img: "/committee/web/marketing-1.jpg", linkedin: "https://www.linkedin.com/in/ayodya-perera-2b4527339/" },
      { name: "Sanduni Wanasinghe", img: "/committee/web/marketing-2.jpg", linkedin: "https://www.linkedin.com/in/sanduniw/" },
    ],
  },
  {
    name: "Logistics",
    members: [
      { name: "Mohammed Shaahil", img: "/committee/web/log-1.jpg", linkedin: "https://www.linkedin.com/in/shaahil-seedin/" },
      { name: "Nelaka Shenal", img: "/committee/web/log-2.jpg", linkedin: "https://www.linkedin.com/in/nelaka-shenal/" },
    ],
  },
  {
    name: "Communication",
    members: [
      { name: "Maneesha Thatuwalakanda", img: "/committee/web/coms-1.jpg", linkedin: "https://www.linkedin.com/in/maneesha-thatuwalakanda-850790267" },
      { name: "Mohomed Yunus", img: "/committee/web/coms-2.jpg", linkedin: "https://www.linkedin.com/in/yunusnuhman/" },
    ],
  },
  {
    name: "IT",
    members: [{ name: "Brittni Fernando", img: "/committee/web/it.jpg", linkedin: "https://www.linkedin.com/in/brittni-fernando/" }],
  },
];

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">
        <GradientBlob tone="teal" size={480} className="-top-32 -left-32" />
        <GradientBlob tone="gold" size={360} className="-bottom-20 -right-20" />
        <SignatureMotif
          tone="dark"
          className="pointer-events-none absolute right-0 top-16 hidden h-auto w-[440px] max-w-none opacity-50 lg:block"
        />
        <Container className="relative">
          <Reveal direction="up">
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-gold-dark" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-dark">About Us</span>
            </div>
          </Reveal>
          <TextReveal
            as="h1"
            text="Who are we?"
            delay={0.08}
            className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-ink sm:text-6xl"
          />
          <Reveal direction="up" delay={0.18}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              A community of motivated APIIT students with an entrepreneurial spirit, building the founders of
              tomorrow.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <img
          src="/eclub-icon.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 top-1/2 hidden w-[420px] -translate-y-1/2 opacity-[0.06] lg:block"
        />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
            <Reveal direction="up">
              <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-6">
                <span className="h-px w-9 bg-gold-dark lg:h-24 lg:w-px" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-dark">Our Mission</p>
              </div>
            </Reveal>
            <div className="max-w-3xl">
              <Reveal direction="up" delay={0.05}>
                <p className="text-2xl font-medium leading-snug text-ink sm:text-3xl">
                  A club, with a motivated group of individuals with entrepreneurial spirit, that aims to cultivate
                  citizens who will create start-ups that will help grow our economy.
                </p>
              </Reveal>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <Reveal direction="up" delay={0.12}>
                  <p className="leading-relaxed text-ink-soft">
                    To foster entrepreneurial skills in the student body and help them understand the importance of
                    building enterprises and businesses that grow societies and nations.
                  </p>
                </Reveal>
                <Reveal direction="up" delay={0.18}>
                  <p className="leading-relaxed text-ink-soft">
                    The club also serves as a platform for budding entrepreneurs to showcase their talents and ideas,
                    while following the guidelines set by the college.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Visual Community Showcase Photo */}
          <Reveal direction="up" delay={0.2} className="mt-16">
            <div className="relative overflow-hidden rounded-3xl border border-black/10 shadow-xl">
              <img
                src="/events/2026/Icebreaker.jpg"
                alt="APIIT Entrepreneurship Club community members and participants"
                className="h-[340px] w-full object-cover object-center sm:h-[420px] lg:aspect-[21/9] lg:h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-green/78 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4 text-white sm:flex-row sm:items-end sm:justify-between sm:p-8">
                <div className="max-w-xl">
                  <span className="rounded-full bg-gold/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-dark-green">
                    Student Community
                  </span>
                  <h3 className="mt-2 text-xl font-bold sm:text-2xl">
                    Driven by Passion, Built on Collaboration
                  </h3>
                </div>
                <span className="text-xs text-white/80 font-medium sm:text-right">
                  2025 - 2026 E-Club Community Sessions
                </span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-cream py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Objectives"
            description="Five pillars guide everything we run, from workshops to hackathons to founder meetups."
          />
          <RevealGroup className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2" stagger={0.1}>
            {objectives.map((item, i) => (
              <RevealItem key={item.title}>
                <div className="flex gap-5 border-t border-black/8 pt-6">
                  <span className="text-3xl font-bold text-gold-dark/40">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
        <GradientBlob tone="green" size={360} className="absolute -left-32 top-10" />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
            <Reveal direction="up">
              <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-6">
                <span className="h-px w-9 bg-gold-dark lg:h-24 lg:w-px" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-dark">Our Community</p>
              </div>
            </Reveal>

            <div className="max-w-3xl">
              <Reveal direction="up" delay={0.05}>
                <p className="text-2xl font-medium leading-snug text-ink sm:text-3xl">
                  Joining our entrepreneur club can offer a range of benefits for aspiring or established
                  entrepreneurs.
                </p>
              </Reveal>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <Reveal direction="up" delay={0.12}>
                  <p className="leading-relaxed text-ink-soft">
                    Our club offers access to exclusive resources, such as business workshops, mentorship programs,
                    and community support, which can help you develop and grow your business.
                  </p>
                </Reveal>
                <Reveal direction="up" delay={0.18}>
                  <p className="leading-relaxed text-ink-soft">
                    Whether you're just starting your entrepreneurial venture or seeking to expand your existing
                    business, our club fosters an environment of creativity, collaboration, and camaraderie -
                    the perfect platform to ignite your entrepreneurial spirit.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        {COMMITTEE_WATERMARKS.map((w, i) => (
          <img
            key={i}
            src="/eclub-icon.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute hidden opacity-30 lg:block"
            style={{ top: w.top, left: w.left, right: w.right, width: w.size, transform: `rotate(${w.rotate}deg)` }}
          />
        ))}
        <Container className="relative">
          <SectionHeading
            eyebrow="The People"
            title="Meet the Committee"
            description="The 2026/2027 committee running every event, partnership, and program behind the club."
          />

          <Reveal direction="up" className="mt-16 flex flex-col items-center text-center">
            <motion.img
              src={executives[0].img}
              alt={`Portrait of ${executives[0].name}, ${executives[0].role}`}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-56 w-56 rounded-full object-cover ring-[6px] ring-cream transition-shadow duration-300 hover:ring-gold sm:h-72 sm:w-72"
            />
            <h3 className="mt-6 text-2xl font-semibold text-ink">{executives[0].name}</h3>
            <p className="mt-1 font-medium text-teal-dark">{executives[0].role}</p>
            {executives[0].linkedin && (
              <a
                href={executives[0].linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${executives[0].name} on LinkedIn`}
                className="mt-3 inline-flex text-ink-soft transition-colors hover:text-teal-dark"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
          </Reveal>

          <RevealGroup
            className="mx-auto mt-16 grid max-w-5xl gap-x-8 gap-y-12 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
            stagger={0.08}
          >
            {executives.slice(1).map((member) => (
              <RevealItem key={member.name}>
                <div className="flex flex-col items-center text-center">
                  <motion.img
                    src={member.img}
                    alt={`Portrait of ${member.name}, ${member.role}`}
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="h-32 w-32 rounded-full object-cover ring-4 ring-cream transition-shadow duration-300 hover:ring-gold sm:h-44 sm:w-44"
                  />
                  <h3 className="mt-4 text-base font-semibold text-ink">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-teal-dark">{member.role}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="mt-2 inline-flex text-ink-soft transition-colors hover:text-teal-dark"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-24">
            <Reveal direction="up">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-teal-dark">
                Department Heads
              </p>
            </Reveal>
            <div className="mt-10 space-y-14">
              {departments.map((dept) => (
                <Reveal
                  key={dept.name}
                  direction="up"
                  className="flex flex-col items-center gap-6 border-t border-black/8 pt-10 sm:flex-row sm:justify-center sm:gap-16"
                >
                  <p className="w-40 shrink-0 text-center text-lg font-semibold text-ink sm:text-right">
                    {dept.name}
                  </p>
                  <div className="grid w-full max-w-4xl grid-cols-2 justify-center gap-8 sm:flex sm:flex-wrap sm:gap-10">
                    {dept.members.map((member) => (
                      <div key={member.name} className="flex flex-col items-center text-center">
                        <motion.img
                          src={member.img}
                          alt={`Portrait of ${member.name}`}
                          whileHover={{ scale: 1.06 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="h-28 w-28 rounded-full object-cover ring-4 ring-cream transition-shadow duration-300 hover:ring-gold sm:h-36 sm:w-36"
                        />
                        <p className="mt-3 text-sm font-medium text-ink">{member.name}</p>
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on LinkedIn`}
                            className="mt-1 inline-flex text-ink-soft transition-colors hover:text-teal-dark"
                          >
                            <Linkedin className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/*
      <section className="relative overflow-hidden bg-gradient-hero py-24 animate-gradient-shift sm:py-32">
        <div className="absolute inset-0 bg-noise opacity-40" aria-hidden="true" />
        <GradientBlob tone="gold" size={420} className="-top-24 right-0" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Backed By"
            title="Our Partners & Sponsors"
            description="Organizations that invest in student entrepreneurship alongside us."
            light
          />
          <div className="relative mt-16 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-dark-green to-transparent sm:w-32" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-dark-green to-transparent sm:w-32" />
            <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
              {[...partners, ...partners].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex w-56 shrink-0 items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/15"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-gold-light">
                    {name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <span className="text-sm font-semibold text-white/90">{name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <Badge tone="white" icon={Handshake}>
              Interested in partnering with us?
            </Badge>
          </div>
        </Container>
      </section>
      */}
    </>
  );
}
