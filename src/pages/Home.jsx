import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";

import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import GradientBlob from "../components/ui/GradientBlob";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import TiltCard from "../components/ui/TiltCard";
import Gallery from "../components/ui/Gallery";
import TextReveal from "../components/ui/TextReveal";
import Tooltip from "../components/ui/Tooltip";
import { cn } from "../lib/cn";

const SANDBOX_DEADLINE = new Date("2026-10-30T23:59:59+05:30");

function SandboxCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = SANDBOX_DEADLINE.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="mt-8 flex items-start gap-4">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-start gap-4">
          {i > 0 && <span className="font-coolvetica text-3xl leading-none text-slate-500">:</span>}
          <div className="flex flex-col items-center">
            <span className="font-coolvetica text-3xl leading-none text-white tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="mt-2 text-[10px] uppercase tracking-widest text-slate-400">{unit.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const VALUE_ACCENTS = {
  teal: "bg-teal text-white",
  gold: "bg-gold text-dark-green",
  "dark-green": "bg-dark-green text-white",
};

const valueProps = [
  {
    title: "Imagine",
    description:
      "Unleash imagination's power; dissolve reality's boundaries, nurture innovation's seeds, foster boundless creativity, embrace breakthroughs.",
    accent: "teal",
  },
  {
    title: "Innovate",
    description:
      "Innovation is the heart of entrepreneurship - connect with our visionaries, innovators, and trailblazers.",
    accent: "gold",
  },
  {
    title: "Transform",
    description:
      "Be a part of us and learn, collaborate, and transform ideas into a reality to shape up a better future.",
    accent: "dark-green",
  },
];

const testimonials = [
  {
    quote: "Entrepreneurship is not rocket science, if you believe in your capabilities, time and strength. Go for it!",
    name: "Shehan Sameen",
    role: "Chaiwala Colombo",
    photo: "/entrepreneurs/shehan-sameen.png",
  },
  {
    quote: "Learn everything - it comes in handy, and never goes to waste.",
    name: "Fiona Nanayakkara",
    role: "News Publisher Online",
    photo: "/entrepreneurs/fiona-nanayakkara.png",
  },
  {
    quote:
      "APIIT E-Club's pop-up sales helped me more deeply understand the demands and desires of my target audience.",
    name: "Rishma Rizvi",
    role: "Soapstories",
    photo: "/entrepreneurs/rishma-rizvi.jpeg",
  },
  {
    quote: "Always pursue your passion and do not look back.",
    name: "Saranga Dissanayake",
    role: "KYND",
    photo: "/entrepreneurs/saranga-dissanayake.png",
  },
  {
    quote:
      "The club emphasized the importance of resilience, creativity and adaptability - crucial traits of an entrepreneur.",
    name: "Qaaim Deen",
    role: "Elvoir",
    photo: "/entrepreneurs/qaaim-deen.png",
  },
  {
    quote: "The club played a pivotal role in shaping up my entrepreneurial journey.",
    name: "Aaliyah Ariff",
    role: "Violet",
    photo: "/entrepreneurs/aaliyah-ariff.png",
  },
];

