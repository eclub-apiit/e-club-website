import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

const MARKS = {
  ring:   <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2.4"/></svg>,
  dot:    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" fill="currentColor"/></svg>,
  tri:    <svg viewBox="0 0 24 24" fill="none"><path d="M12 4l8 15H4L12 4z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/></svg>,
  sq:     <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="5" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2.4"/></svg>,
  spark:  <svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8"/></svg>,
  hex:    <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7.5 4.5v9L12 21l-7.5-4.5v-9L12 3z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/></svg>,
};

export const EDITIONS = {
  "Sandbox 1.0": [
    { name: "Associate Partner", partners: [
      { name: "KVK Enterprises", img: "/sandbox/assets/KVK-logo.jpeg" },
    ]},
    { name: "Learning Partner", partners: [
      { name: "Unilever", img: "/sandbox/assets/unilever-logo.png" },
      { name: "Sasnaka Sansada Foundation", img: "/sandbox/assets/sasnaka-logo.jpg" },
    ]},
    { name: "Banking Partner", partners: [
      { name: "Sampath Bank", img: "/sandbox/assets/sampath-logo.jpg" },
    ]},
    { name: "Advocacy Partner", partners: [
      { name: "Department of Wildlife Conservation", img: "/sandbox/assets/CEA-logo.png" },
    ]},
    { name: "Print & Online Media Partner", partners: [
      { name: "Veerakesari", img: "/sandbox/assets/veerakesari-logo.png" },
    ]},
    { name: "Photography Partner", partners: [
      { name: "Black Canvas Photography", img: "/sandbox/assets/Black-Canvas-logo.png", box: 'black' },
    ]},
    { name: "Host & Organiser", partners: [
      { name: "Asia Pacific Institute of Information Technology (APIIT)", img: "/sandbox/assets/apiit-logo-black.jpg" },
      { name: "Entrepreneurship Club of APIIT", img: "/sandbox/assets/eclub-logo.png" },
    ]},
  ],
  "Sandbox 2.0": [
    { name: "Title Sponsor", partners: [
      { name: "John Keells Office Automation", img: "/sandbox/assets/JKOA-logo.png" }
    ]},
    { name: "Bronze Sponsor", partners: [
      { name: "Playdium", img: "/sandbox/assets/playdium-logo.png" },
      { name: "Awakening Training Academy", img: "/sandbox/assets/ATA-logo.png", box: 'none' },
    ]},
    { name: "Banner Sponsor", partners: [
      { name: "National Savings Bank", img: "/sandbox/assets/NSB-logo.png" },
    ]},
    { name: "AV Advertisement Sponsor", partners: [
      { name: "Sampath Bank", img: "/sandbox/assets/sampath-logo.jpg" },
    ]},
    { name: "Print Media Sponsor", partners: [
      { name: "The Sunday Times", img: "/sandbox/assets/sunday-logo.jpg" },
    ]},
    { name: "Photography Partner", partners: [
      { name: "Black Canvas Photography", img: "/sandbox/assets/Black-Canvas-logo.png", box: 'black' },
    ]},
        { name: "E-Logo Sponsor", partners: [
      { name: "Sampath Auto & Trading", img: "/sandbox/assets/sampathauto-logo.png" },
      { name: "Helpyou.lk", img: "/sandbox/assets/helpyou-logo.jpg", box: 'none' },
      { name: "Life Vision", img: "/sandbox/assets/life-vision-logo.jpeg", box: 'none' },
      { name: "Hi-Tech Lanka", img: "/sandbox/assets/hi-tech-logo.png", box: 'black' },
      { name: "Hunters Woodcabins", img: "/sandbox/assets/hunters-logo.jpg", box: 'none' },
      { name: "SAB", img: "/sandbox/assets/sab-logo.png", box: 'none' },
      { name: "Decent Trust Holdings", img: "/sandbox/assets/decent-logo.png" },
    ]},
    { name: "Host & Organiser", partners: [
      { name: "Asia Pacific Institute of Information Technology (APIIT)", img: "/sandbox/assets/apiit-logo-black.jpg" },
      { name: "Entrepreneurship Club of APIIT", img: "/sandbox/assets/eclub-logo.png" },
    ]},
  ],
};

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* Styles are inlined here (not via <style jsx>) because styled-jsx only scopes
   to the component that declares it — the <style jsx> block lives in PastPartners,
   so its .sponsor-logo-box / .sponsor-name-text rules never reach this child
   component. Inlining guarantees every logo gets an identical white square card. */
const cardInnerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '10px',
};

