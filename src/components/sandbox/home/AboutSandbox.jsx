import React from 'react';
import { Landmark } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const cardClass =
  "rounded-3xl border border-[rgba(183,155,221,0.28)] bg-[rgba(122,79,176,0.18)] p-5 md:p-6 backdrop-blur-md text-left";

export default function AboutSandbox() {
  return (
    <section className="relative pt-4 pb-16 md:py-20 z-10">
      {/* reverse of the hero's fade-to-black — this section starts black at the top and lightens downward */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-black via-black/45 to-transparent md:h-56"
      />
      <div className="container max-w-5xl mx-auto px-4 relative z-10">

        {/* Heading */}
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-coolvetica font-normal text-[#F3EEFB] mb-10 tracking-tight text-center">
            What is Sandbox?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Top-left: info */}
            <div className={cardClass}>
              <p className="text-[#F3EEFB] text-base md:text-lg font-semibold mb-3">
                Sri Lanka's First Inter-School Business Pitching Competition
              </p>
              <p className="text-[#C6B9E0] text-sm leading-relaxed mb-3">
                The next generation of entrepreneurs is here and ready to be heard.
              </p>
              <p className="text-[#C6B9E0] text-sm leading-relaxed mb-3">
                Organised by the Entrepreneurship Club of APIIT in partnership with the Ministry of Education, this revolutionary competition brings together the sharpest young minds from schools across Sri Lanka to pitch real business ideas to a panel of seasoned industry judges.
              </p>
              <p className="text-[#F3EEFB] text-sm leading-relaxed font-semibold">
                This is a launchpad for your entrepreneurial journey.
              </p>
            </div>

            {/* Top-right: theme */}
            <div className={cardClass}>
              <p className="text-[#F3EEFB] text-base md:text-lg font-semibold mb-3">
                This Year's Theme: A Better Tomorrow
              </p>
              <p className="text-[#C6B9E0] text-sm leading-relaxed">
                Students are challenged to think beyond the ordinary, building ideas that don't just make money, but make a difference. From sustainability to social impact, technology to community upliftment, contestants will present ventures designed to solve tomorrow's problems, today.
              </p>
            </div>

            {/* Bottom (full width): official partnership, centred */}
            <div className={`${cardClass} md:col-span-2 text-center`}>
              <p className="text-[#C3AEE6] font-medium tracking-widest uppercase text-xs mb-4">
                Official Partnership
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#A87196] to-[#542A49] flex items-center justify-center shadow-lg border border-[rgba(183,155,221,0.15)]">
                  <Landmark className="w-7 h-7 text-[#F3EEFB]" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-display font-bold text-[#F3EEFB] uppercase tracking-wide leading-tight">
                    Ministry of Education
                  </h3>
                  <p className="text-[#C3AEE6] tracking-widest uppercase text-[11px] mt-0.5">
                    Sri Lanka
                  </p>
                </div>
              </div>
              <p className="text-[#C6B9E0] text-sm leading-relaxed mt-4 max-w-2xl mx-auto">
                Backed by the Ministry of Education, Higher Education and Vocational Education of Sri Lanka to ensure every student has equal access to entrepreneurial education, regardless of their school type or background.
              </p>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
