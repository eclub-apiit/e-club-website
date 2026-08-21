import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';

export default function EditionsBanner() {
  return (
    <section className="pt-32 pb-16 bg-slate-950 text-center">
      <div className="container max-w-4xl mx-auto px-4">
        <ScrollReveal>
          <h1 className="text-5xl md:text-7xl font-black font-display text-white mb-6">Past Editions</h1>
          <p className="text-xl text-slate-300">Explore the history of Sandbox and the teams that paved the way.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
