import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import { Eye, Target } from 'lucide-react';

export default function VisionMission() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-900/10 px-6 py-16 md:px-16 ring-1 ring-white/5 shadow-[0_0_90px_rgba(56,189,248,0.08)]">
        <div className="grid md:grid-cols-2 gap-12">
          <ScrollReveal direction="left">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-10 h-full">
              <Eye size={48} className="text-[#14f2db] mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-slate-400 leading-relaxed">
                To be the premier launchpad for student entrepreneurs in Sri Lanka, creating a generation of innovators ready to solve tomorrow's challenges.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-10 h-full">
              <Target size={48} className="text-[#a64d79] mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-slate-400 leading-relaxed">
                To equip students with the skills, mentorship, and resources needed to transform their creative ideas into viable, scalable business models through nationwide competition.
              </p>
            </div>
          </ScrollReveal>
        </div>
        </div>
      </div>
    </section>
  );
}