const logoBoxBaseStyle = {
  width: '100%',
  aspectRatio: '1 / 1',
  borderRadius: '10px',
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

const nameTextStyle = {
  fontSize: '15px',
  fontWeight: 600,
  color: '#F5F2F7',
  textAlign: 'left',
  lineHeight: 1.3,
  fontFamily: '"Poppins", sans-serif',
  overflowWrap: 'break-word',
  wordBreak: 'break-word',
};

function SponsorCard({ p }) {
  const isBlack = p.box === 'black';
  // box: 'none' → no card behind the logo (transparent); 'black' → dark card; default → white card
  const background = p.box === 'none' ? 'transparent' : isBlack ? '#000000' : '#FFFFFF';
  const logoBoxStyle = {
    ...logoBoxBaseStyle,
    background,
  };
  return (
    <div style={cardInnerStyle}>
      <div style={logoBoxStyle}>
        {p.img ? (
          <img
            src={p.img}
            alt={p.name}
            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }}
          />
        ) : (
          /* Text-only fallback when no logo image exists */
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            color: isBlack ? '#F5F2F7' : '#1B1220',
            textAlign: 'center',
            lineHeight: 1.15,
            fontFamily: '"Poppins", sans-serif',
          }}>
            {p.name}
          </span>
        )}
      </div>
      <span style={nameTextStyle}>{p.name}</span>
    </div>
  );
}

