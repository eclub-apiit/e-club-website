import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';

export default function WhatIsSandbox() {
  return (
    <section className="py-20 bg-[linear-gradient(to_bottom,#e7d4f0_0%,#e7d4f0_80%,#020617_100%)]">
      <div className="container max-w-6xl mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-coolvetica font-normal text-slate-900 mb-12 tracking-tight text-center">What is Sandbox?</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Left: intro */}
          <ScrollReveal direction="left">
            <div className="h-full rounded-2xl border border-black/10 bg-white/40 p-6 md:p-8">
              <p className="text-slate-900 text-base md:text-lg font-semibold mb-4">
                Sri Lanka's First Inter-School Business Pitching Competition
              </p>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
                The next generation of entrepreneurs is here and ready to be heard.
              </p>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
                Organised by the Entrepreneurship Club of APIIT in partnership with the Ministry of Education, this revolutionary competition brings together the sharpest young minds from schools across Sri Lanka to pitch real business ideas to a panel of seasoned industry judges.
              </p>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                This is a launchpad for your entrepreneurial journey.
              </p>
            </div>
          </ScrollReveal>

          {/* Right: theme */}
          <ScrollReveal direction="right" delay={150}>
            <div className="h-full rounded-2xl border border-black/10 bg-white/40 p-6 md:p-8">
              <p className="text-[#a64d79] text-base md:text-lg font-semibold mb-4">
                This Year's Theme: A Better Tomorrow
              </p>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                Students are challenged to think beyond the ordinary, building ideas that don't just make money, but make a difference. From sustainability to social impact, technology to community upliftment, contestants will present ventures designed to solve tomorrow's problems, today.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
