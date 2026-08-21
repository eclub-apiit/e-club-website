import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';

export default function WhyAttend() {
  const reasons = [
    {
      title: "Shape Your Idea",
      desc: "Turn a rough concept into a real business model - with industry experts in your corner every step of the way."
    },
    {
      title: "Build Your Network",
      desc: "Connect with ambitious student entrepreneurs from 150+ schools across Sri Lanka. Your future co-founders, collaborators, and rivals are all here."
    },
    {
      title: "Get in the Room",
      desc: "Pitch your vision to a panel of investors and business leaders who've built what you're dreaming of."
    },
    {
      title: "Win Big - Then Keep Going",
      desc: "Walk away with a share of a massive prize pool and hands-on mentorship to actually launch what you've built."
    }
  ];

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Soft edge blends — no sharp boundaries with adjacent sections */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#2E1065]/30 to-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#7C3AED]/5 to-black" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#3c1c33]/40 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-coolvetica font-normal text-white mb-4">Why Sandbox?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">It's more than a competition. It's the launchpad for your entrepreneurial journey.</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, idx) => (
            <ScrollReveal key={idx} delay={idx * 100}>
              <div className="bg-transparent border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors h-full">
                <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
                <p className="text-slate-400 leading-relaxed">{reason.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
