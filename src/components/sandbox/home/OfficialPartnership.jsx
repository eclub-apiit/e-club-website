import React from 'react';
import { Landmark, ArrowRight } from 'lucide-react';

export default function OfficialPartnership() {
  return (
    <section className="relative py-20 z-10 border-y border-[rgba(183,155,221,0.15)]">
      <div className="container max-w-4xl mx-auto px-4 text-center">

        <p className="text-[#C3AEE6] font-medium tracking-widest uppercase mb-4 text-sm">
          Official Partnership
        </p>

        <h2 className="text-3xl md:text-4xl font-display font-bold text-[#F3EEFB] mb-12 tracking-tight">
          In Partnership with the Ministry of Education
        </h2>

        <div className="rounded-3xl p-8 border-2 border-[#130E1C] bg-[rgba(122,79,176,0.10)] backdrop-blur-sm max-w-3xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Crest/Icon Tile */}
            <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#7A4FB0] to-[#3A1860] flex items-center justify-center shadow-lg border border-[rgba(183,155,221,0.15)]">
               <Landmark className="w-12 h-12 text-[#F3EEFB]" />
            </div>

            {/* Text Content */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-display font-bold text-[#F3EEFB] uppercase tracking-wide">
                Ministry of Education
              </h3>
              <p className="text-[#C3AEE6] tracking-widest uppercase text-sm mt-1 mb-4">
                Sri Lanka
              </p>
              <p className="text-[#C6B9E0] text-lg font-sans leading-relaxed">
                Backed by the Sri Lankan government to ensure every young person - regardless of school type or background - has equal access to entrepreneurial education.
              </p>
            </div>
          </div>
        </div>

        {/* Link Button */}
        <a
          href="__REPLACE_WITH_PARTNERSHIP_URL__"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-[#C3AEE6] bg-[rgba(122,79,176,0.10)] text-[#C3AEE6] font-bold font-sans transition-all duration-300 hover:bg-[#C3AEE6] hover:text-[#130E1C] hover:-translate-y-0.5 group"
        >
          View the Government Partnership
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </a>

      </div>
    </section>
  );
}
