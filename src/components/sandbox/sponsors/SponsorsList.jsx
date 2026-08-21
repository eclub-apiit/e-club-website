import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';

// TODO: Replace with exact sponsor names and logos
const SPONSORS_DATA = {
  "Title Sponsor": [
    { name: "Placeholder Sponsor 1", logo: "/sandbox/assets/eclub-logo.png" }
  ],
  "Platinum Sponsors": [
    { name: "Placeholder Sponsor 2", logo: "/sandbox/assets/eclub-logo.png" },
    { name: "Placeholder Sponsor 3", logo: "/sandbox/assets/eclub-logo.png" }
  ],
  "Gold Sponsors": [
    { name: "Placeholder Sponsor 4", logo: "/sandbox/assets/eclub-logo.png" },
    { name: "Placeholder Sponsor 5", logo: "/sandbox/assets/eclub-logo.png" }
  ]
};

export default function SponsorsList() {
  return (
    <section className="pt-40 pb-24 bg-[linear-gradient(180deg,#2A1523_0%,#3c1c33_50%,#2A1523_100%)] relative overflow-hidden z-10 min-h-screen">
      {/* Soft plum glows for depth — matches PartnerUp */}
      <div className="absolute top-[12%] left-[8%] w-[400px] h-[400px] bg-[#7A3D68] rounded-full filter blur-[90px] opacity-40 pointer-events-none z-0"></div>
      <div className="absolute bottom-[12%] right-[8%] w-[450px] h-[450px] bg-[#A87196] rounded-full filter blur-[90px] opacity-30 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-coolvetica font-normal text-white tracking-normal mb-6">
              OUR <span className="text-[#a64d79]">SPONSORS</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              The organizations that make Sandbox possible.
            </p>
          </div>
        </ScrollReveal>

        {Object.entries(SPONSORS_DATA).map(([tier, sponsors], idx) => (
          <div key={idx} className="mb-20">
            <ScrollReveal>
              <h2 className="text-3xl font-bold font-display text-center text-white mb-10 pb-4">
                {tier}
              </h2>
            </ScrollReveal>

            <div className="flex flex-wrap justify-center gap-8">
              {sponsors.map((sponsor, i) => (
                <ScrollReveal key={i} delay={i * 100} direction="up">
                  <div className="w-48 h-48 md:w-64 md:h-64 relative bg-slate-900 border border-white/5 rounded-2xl flex items-center justify-center p-8 hover:border-[#7C3AED]/50 transition-colors">
                    <div className="relative w-full h-full opacity-70 hover:opacity-100 transition-opacity">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="absolute inset-0 h-full w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
