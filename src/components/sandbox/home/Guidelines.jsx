import React from 'react';
import { CheckCircle2, ArrowRight, Check } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const RULES_PDF = '/sandbox/sandbox-rules-and-regulations.pdf';

export default function Guidelines() {
  const guidelines = [
    "Open to all Sri Lankan schools",
    "Team-based submission",
    "Live pitch rounds",
    "Judged by entrepreneurs",
    "Fair & transparent judging",
    "Government endorsed"
  ];

  return (
    <section data-sticky-bar="dark" className="relative pt-10 pb-20 md:py-20 z-10 bg-transparent">
      {/* Background layer removed to show collage */}

      <div className="container max-w-5xl mx-auto px-4 mt-0 md:mt-16 relative z-10">

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left Text Block */}
          <ScrollReveal className="flex-1">
            <p className="text-[#a64d79] font-bold tracking-widest uppercase mb-4 text-sm">
              Competition Guidelines
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
              How to Compete & Win
            </h2>
            <p className="text-purple-200 text-lg font-sans leading-relaxed mb-8 font-medium">
              Open to all schools in Sri Lanka. Teams brainstorm and pitch a business idea, judged on originality, feasibility, and presentation by leading entrepreneurs.
            </p>

            {/* Desktop Button — opens as preview */}
            <a
              href={RULES_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#3c1c33] to-[#7A3D68] text-[#F3EEFB] px-8 py-4 rounded-full font-bold font-sans transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group"
            >
              View Full Rules &amp; Regulations
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Mobile Button — opens as preview */}
            <a
              href={RULES_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex md:hidden items-center justify-center gap-2 bg-gradient-to-r from-[#3c1c33] to-[#7A3D68] text-[#F3EEFB] px-8 py-4 rounded-full font-bold font-sans transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group"
            >
              View Full Rules &amp; Regulations
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </ScrollReveal>

          {/* Right Checklist Block */}
          <ScrollReveal delay={150} className="flex-1 w-full lg:w-auto">
            <div className="bg-black/40 p-8 md:p-10 rounded-3xl border border-white/10 shadow-xl backdrop-blur-md">
              <ul className="grid grid-cols-1 gap-6">
                {guidelines.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#3c1c33] to-[#7A3D68] flex items-center justify-center shadow-md border border-[#7A3D68]/30">
                      <Check className="w-5 h-5 text-white stroke-[3]" />
                    </div>
                    <span className="text-white font-sans text-lg font-bold">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
