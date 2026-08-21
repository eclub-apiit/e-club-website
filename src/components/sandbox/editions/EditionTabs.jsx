import { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import EditionGallery from './EditionGallery';

export default function EditionTabs() {
  const [activeTab, setActiveTab] = useState('3.0');

  const editions = [
    { id: '3.0', name: 'Sandbox 3.0', year: '2025' },
    { id: '2.0', name: 'Sandbox 2.0', year: '2024' },
    { id: '1.0', name: 'Sandbox 1.0', year: '2023' }
  ];

  return (
    <section className="py-12 bg-slate-950 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4">

        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {editions.map((edition) => (
              <button
                key={edition.id}
                onClick={() => setActiveTab(edition.id)}
                className={`px-6 py-2 md:px-8 md:py-3 text-sm md:text-base rounded-full font-bold transition-all duration-300 flex items-center ${
                  activeTab === edition.id
                    ? 'bg-[#38BDF8] text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {edition.name} <span className="font-normal opacity-70 ml-2">{edition.year}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Passing activeTab to Gallery to fetch/display respective images */}
        <EditionGallery edition={activeTab} />

      </div>
    </section>
  );
}
