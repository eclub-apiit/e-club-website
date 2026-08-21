import React from 'react';
import SupportingContent from './SupportingContent';
import ScrollReveal from '../ui/ScrollReveal';

const CORE_SUPPORT_DATA = [
  {
    title: "Expert Workshops",
    description: "Learn the fundamentals of business planning, financial forecasting, and effective pitching directly from industry professionals.",
    images: [
      "/sandbox/assets/Workshop sandbox 2.0 (1).jpg",
      "/sandbox/assets/Workshop sandbox 2.0 (2).jpg",
      "/sandbox/assets/Workshop sandbox 2.0 (3).jpg",
      "/sandbox/assets/Workshop sandbox 2.0 (4).jpg",
      "/sandbox/assets/Workshop sandbox 2.0 (5).jpg",
      "/sandbox/assets/Workshop sandbox 2.0 (6).jpg"
    ],
    extra: {
      type: 'bullets',
      items: [
        "Business planning, financial forecasting, pitch structuring",
        "Small group format, real feedback from industry professionals",
        "Covers common early-stage mistakes before you make them"
      ]
    }
  },
  {
    title: "Industry Exposure",
    description: "Pitch your ideas to a panel of real-world investors, CEOs, and business leaders who are looking for the next big idea.",
    images: [
      "/sandbox/assets/inv-01.jpg",
      "/sandbox/assets/inv-02.jpg",
      "/sandbox/assets/inv-03.jpg",
      "/sandbox/assets/inv-04.jpg",
      "/sandbox/assets/inv-05.jpg",
      "/sandbox/assets/inv-06.jpg"
    ],
    extra: {
      type: 'bullets',
      items: [
        "Pitch directly to real-world investors and CEOs",
        "Receive unfiltered feedback on your model and delivery",
        "Get noticed for funding or follow-up conversations"
      ]
    }
  },
  {
    title: "Pitching Mastery",
    description: "Develop the confidence and public speaking skills necessary to command a room and sell your vision.",
    images: [
      "/sandbox/assets/replace 1.jpg",
      "/sandbox/assets/p2.jpg",
      "/sandbox/assets/replace 3.jpg",
      "/sandbox/assets/replace 4.jpg",
      "/sandbox/assets/replace 5.jpg",
      "/sandbox/assets/replace 2.jpg"
    ],
    extra: {
      type: 'bullets',
      items: [
        "Confidence",
        "Pitching",
        "Time Management"
      ]
    }
  }
];

export default function CoreSupport() {
  return (
    <section className="pt-0 pb-0 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          {CORE_SUPPORT_DATA.map((item, idx) => (
            <ScrollReveal key={item.title} direction={idx % 2 === 0 ? 'left' : 'right'}>
            <div
              className={`flex flex-col ${
                idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
              } items-center gap-10 md:gap-16 py-12 border-b border-white/5 last:border-b-0`}
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
