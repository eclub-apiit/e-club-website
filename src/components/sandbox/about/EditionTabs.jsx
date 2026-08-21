import { useState } from 'react';
import Lightbox from '../ui/Lightbox';
import ScrollReveal from '../ui/ScrollReveal';

// TODO: Replace with exact data
const EDITIONS_DATA = {
  "Sandbox 3.0": {
    year: "2025",
    description: "TODO: Description of Sandbox 3.0",
    photos: [
      "/sandbox/assets/placeholder.jpg",
      "/sandbox/assets/placeholder.jpg",
      "/sandbox/assets/placeholder.jpg"
    ]
  },
  "Sandbox 2.0": {
    year: "2024",
    description: "TODO: Description of Sandbox 2.0",
    photos: [
      "/sandbox/assets/placeholder.jpg"
    ]
  },
  "Sandbox 1.0": {
    year: "2023",
    description: "TODO: Description of Sandbox 1.0",
    photos: []
  }
};

export default function EditionTabs() {
  const [activeTab, setActiveTab] = useState("Sandbox 3.0");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const currentEdition = EDITIONS_DATA[activeTab];

  return (
    <section className="py-12 bg-slate-950 relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {Object.keys(EDITIONS_DATA).map((edition) => (
            <button
              key={edition}
              onClick={() => setActiveTab(edition)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === edition
                  ? 'bg-white text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-white/5'
              }`}
            >
              {edition}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <ScrollReveal key={activeTab}>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-6">
              {activeTab} <span className="text-[#a64d79]">({currentEdition.year})</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              {currentEdition.description}
            </p>
          </ScrollReveal>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentEdition.photos.map((src, idx) => (
            <ScrollReveal key={`${activeTab}-${idx}`} delay={idx * 100} direction="up">
              <div
                className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group bg-slate-900 border border-white/5 hover:border-white/20 transition-colors"
                onClick={() => setLightboxIndex(idx)}
              >
                <img
                  src={src}
                  alt={`${activeTab} memory ${idx + 1}`}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={currentEdition.photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
