import React from 'react';
import { Rocket } from 'lucide-react';
import { SponsorCard } from './PastPartners';
import ScrollReveal from '../ui/ScrollReveal';

const SPONSORS_DATA = {
  'Printing Partner': [
    { name: 'Methuli Premium', img: '/sandbox/assets/methuli-logo.png' },
  ],
  'E-Logo Sponsors': [
    { name: 'ACCA', img: '/sandbox/assets/acca-logo.png' },
    { name: 'Keells', img: '/sandbox/assets/keells-logo.png' },
  ],
  'Well Wishes': [
    { name: 'Protrans Logistics', img: '/sandbox/assets/protrans-logo.png' },
  ],
  'Host & Organiser': [
    { name: 'Asia Pacific Institute of Information Technology (APIIT)', img: '/sandbox/assets/apiit-logo-black.jpg' },
    { name: 'Entrepreneurship Club of APIIT', img: '/sandbox/assets/eclub-logo.png' },
  ],
};

function CardTile({ sponsor }) {
  return (
    <div className="group h-full w-full overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#1B1220] p-3 transition-shadow duration-200 hover:shadow-[0_0_28px_rgba(166,77,121,0.45)] motion-reduce:transition-none">
      <SponsorCard p={sponsor} align="center" />
    </div>
  );
}

export default function SponsorsList() {
  return (
    <section className="relative z-10 overflow-hidden pb-24 pt-40 font-sans">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-[8%] top-[12%] h-[400px] w-[400px] rounded-full bg-[#7A3D68] opacity-40 blur-[90px]" />
        <div className="absolute bottom-[12%] right-[8%] h-[450px] w-[450px] rounded-full bg-[#A87196] opacity-30 blur-[90px]" />
      </div>
      <div className="sandbox-starfield pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-[clamp(20px,5vw,40px)]">
        <ScrollReveal>
          <div className="text-center">
            <span className="mb-4 inline-flex items-center gap-2 font-poppins text-[12px] font-semibold uppercase tracking-[0.32em] text-[#a64d79]">
              <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
              Sandbox 3.0 · 2026
            </span>
            <h2 className="font-poppins text-[clamp(38px,7vw,76px)] font-bold leading-[1.02] tracking-[-0.02em] text-white">
              Meet Our Sponsors
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[clamp(15px,2vw,17px)] text-[#C6B9E0]">
              The organisations that make Sandbox 3.0 possible.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative mt-24">
          <img
            src="/sandbox/assets/rocket.png"
            alt=""
            aria-hidden="true"
            className="sandbox-sponsor-rocket absolute left-5 top-[-3rem] z-0 w-10 md:left-1/2 md:-translate-x-1/2"
          />
          <div className="relative z-10 space-y-16">
            {Object.entries(SPONSORS_DATA).map(([tier, sponsors]) => (
              <div key={tier} className="text-center">
                <ScrollReveal>
                  <h3 className="mb-[22px] font-poppins text-[clamp(20px,3vw,27px)] font-semibold tracking-[-0.01em] text-white">
                    {tier}
                  </h3>
                </ScrollReveal>
                <div className="flex flex-wrap items-stretch justify-center gap-[14px]">
                  {sponsors.map((sponsor, index) => (
                    <ScrollReveal key={sponsor.name} delay={index * 100} className="flex w-[calc(50%-7px)] sm:w-[200px]">
                      <CardTile sponsor={sponsor} />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
