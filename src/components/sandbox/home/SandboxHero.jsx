import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import { ChevronRight } from 'lucide-react';
import { useHeroCta } from '../ui/HeroCtaContext';
import PartnersTicker from './PartnersTicker';

// All targets use Sri Lanka time (UTC+05:30) so visitors see the same schedule.
const MILESTONES = [
  { label: 'REGISTRATIONS CLOSE IN', target: new Date('2026-11-30T23:59:59+05:30') },
  { label: 'WORKSHOPS IN', target: new Date('2026-12-02T00:00:00+05:30') },
  { label: 'PRELIMINARY ROUND IN', target: new Date('2027-01-07T00:00:00+05:30') },
  { label: 'SEMI-FINALE IN', target: new Date('2027-01-14T00:00:00+05:30') },
  { label: 'GRAND FINALE AND AWARD CEREMONY IN', target: new Date('2027-01-26T00:00:00+05:30') },
];

function getActiveMilestone(now) {
  return MILESTONES.find((milestone) => milestone.target.getTime() > now) ?? null;
}

function computeTimeLeft(diffMs) {
  const total = Math.max(0, diffMs);
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

const Dial = ({ label, value, size = "large", theme = "dark" }) => {
  const numClasses = size === "small"
    ? "text-3xl md:text-4xl"
    : "text-3xl md:text-5xl";

  const labelClasses = size === "small"
    ? "text-[9px] md:text-[10px] mt-0.5"
    : "text-[10px] md:text-xs mt-2";

  const numColor = theme === "light" ? "text-[#691e56]" : "text-white";
  const labelColor = theme === "light" ? "text-slate-500" : "text-slate-400";

  return (
    <div className="flex flex-col items-center">
      <span className={`font-coolvetica font-normal ${numColor} tabular-nums leading-none ${numClasses}`}>
        {value.toString().padStart(2, '0')}
      </span>
      <span className={`font-normal ${labelColor} lowercase tracking-widest ${labelClasses}`}>
        {label}
      </span>
    </div>
  );
};

const Colon = ({ size = "large", theme = "dark" }) => (
  <span
    className={`font-coolvetica font-normal ${theme === "light" ? "text-slate-400" : "text-slate-500"} leading-none ${
      size === "small" ? "text-3xl md:text-4xl" : "text-3xl md:text-5xl"
    }`}
  >
    :
  </span>
);

export default function SandboxHero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeMilestone, setActiveMilestone] = useState(() => getActiveMilestone(Date.now()));
  const [isClosed, setIsClosed] = useState(() => getActiveMilestone(Date.now()) === null);
  const [isSticky, setIsSticky] = useState(false);
  const [barOnLight, setBarOnLight] = useState(false);
  const [headlineIndex, setHeadlineIndex] = useState(1);
  const [labelVisible, setLabelVisible] = useState(true);
  const previousLabel = useRef(null);
  const heroRef = useRef(null);
  const heroCtaRef = useRef(null);
  const { setHeroCtaVisible } = useHeroCta();

  // IntersectionObserver to track when the hero CTA scrolls out of view
  useEffect(() => {
    const el = heroCtaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroCtaVisible(entry.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [setHeroCtaVisible]);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const milestone = getActiveMilestone(now);

      if (!milestone) {
        setIsClosed(true);
        setActiveMilestone(null);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      if (previousLabel.current !== null && previousLabel.current !== milestone.label) {
        setLabelVisible(false);
        window.setTimeout(() => setLabelVisible(true), 200);
      }
      previousLabel.current = milestone.label;
      setActiveMilestone(milestone);
      setIsClosed(false);
      setTimeLeft(computeTimeLeft(milestone.target.getTime() - now));
    };

    tick();
    const timer = setInterval(tick, 1000);

    const handleScroll = () => {
      if (heroRef.current) {
        // Sticky when scrolled past hero section
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setIsSticky(heroBottom < 100);
      }

      // Darken the sticky bar's text when it overlaps a light-background section
      const sampleY = window.innerHeight - 30;
      let onLight = false;
      document.querySelectorAll('[data-sticky-bar="light"]').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= sampleY && rect.bottom >= sampleY) onLight = true;
      });
      setBarOnLight(onLight);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Swap the hero headline between "SANDBOX 3.0" and the full title every 5 seconds
  useEffect(() => {
    const id = setInterval(() => setHeadlineIndex((i) => (i === 0 ? 1 : 0)), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <section ref={heroRef} className="relative min-h-[85vh] md:min-h-screen flex items-center pt-24 pb-4 md:pb-12 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img
            src="/sandbox/assets/home-hero.jpg"
            alt="Sandbox Hero Background"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* slight cool-toned dark tint over the whole image */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-[#0a1424]/45"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/45 to-black/75"
          />
          {/* strong fade to black at the bottom so the image dissolves into the AboutSandbox section */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-gradient-to-b from-transparent via-black/80 to-black md:h-96"
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <div className="max-w-4xl mx-auto text-center w-full">

            <ScrollReveal delay={100}>
              <div className="relative mb-6">
                {/* Full title — stays in flow so it defines the height (no layout shift on swap) */}
                <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black font-display text-white tracking-tighter leading-[0.9] transition-opacity duration-700 ${headlineIndex === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="block text-slate-300 font-coolvetica italic font-normal tracking-wide !text-5xl md:!text-7xl lg:!text-8xl">Sri Lanka's Biggest Inter-School</span>
                  <span className="block text-[#a64d79] font-aubrey font-normal tracking-tight whitespace-nowrap !text-5xl md:!text-7xl lg:!text-8xl">Business Pitching</span>
                  <span className="block text-slate-100 font-coolvetica italic font-normal tracking-wide !text-5xl md:!text-7xl lg:!text-8xl">Competition<span className="text-[#14f2db]">.</span></span>
                </h1>
                {/* Alternate title — overlaid, centred, crossfades in */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 flex items-center justify-center font-black font-display tracking-tighter leading-[0.9] transition-opacity duration-700 ${headlineIndex === 1 ? 'opacity-100' : 'opacity-0'}`}
                >
                  <span className="text-slate-100 font-coolvetica italic font-normal tracking-wide whitespace-nowrap !text-5xl md:!text-7xl lg:!text-8xl">SANDBOX <span className="text-[#a64d79]">3.0</span></span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                Where Ideas Take Flight.
              </p>
            </ScrollReveal>

            <div className="w-full flex flex-col items-center">
              {/* Prominent CTA — the IntersectionObserver watches this stable
                  wrapper, NOT the button, so the ScrollReveal's transform animation
                  can't momentarily read as "out of view" and flash the nav CTA. */}
              <div ref={heroCtaRef}>
                <ScrollReveal delay={400}>
                  <a
                    href="https://forms.gle/aA7xeVSHBGGSuhs87"
                    target="_blank"
                    className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-base font-bold rounded-full bg-[#a64d79]/30 backdrop-blur-md border border-white/10 hover:bg-[#a64d79]/40 text-white transition-all duration-300 focus:ring-2 focus:ring-[#a64d79]/50 focus:outline-none shadow-lg hover:-translate-y-0.5 active:translate-y-0 mb-6"
                  >
                    <span>Register Now</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/10 transition-transform duration-300 group-hover:translate-x-0.5">
                      <ChevronRight size={18} />
                    </span>
                  </a>
                </ScrollReveal>
              </div>

              {/* Inline Hero Countdown */}
              <ScrollReveal delay={500}>
                {!isClosed ? (
                  <>
                    <div className="flex justify-center items-start gap-4 md:gap-6 mt-6">
                      {[
                        { label: 'Days', value: timeLeft.days },
                        { label: 'Hours', value: timeLeft.hours },
                        { label: 'Minutes', value: timeLeft.minutes },
                        { label: 'Seconds', value: timeLeft.seconds }
                      ].map((item, idx) => (
                        <React.Fragment key={idx}>
                          {idx > 0 && <Colon />}
                          <Dial label={item.label} value={item.value} />
                        </React.Fragment>
                      ))}
                    </div>
                    <p className="text-lg md:text-xl text-slate-400 text-center mt-6 leading-relaxed">
                      Until Registrations Close!
                    </p>
                  </>
                ) : (
                  <p className="text-2xl md:text-3xl font-bold text-white text-center mt-6 leading-relaxed">
                    Registrations are now closed!
                  </p>
                )}
              </ScrollReveal>
              {/* <PartnersTicker /> */}
            </div>

          </div>
        </div>
      </section>

      {/* Sticky Compact Countdown */}
      <div
          className={`fixed bottom-0 left-0 w-full z-40 bg-slate-950/20 backdrop-blur-2xl border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.4)] transition-transform duration-500 transform ${isSticky ? 'translate-y-0' : 'translate-y-full'}`}
        >
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-row items-center justify-center gap-6">

          {isClosed ? (
            <span className={`text-sm font-semibold uppercase tracking-wider ${barOnLight ? 'text-slate-600' : 'text-slate-300'}`}>
              SANDBOX 3.0 HAS CONCLUDED
            </span>
          ) : (
            <>
              <div className="hidden md:flex flex-col items-end">
                <span
                  className={`font-semibold uppercase tracking-wider transition-all duration-200 ${barOnLight ? 'text-slate-600' : 'text-slate-300'} ${labelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}
                  style={{ fontSize: activeMilestone && activeMilestone.label.length > 25 ? '0.7rem' : '0.875rem' }}
                >
                  <span className="hidden sm:inline">{activeMilestone?.label ?? ''}</span>
                  <span className="sm:hidden">
                    {activeMilestone?.label === 'GRAND FINALE AND AWARD CEREMONY IN' ? 'GRAND FINALE IN' : (activeMilestone?.label ?? '')}
                  </span>
                </span>
              </div>

          {/* Ticking Numbers */}
          <div className={`flex items-start gap-3 md:gap-4 md:border-l md:pl-6 ${barOnLight ? 'md:border-slate-400/40' : 'md:border-white/10'}`}>
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hrs', value: timeLeft.hours },
              { label: 'Min', value: timeLeft.minutes },
              { label: 'Sec', value: timeLeft.seconds }
            ].map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <Colon size="small" theme={barOnLight ? 'light' : 'dark'} />}
                <Dial label={item.label} value={item.value} size="small" theme={barOnLight ? 'light' : 'dark'} />
              </React.Fragment>
            ))}
          </div>

            </>
          )}

        </div>
        </div>
    </>
  );
}
