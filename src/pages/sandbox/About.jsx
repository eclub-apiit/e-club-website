import React from 'react';
import AboutBanner from '../../components/sandbox/about/AboutBanner';
import OurHistory from '../../components/sandbox/about/OurHistory';
import OurGoals from '../../components/sandbox/about/OurGoals';

export default function AboutPage() {
  return (
    <main
      className="min-h-screen text-[#c4b5c9] font-sans selection:bg-[#7C3AED] selection:text-white"
      style={{
        background:
          'radial-gradient(720px 620px at 12% 12%, rgba(122,61,104,0.42) 0%, rgba(122,61,104,0) 60%), radial-gradient(780px 680px at 88% 88%, rgba(168,113,150,0.30) 0%, rgba(168,113,150,0) 60%), linear-gradient(180deg, #2A1523 0%, #3c1c33 50%, #2A1523 100%)',
      }}
    >
      <AboutBanner />
      <OurHistory />
      <OurGoals />
    </main>
  );
}