export default function PastPartners() {
  const years = Object.keys(EDITIONS);
  const [activeYear, setActiveYear] = useState(years[years.length - 1]);
  const [activeTier, setActiveTier] = useState('');
  const [isSwitching, setIsSwitching] = useState(false);

  const contentRef = useRef(null);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const thumbRef = useRef(null);
  const yearsRef = useRef(null);

  const observerRef = useRef(null);

  // Position thumb perfectly
  const updateThumbPosition = () => {
    if (yearsRef.current && thumbRef.current) {
      const activeBtn = yearsRef.current.querySelector('.year-pill[aria-pressed="true"]');
      if (activeBtn) {
        thumbRef.current.style.width = activeBtn.offsetWidth + 'px';
        thumbRef.current.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
      }
    }
  };

  // Position indicator smoothly
  const updateIndicatorPosition = () => {
    if (navRef.current && indicatorRef.current) {
      const activeLink = navRef.current.querySelector('.tier-link.active');
      if (!activeLink || window.innerWidth <= 1024) {
        indicatorRef.current.style.opacity = '0';
      } else {
        indicatorRef.current.style.opacity = '1';
        indicatorRef.current.style.height = activeLink.offsetHeight + 'px';
        const topOffset = activeLink.offsetTop;
        indicatorRef.current.style.transform = `translateY(${topOffset}px)`;
      }
    }
  };

  // Handle year switch with spring and glow
  const handleYearSelect = (y) => {
    if (y === activeYear) return;

    if (thumbRef.current) {
      thumbRef.current.classList.add('moving');
      setTimeout(() => {
        if (thumbRef.current) thumbRef.current.classList.remove('moving');
      }, 560);
    }

    setIsSwitching(true);
    setTimeout(() => {
      setActiveYear(y);
      setIsSwitching(false);
    }, 340);
  };

  // Recompute thumb sizes whenever year changes or fonts load
  useIsomorphicLayoutEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(updateThumbPosition));
    if (document.fonts) {
      document.fonts.ready.then(() => {
        requestAnimationFrame(() => requestAnimationFrame(updateThumbPosition));
      });
    }
  }, [activeYear]);

  // Setup scroll spy (exact logic requested) and scroll reveals
  useEffect(() => {
    if (isSwitching) return;

    // Intersection observer for logo card reveals
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      if (observerRef.current) observerRef.current.disconnect();
      const cards = contentRef.current?.querySelectorAll('.logo-card');
      if (cards && cards.length > 0) {
        observerRef.current = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              const card = e.target;
              const idx = Array.from(card.parentElement.children).indexOf(card);
              card.style.animationDelay = (idx * 55) + 'ms';
              card.classList.add('in');
              observerRef.current.unobserve(card);
            }
          });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
        cards.forEach(c => observerRef.current.observe(c));
      }
    } else {
      // reduced motion: just show them immediately
      const cards = contentRef.current?.querySelectorAll('.logo-card');
      cards?.forEach(c => c.classList.add('in-instant'));
    }

    // Passive scroll listener for Tier indicator
    let ticking = false;
    const tierEls = contentRef.current?.querySelectorAll('.tier-block');

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (tierEls && tierEls.length > 0) {
            const focusLine = window.innerHeight * 0.38;
            let currentTier = tierEls[0].id; // fallback to first
            let minDiff = Infinity;

            for (let i = 0; i < tierEls.length; i++) {
              const rect = tierEls[i].getBoundingClientRect();
              if (rect.top <= focusLine) {
                const diff = focusLine - rect.top;
                if (diff < minDiff) {
                  minDiff = diff;
                  currentTier = tierEls[i].id;
                }
              }
            }
            setActiveTier(currentTier);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once to initialize
    onScroll();

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [activeYear, isSwitching]);

  // Sync indicator when active tier changes
  useIsomorphicLayoutEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(updateIndicatorPosition));
  }, [activeTier, activeYear, isSwitching]);

  // Global resize listener
  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          updateThumbPosition();
          updateIndicatorPosition();
        }));
      }, 50);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tiers = EDITIONS[activeYear] || [];

  return (
    <section
      id="past-sponsors"
      className="pb-6 md:pb-20 relative bg-[linear-gradient(180deg,#2A1523_0%,#3c1c33_50%,#2A1523_100%)] font-sans"
    >
      {/* Soft plum glows for depth — matches PartnerUp.
          Clipped by this overflow-hidden layer so the wide blurred blobs can't
          overflow the viewport on mobile. It's a sibling of the content, not an
          ancestor of the sticky sidebar/year-toggle, so sticky still works. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[4%] left-[8%] w-[400px] h-[400px] bg-[#7A3D68] rounded-full filter blur-[90px] opacity-40"></div>
        <div className="absolute top-[42%] left-[38%] w-[420px] h-[420px] bg-[#7A3D68] rounded-full filter blur-[90px] opacity-30"></div>
        <div className="absolute bottom-[8%] right-[8%] w-[450px] h-[450px] bg-[#A87196] rounded-full filter blur-[90px] opacity-30"></div>
      </div>

      {/* 1. Section Header */}
      <div className="max-w-[1200px] mx-auto px-[clamp(20px,5vw,40px)] pt-20 text-center relative z-10">
        <span className="inline-block font-poppins font-semibold text-[12px] tracking-[0.32em] text-[#a64d79] uppercase mb-4">
          Our Past Partners
        </span>
        <h2 className="font-poppins font-bold text-[clamp(38px,7vw,76px)] leading-[1.02] tracking-[-0.02em] text-white">
          Sandbox <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#a64d79]">Sponsors</span>
        </h2>
        <p className="text-[#C6B9E0] max-w-[560px] mx-auto mt-4 text-[clamp(15px,2vw,17px)]">
          The organisations that powered Sri Lanka's biggest inter-school business pitching competition. Meet the partners who stood with previous sandbox competitions.
        </p>
      </div>

      {/* 2. Edition Toggle */}
      <div className="years relative z-40" ref={yearsRef}>
        <div className="year-switch">
          <span className="year-thumb" ref={thumbRef}></span>
          {[...years].reverse().map(y => (
            <button
              key={y}
              className={`year-pill ${y === activeYear ? 'active' : ''}`}
              aria-pressed={y === activeYear}
              onClick={() => handleYearSelect(y)}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Layout: Sidebar + Grid */}
      <div className="w-full pl-[32px] pr-[clamp(20px,5vw,40px)]">
        <div className={`layout ${isSwitching ? 'switching' : ''}`}>

          <aside className="sidebar">
            <div className="sidebar-inner sticky top-[112px] z-30">
              <nav className="tier-nav" ref={navRef}>
                <div className="tier-indicator" ref={indicatorRef}></div>
                {tiers.map((t, i) => {
                  const targetId = slug(t.name);
                  return (
                    <button
                      key={t.name}
                      className={`tier-link ${activeTier === targetId || (i === 0 && !activeTier) ? 'active' : ''}`}
                      onClick={() => {
                        const el = document.getElementById(targetId);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <main className="content min-w-0" ref={contentRef}>
            {tiers.map(t => (
              <section className="tier-block scroll-mt-[160px] pt-2 mb-14" id={slug(t.name)} key={t.name}>
                <div className="flex items-baseline gap-[14px] mb-[22px]">
                  <h3 className="text-white m-0 font-poppins font-semibold text-[clamp(20px,3vw,27px)] tracking-[-0.01em]">
                    {t.name}
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[14px] items-stretch">
                  {t.partners.map((p, i) => (
                    <div className="logo-card" key={i}>
                      <SponsorCard p={p} />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </main>

        </div>
      </div>

      <style>{`
        .years {
          display: flex; justify-content: center;
          padding: 30px 0 26px; margin-top: 8px;
          background: transparent;
        }
        .year-switch {
          position: relative; display: inline-flex; padding: 6px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.10);
          box-shadow: 0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .year-thumb {
          position: absolute; top: 6px; left: 0; height: calc(100% - 12px);
          border-radius: 999px;
          background: linear-gradient(135deg, #fff, #f4eef1);
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.75);
          transition: transform 0.5s cubic-bezier(.34, 1.56, .5, 1),
                      width 0.5s cubic-bezier(.34, 1.56, .5, 1),
                      box-shadow 0.5s ease;
          z-index: 0; will-change: transform, width;
        }
        .year-thumb.moving {
          box-shadow: 0 8px 26px rgba(166,77,121,0.35), inset 0 1px 0 rgba(255, 255, 255, 0.75);
        }
        .year-pill {
          position: relative; z-index: 1;
          font-family: "Poppins", sans-serif; font-weight: 600; font-size: 15px;
          color: #cbc3d2; background: transparent; border: none;
          border-radius: 999px; padding: 10px 30px; cursor: pointer; white-space: nowrap;
          transition: color .4s cubic-bezier(.22, 1, .36, 1);
        }
        .year-pill:hover { color: #ffffff; }
        .year-pill.active { color: #1b1420; font-weight: 700; }

        .layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 24px;
          padding-bottom: 120px;
        }

        .sidebar { position: relative; min-width: 0; }
        .tier-nav { position: relative; padding-left: 20px; }
        .tier-indicator {
          position: absolute; left: 0; top: 0;
          width: 4px; height: 30px; border-radius: 2px;
          background: linear-gradient(#c25d94, #a64d79);
          box-shadow: 0 0 16px #a64d79;
          transition: transform 0.45s cubic-bezier(.4, 0, .1, 1), height 0.45s cubic-bezier(.4, 0, .1, 1), opacity .25s;
        }
        .tier-link {
          position: relative;
          display: block; width: 100%; text-align: left; background: none; border: none;
          font-family: "Inter", sans-serif; font-size: 19px; font-weight: 500; color: #C4B8CC;
          padding: 18px 0 18px 20px; cursor: pointer;
          transition: color .15s ease, padding-left .25s cubic-bezier(.22, 1, .36, 1);
        }
        .tier-link::after {
          content: ""; position: absolute; left: 0; bottom: 0;
          width: 150px; max-width: 68%; height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,.08), rgba(255,255,255,0));
          transition: opacity .25s;
        }
        .tier-link:last-child::after { display: none; }
        .tier-link:hover, .tier-link:focus-visible { color: #ffffff; outline: none; }
        .tier-link.active { color: #ffffff; font-weight: 700; padding-left: 20px; }

        .logo-card {
          position: relative;
          background: #1B1220;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 12px;
          overflow: hidden;
          opacity: 0; transform: translateY(22px);
          transition: background 150ms ease, border-color 150ms ease;
        }
        .logo-card.in { animation: rise .6s cubic-bezier(.22, 1, .36, 1) forwards; }
        .logo-card.in-instant { opacity: 1; transform: translateY(0); transition: none; }

        @keyframes rise { to { opacity: 1; transform: translateY(0); } }

        .logo-card:hover {
          background: #241830;
          border-color: rgba(255,255,255,0.16);
        }

        .sponsor-card-inner {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 10px;
        }

        .sponsor-logo-box {
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #FFFFFF;
          border-radius: 10px;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .sponsor-name-text {
          font-size: 15px;
          font-weight: 600;
          color: #F5F2F7;
          text-align: left;
          line-height: 1.3;
          font-family: "Poppins", sans-serif;
          /* Never truncate with ellipsis — allow natural wrapping */
          overflow-wrap: break-word;
          word-break: break-word;
        }

        .layout.switching .content, .layout.switching .sidebar-inner { opacity: 0; transform: translateY(10px); }
        .layout .content, .layout .sidebar-inner { transition: opacity .4s cubic-bezier(.22, 1, .36, 1), transform .4s cubic-bezier(.22, 1, .36, 1); }

        @media (max-width: 1024px) {
          .layout { grid-template-columns: 1fr; gap: 8px; padding-bottom: 24px; }
          /* Filter list hidden on mobile — just scroll through the tiers */
          .sidebar { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .year-thumb { transition: none !important; }
          .tier-indicator { transition: none !important; }
          html { scroll-behavior: auto !important; }
        }
      `}</style>
    </section>
  );
}