// Curated 2023 - 2026 real event moments
const galleryImages = [
  {
    src: "/events/2026/Empower Her - 1.jpg",
    alt: "Empower Her 2026: Women in Leadership & Entrepreneurship Forum",
    span: "row-span-2",
  },
  {
    src: "/events/2025/Sandbox 2.0.jpg",
    alt: "SANDBOX 2.0: National Inter-School Pitching Grand Finale at BMICH",
    span: "row-span-2",
  },
  {
    src: "/events/2026/Icebreaker.jpg",
    alt: "Freshers' Icebreaker 2026: Dynamic Community Challenges & Mixer",
  },
  {
    src: "/events/2026/AGM 2026-27.jpg",
    alt: "Annual General Meeting and Pinning Ceremony 2026/27",
  },
  {
    src: "/events/2025/Voices of Her 2025.png",
    alt: "Voices of Her 2025: International Women's Day Keynote & Panel",
  },
  {
    src: "/events/2026/Cal Workshop.jpg",
    alt: "CAL Investment Masterclass: Wealth Creation with Capital Alliance 2026",
  },
  {
    src: "/events/2026/Cal Workshop - 2.jpg",
    alt: "CAL Investment Masterclass discussion and networking",
  },
  {
    src: "/events/2025/Startup Pulse.png",
    alt: "Startup Pulse 2025: Realities of Entrepreneurship Founder Panel",
  },
  {
    src: "/events/2024/FoodFest 2024.png",
    alt: "FoodFest 2024: Student Startup Marketplace & Campus Pop-Ups",
  },
  {
    src: "/events/2026/Mojito Stall.png",
    alt: "Mojito Stall fundraising pop-up for the E-Club community",
  },
  {
    src: "/events/2026/Movie Night.png",
    alt: "E-Club community movie night and student bonding evening",
  },
  {
    src: "/events/2025/Mati Strokes.png",
    alt: "Mati Strokes 2025: Clay Plate Painting & Creative Wellness Studio",
  },
  {
    src: "/events/2025/Idea Quest.png",
    alt: "Idea Quest 2025: AI Tools in Modern Entrepreneurship with CurveUp",
  },
  {
    src: "/events/2024/Pitch Perfect 2024.png",
    alt: "Pitch Perfect 2024: Global Entrepreneurship Week at ICTA SPARX Lab",
  },
  {
    src: "/events/2023/Startup Summit 2023 - 1.png",
    alt: "Start-Up Summit 2023: National Pitching Finale & Magazine Launch",
  },
  {
    src: "/events/2024/Her Story 2024.png",
    alt: "Project HerStory 2024: Girls in Power Leadership Dialogue",
  },
];

const heroCollage = [
  {
    src: "/events/2025/Sandbox 2.0.jpg",
    alt: "Sandbox 2.0 grand finale crowd",
    span: "row-span-2",
  },
  {
    src: "/events/2026/Empower Her - 1.jpg",
    alt: "Empower Her panel discussion",
    span: "row-span-1",
  },
  {
    src: "/events/2026/Icebreaker.jpg",
    alt: "Icebreaker community mixer",
    span: "row-span-1",
  },
  {
    src: "/events/2026/Cal Workshop.jpg",
    alt: "CAL x Rotaract masterclass",
    span: "row-span-2",
  },
  {
    src: "/events/2026/AGM 2026-27.jpg",
    alt: "Annual General Meeting and pinning ceremony",
    span: "row-span-2",
  },
  {
    src: "/events/2026/Mojito Stall.png",
    alt: "Mojito Stall fundraiser",
    span: "row-span-1",
  },
];

const heroCollageTiles = [...heroCollage, ...heroCollage];

