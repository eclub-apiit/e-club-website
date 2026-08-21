import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';

export default function AboutBanner() {
  return (
    <section className="pt-32 pb-4 md:pb-6 text-center">
      <div className="container max-w-4xl mx-auto px-4">
        <ScrollReveal>
          <h1 className="text-5xl md:text-7xl font-coolvetica font-normal text-white mb-6">About <span className="text-[#a64d79] font-normal">Sandbox</span></h1>
          <p className="text-xl text-[#c4b5c9]">Empowering Sri Lanka's next generation of entrepreneurs since our inception.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
