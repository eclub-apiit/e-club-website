import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';

export default function IntroSection() {
  return (
    <section className="pt-32 pb-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-coolvetica font-normal text-white tracking-normal">
              WHAT WE <span className="text-[#a64d79]">OFFER</span>
            </h1>
          </div>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <ScrollReveal direction="left" className="md:w-1/2">
            <div className="text-center md:text-left">
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                Sandbox isn't just a competition; it's an accelerator for student potential. Here's what you gain by participating.
              </p>
              <p className="mt-6 text-slate-400 leading-relaxed">
                Every year, thousands of students have an idea worth building but few have access to the mentorship, capital, and network that turns that idea into something real. Sandbox exists to close that gap. Whether you're refining a business plan for the first time or preparing to pitch to your first investor, this is the platform built to get you there.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={150} className="md:w-1/2 w-full">
            <div className="group relative overflow-hidden rounded-3xl ring-1 ring-white/5 shadow-[0_0_90px_rgba(124,58,237,0.10)]">
              <img
                src="/sandbox/assets/Page hero2.jpg"
                alt="What We Offer"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