export default function Home() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [activeVoice, setActiveVoice] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setActiveVoice((v) => (v + 1) % testimonials.length);
    }, 5000);
    return () => clearTimeout(id);
  }, [activeVoice]);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    setParallax({
      x: ((clientX - left) / width - 0.5) * 2,
      y: ((clientY - top) / height - 0.5) * 2,
    });
  };

  return (
    <>
      {/* Hero Banner */}
      <section
        onMouseMove={handleMouseMove}
        className="relative flex min-h-screen items-center overflow-hidden bg-[#061311]"
      >
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(900px_680px_at_82%_42%,rgba(240,169,58,0.12)_0%,rgba(240,169,58,0)_60%),radial-gradient(900px_680px_at_20%_78%,rgba(14,110,119,0.18)_0%,rgba(14,110,119,0)_60%)]" />
          <div className="absolute inset-0 grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4 lg:p-6 xl:p-8 opacity-80">
            {heroCollageTiles.map((item, index) => (
              <div
                key={`${item.src}-${index}`}
                className={`relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/30 shadow-2xl ${
                  index < 2 ? "row-span-2" : index % 3 === 0 ? "row-span-2" : "row-span-1"
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover object-center brightness-[1.03] contrast-[1.08]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#061311]/74 via-[#061311]/52 to-[#061311]/42" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#061311]/36 via-transparent to-[#061311]/52" />
          <div className="absolute inset-0 bg-noise opacity-10" />
        </div>

        <motion.div
          animate={{ x: parallax.x * 16, y: parallax.y * 16 }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          className="absolute -right-16 bottom-0 hidden lg:block pointer-events-none"
        >
          <GradientBlob tone="gold" size={360} className="animate-float-slow opacity-60" />
        </motion.div>

        <Container className="relative z-10 pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pt-24">
          <div className="max-w-2xl rounded-[2rem] bg-black/6 p-4 backdrop-blur-[1px] sm:bg-black/12 sm:p-8">
            <TextReveal
              text="Transforming Your Ideas Into Reality"
              className="max-w-[11ch] text-[2.7rem] font-bold leading-[0.95] tracking-tight text-white sm:max-w-none sm:text-6xl lg:text-[5.25rem]"
              delay={0.05}
            />
            <Reveal direction="up" delay={0.2}>
              <p className="mt-5 max-w-[24rem] text-sm leading-relaxed text-white/85 font-normal sm:mt-6 sm:max-w-xl sm:text-lg">
                We're a community of student founders, builders, and dreamers at APIIT - cultivating innovation,
                leadership, and entrepreneurship through mentorship, hands-on events, and a network that carries
                you well beyond graduation.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
                <Button as={Link} to="/events" variant="primary" size="lg">
                  Explore Events
                </Button>
                <Button as={Link} to="/about" variant="secondary" size="lg">
                  About Us
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint"
        >
          <div className="flex flex-col items-center gap-2 text-white/60">
            <MousePointer2 className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
          </div>
        </motion.div>
      </section>

      {/* Value Proposition */}
      <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="Our Philosophy" align="left" />

          <div className="relative mt-16 lg:grid lg:grid-cols-[1fr_180px] lg:gap-8">
            <div>
              {valueProps.map((item, i) => (
                <div key={item.title} className="relative flex gap-6 sm:gap-10">
                  <div className="flex flex-col items-center">
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className={cn(
                        "flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold shadow-md",
                        VALUE_ACCENTS[item.accent]
                      )}
                    >
                      0{i + 1}
                    </motion.span>
                    {i < valueProps.length - 1 && (
                      <motion.div
                        className="mt-2 w-px flex-1 origin-top bg-black/10"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </div>
                  <div className={cn("flex-1", i < valueProps.length - 1 ? "pb-12 sm:pb-14" : "pb-2") }>
                    <TextReveal
                      as="h3"
                      text={item.title.toUpperCase()}
                      className="text-3xl font-bold tracking-tight text-ink transition-colors duration-300 hover:text-gradient-brand sm:text-4xl lg:text-5xl"
                    />
                    <Reveal direction="up" delay={0.1}>
                      <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft sm:mt-4 sm:text-lg">{item.description}</p>
                    </Reveal>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative hidden lg:block" aria-hidden="true">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 180 700"
                preserveAspectRatio="none"
                fill="none"
              >
                <defs>
                  <linearGradient id="philosophyFlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0E6E77" />
                    <stop offset="50%" stopColor="#F0A93A" />
                    <stop offset="100%" stopColor="#0B3D2E" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M30,30 C150,90 20,180 90,270 C170,340 10,420 90,490 C150,550 40,600 60,670"
                  stroke="url(#philosophyFlow)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.5 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                />
                {[
                  { cx: 30, cy: 30, color: "#0E6E77" },
                  { cx: 90, cy: 340, color: "#F0A93A" },
                  { cx: 60, cy: 670, color: "#0B3D2E" },
                ].map((dot, i) => (
                  <motion.circle
                    key={i}
                    cx={dot.cx}
                    cy={dot.cy}
                    r="6"
                    fill={dot.color}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured: Sandbox */}
      <section
        className="relative overflow-hidden py-24 sm:py-32"
        style={{
          background:
            "radial-gradient(720px 620px at 12% 12%, rgba(122,61,104,0.42) 0%, rgba(122,61,104,0) 60%), radial-gradient(780px 680px at 88% 88%, rgba(168,113,150,0.30) 0%, rgba(168,113,150,0) 60%), linear-gradient(180deg, #2A1523 0%, #3c1c33 50%, #2A1523 100%)",
        }}
      >
        <Container className="relative grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="scale" className="order-2 lg:order-1">
            <TiltCard className="relative mx-auto max-w-lg">
              <Card glass glow={false} className="overflow-hidden p-3">
                <img
                  src="/sandbox/assets/home-hero.jpg"
                  alt="Champions celebrating on stage at the Sandbox grand final"
                  className="aspect-[4/3] w-full rounded-2xl object-cover"
                />
              </Card>
            </TiltCard>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal direction="up">
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-[#e0779f]" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e0779f]">
                  What's Coming Up
                </span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.08}>
              <p className="mt-6 font-coolvetica text-5xl italic text-white sm:text-6xl">
                SANDBOX <span className="text-[#e0779f]">3.0</span>
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.14}>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-300">
                Sri Lanka's biggest inter-school business pitching competition - run by the APIIT E-Club.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="mt-1 text-slate-500">Where Ideas Take Flight.</p>
            </Reveal>

            <Reveal direction="up" delay={0.26}>
              <SandboxCountdown />
            </Reveal>

            <Reveal direction="up" delay={0.34}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button as={Link} to="/sandbox" variant="sandbox" size="lg">
                  Explore Sandbox
                </Button>
                <Button as={Link} to="/events" variant="secondary" size="lg">
                  Browse Other Events
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Success Stories */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Voices Of Entrepreneurship"
            title="Real founders, real lessons."
            description="A few of the entrepreneurs and business owners who've been part of our journey - in their own words."
          />

          <Reveal direction="scale" delay={0.1} className="mt-16 flex flex-wrap items-center justify-center">
            {testimonials.map((item, i) => (
              <Tooltip key={item.name} label={`${item.name} - ${item.role}`}>
                <motion.button
                  type="button"
                  aria-label={`Show quote from ${item.name}`}
                  aria-pressed={activeVoice === i}
                  onClick={() => setActiveVoice(i)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.12, zIndex: 20 }}
                  animate={{ opacity: activeVoice === i ? 1 : 0.55 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative block cursor-pointer rounded-full"
                  style={{ marginLeft: i === 0 ? 0 : "-1.25rem", zIndex: i }}
                >
                  <img
                    src={item.photo}
                    alt={`Portrait of ${item.name}`}
                    className={cn(
                      "h-20 w-20 rounded-full object-cover object-top ring-4 transition-shadow duration-300 sm:h-28 sm:w-28",
                      activeVoice === i ? "ring-gold" : "ring-bg"
                    )}
                  />
                </motion.button>
              </Tooltip>
            ))}
          </Reveal>

          <div className="relative mx-auto mt-14 max-w-2xl text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVoice}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xl font-medium leading-relaxed text-ink sm:text-2xl">
                  "{testimonials[activeVoice].quote}"
                </p>
                <p className="mt-5 font-semibold text-ink">{testimonials[activeVoice].name}</p>
                <p className="text-sm text-teal-dark">{testimonials[activeVoice].role}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* Gallery / Moments */}
      <section className="relative overflow-hidden bg-[#faf9f6] py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Moments"
            title="Life at APIIT E-Club"
            description="From national pitching platforms and AI masterclasses to creative studios and vibrant campus markets, explore the defining moments from 2023 to 2026 that bring the APIIT E-Club community to life."
          />

          <div className="mt-16">
            <Gallery images={galleryImages} />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-hero animate-gradient-shift py-24 sm:py-32">
        <div className="absolute inset-0 bg-noise opacity-40" aria-hidden="true" />
        <GradientBlob tone="gold" size={420} className="absolute -left-20 -top-20" />
        <GradientBlob tone="teal" size={380} className="absolute -bottom-20 -right-10" />

        <Container className="relative">
          <SectionHeading
            light
            eyebrow="Get Involved"
            title="Become Part of the Next Generation of Entrepreneurs."
            description="Whether you have a fully-formed startup idea or just the drive to build something, there's a place for you at APIIT E-Club."
          />

          <Reveal direction="up" delay={0.2} className="mt-10 flex flex-wrap justify-center gap-4">
            <Button as={Link} to="/events" variant="primary" size="lg">
              See All Events
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
