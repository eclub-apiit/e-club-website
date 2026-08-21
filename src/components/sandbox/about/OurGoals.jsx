import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';

export default function OurGoals() {
  return (
    <section className="pt-4 pb-20 md:pt-20 md:pb-20">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="relative px-6 pt-6 pb-16 md:pt-6 md:pb-16 md:px-16 text-center">
          <div className="absolute inset-0 bg-[#a64d79]/10 blur-[80px] rounded-full z-0 pointer-events-none" />
          <div className="relative z-10">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-coolvetica font-normal text-white mb-8">Our Goals</h2>
              <p className="text-[#c4b5c9] text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
                We aim to foster a culture of innovation and critical thinking among school students across Sri Lanka. By providing a platform to pitch real business ideas, we bridge the gap between classroom learning and practical entrepreneurship.
              </p>
              <p className="text-[#c4b5c9] text-lg leading-relaxed max-w-3xl mx-auto">
                Our ultimate goal is to see student-led startups grow into successful enterprises that contribute to the national economy.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
