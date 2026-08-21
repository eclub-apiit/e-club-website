import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../ui/ScrollReveal';
import AboutEditionSlideshow from '../AboutEditionSlideshow';

// ─── Sandbox 1.0 photos (Grand Final + Workshop) ────────────────────
const s1_imgs = [
  // Grand Final (7)
  '/sandbox/assets/Grand final sandbox 1.0 (1).jpg',
  '/sandbox/assets/Grand final sandbox 1.0 (2).jpg',
  '/sandbox/assets/Grand final sandbox 1.0 (3).jpg',
  '/sandbox/assets/Grand final sandbox 1.0 (4).jpg',
  '/sandbox/assets/Grand final sandbox 1.0 (5).jpg',
  '/sandbox/assets/Grand final sandbox 1.0 (6).jpg',
  '/sandbox/assets/Grand final sandbox 1.0 (7).jpg',
  // Workshop (7)
  '/sandbox/assets/Workshop sandbox 1.0 (7).jpg',
  '/sandbox/assets/Workshop sandbox 1.0 (8).jpg',
  '/sandbox/assets/Workshop sandbox 1.0 (10).jpg',
  '/sandbox/assets/Workshop sandbox 1.0 (12).jpg',
  '/sandbox/assets/Workshop sandbox 1.0 (13).jpg',
  '/sandbox/assets/Workshop sandbox 1.0 (17).jpg',
  '/sandbox/assets/Workshop sandbox 1.0 (19).jpg',
];

// ─── Sandbox 2.0 photos (Grand Final + Preliminaries) ─────────────
const s2_imgs = [
  // Grand Final (10)
  '/sandbox/assets/Grand final sandbox 2.0 (1).jpg',
  '/sandbox/assets/Grand final sandbox 2.0 (2).jpg',
  '/sandbox/assets/Grand final sandbox 2.0 (3).jpg',
  '/sandbox/assets/Grand final sandbox 2.0 (4).jpg',
  '/sandbox/assets/Grand final sandbox 2.0 (5).jpg',
  '/sandbox/assets/Grand final sandbox 2.0 (6).jpg',
  '/sandbox/assets/Grand final sandbox 2.0 (7).jpg',
  '/sandbox/assets/Grand final sandbox 2.0 (8).jpg',
  '/sandbox/assets/Grand final sandbox 2.0 (9).jpg',
  '/sandbox/assets/Grand final sandbox 2.0 (10).jpg',
  // Preliminaries (7)
  '/sandbox/assets/Preliminary sandbox 2.0 (1).jpg',
  '/sandbox/assets/Preliminary sandbox 2.0 (2).jpg',
  '/sandbox/assets/Preliminary sandbox 2.0 (3).jpg',
  '/sandbox/assets/Preliminary sandbox 2.0 (4).jpg',
  '/sandbox/assets/Preliminary sandbox 2.0 (5).jpg',
  '/sandbox/assets/Preliminary sandbox 2.0 (6).jpg',
  '/sandbox/assets/Preliminary sandbox 2.0 (7).jpg',
];

export default function OurHistory() {
  const history = [
    {
      edition: "Sandbox 2.0",
      editionParam: "2.0",
      desc: "The competition had grown to 38 participating schools and 50 competing teams under the theme of Community Concerns, with St. Joseph's College, Negombo crowned champions.",
      images: s2_imgs,
    },
    {
      edition: "Sandbox 1.0",
      editionParam: "1.0",
      desc: "The inaugural edition in 2024 that started it all, launching Sri Lanka's first inter-school business pitching competition under the theme of Sustainability.",
      images: s1_imgs,
    },
  ];

  return (
    <section className="pt-6 pb-8 md:pt-8 md:pb-8">
      <div className="container max-w-5xl mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-coolvetica font-normal text-white mb-8 md:mb-10 text-center">Our History</h2>
        </ScrollReveal>

        <div className="space-y-12">
          {history.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 150} direction={idx % 2 === 0 ? 'left' : 'right'}>
              <div className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                <div className="w-full md:w-1/2">
                  <AboutEditionSlideshow images={item.images} label={item.edition} />
                </div>
                <div className="w-full md:w-1/2 px-4">
                  <h3 className="text-2xl font-normal mb-4 font-coolvetica">
                    {item.editionParam ? (
                      <Link
                        to={`/sandbox/about/editions?edition=${item.editionParam}`}
                        className="text-white hover:text-[#14f2db] transition-colors underline-offset-4 hover:underline cursor-pointer"
                      >
                        {item.edition}
                      </Link>
                    ) : (
                      <span className="text-white">{item.edition}</span>
                    )}
                  </h3>
                  <p className="text-[#c4b5c9] text-lg leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
