import React from 'react';
import SupportingContent from './SupportingContent';
import ScrollReveal from '../ui/ScrollReveal';

const COMMUNITY_GROWTH_DATA = [
  {
    title: "Networking Opportunities",
    description: "Connect with like-minded student entrepreneurs from over 150 schools across the nation.",
    images: [
      "/sandbox/assets/N1.jpg",
      "/sandbox/assets/N2.jpg",
      "/sandbox/assets/N3.jpg",
      "/sandbox/assets/N4.jpg",
      "/sandbox/assets/N5.jpg",
      "/sandbox/assets/N6.jpg"
    ],
    extra: {
      type: 'stat',
      value: "150+",
      label: "Schools in the Sandbox network",
      note: "Real relationships with peers solving similar problems."
    }
  }
];

export default function CommunityGrowth() {
  return (
    <section className="pt-0 pb-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          {COMMUNITY_GROWTH_DATA.map((item, idx) => (
            <ScrollReveal key={item.title} direction="right">
            <div
              className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16 py-12 border-b border-white/5 last:border-b-0"
            >
              <div className="relative w-full md:w-1/2">
                <div className="grid grid-cols-3 gap-3">
                  {item.images.map((src, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="group overflow-hidden rounded-xl border border-white/5 shadow-[0_0_40px_rgba(124,58,237,0.10)]"
                    >
                      <img
                        src={src}
                        alt={`${item.title} photo ${imgIdx + 1}`}
                        className="w-full h-28 sm:h-36 md:h-44 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center md:text-left md:w-1/2">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg max-w-xl mx-auto md:mx-0">
                  {item.description}
                </p>
                <SupportingContent extra={item.extra} />
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
