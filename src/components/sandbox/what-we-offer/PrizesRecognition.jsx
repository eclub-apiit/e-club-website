import React from 'react';
import { Trophy } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

export default function PrizesRecognition() {
  return (
    <section id="prizes-recognition" className="pt-0 pb-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] px-6 py-16 md:px-16 ring-1 ring-white/5 shadow-[0_0_90px_rgba(178,60,150,0.08)]">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#4a0a44]/50 to-[#701A5A]/40" />
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-coolvetica font-normal text-white tracking-normal mb-6">
                  PRIZES & <span className="text-[#a64d79]">RECOGNITION</span>
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Compete for glory, school pride, and the resources to turn your idea into reality.
                </p>
              </div>
            </ScrollReveal>

            <div className="flex flex-col lg:flex-row items-stretch gap-6">
              {/* Hero card: Sandbox Shield */}
              <ScrollReveal direction="left" className="lg:w-1/2 h-full">
              <div className="group relative overflow-hidden bg-gradient-to-br from-[#3c1c33]/80 to-[#7A3D68]/60 border border-[#A87196]/40 px-2 py-6 md:p-6 rounded-3xl hover:border-[#A87196]/70 transition-colors flex flex-col items-center text-center shadow-[0_0_160px_rgba(168,113,150,0.55)] h-full">
                <div className="relative w-full flex-none md:flex-1 aspect-square md:aspect-auto min-h-0 md:min-h-[32rem] overflow-hidden rounded-2xl ring-1 ring-[#A87196]/40 mb-6 shadow-[0_0_90px_rgba(168,113,150,0.6)] bg-gradient-to-br from-[#3c1c33] to-[#7A3D68]">
                  <img
                    src="/sandbox/assets/shield_extended1.jpg.jpeg"
                    alt="Sandbox Shield"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Sandbox Shield
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  The ultimate honor, presented to the winning team to take back to their school.
                </p>
              </div>
              </ScrollReveal>

              {/* Right column: Cash Prizes + Special Awards + Certificates */}
              <div className="lg:w-1/2 flex flex-col gap-3">
                {/* Cash Prizes */}
                <ScrollReveal direction="right" delay={150}>
                <div className="bg-gradient-to-br from-[#4a0a44]/60 to-[#701A5A]/40 border border-[#b23c96]/30 p-6 rounded-2xl shadow-[0_12px_40px_rgba(178,60,150,0.22)] hover:border-[#b23c96]/60 transition-colors flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#4a0a44] flex items-center justify-center mb-3">
                    <Trophy className="w-7 h-7 text-[#a64d79]" />
                  </div>
                  <span className="text-[#a64d79] text-xs font-bold tracking-[0.2em] mb-2">GRAND CHAMPION</span>
                  <h3 className="text-3xl md:text-4xl font-black italic text-white tracking-tight mb-2">
                    CASH PRIZE
                  </h3>
                  <span className="text-slate-400 text-xs font-semibold tracking-[0.2em] mb-3">
                    WINNER TAKES ALL
                  </span>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Awarded to the winning team to help kickstart their business venture.
                  </p>
                </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Special Awards */}
                  <ScrollReveal direction="up" delay={300}>
                  <div className="group bg-gradient-to-br from-[#4a0a44]/60 to-[#701A5A]/40 border border-[#b23c96]/20 p-6 rounded-2xl shadow-[0_12px_40px_rgba(178,60,150,0.22)] hover:border-[#b23c96]/50 transition-colors flex flex-col text-center items-center h-full">
                    <div className="w-full overflow-hidden rounded-xl mb-4">
                      <img
                        src="/sandbox/assets/special award.jpg"
                        alt="Special Awards"
                        className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Special Awards</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Recognition for Best Presentation, Most Innovative Idea, and Best Sustainability Impact.
                    </p>
                  </div>
                  </ScrollReveal>

                  {/* Certificates */}
                  <ScrollReveal direction="up" delay={450}>
                  <div className="group bg-gradient-to-br from-[#4a0a44]/60 to-[#701A5A]/40 border border-[#b23c96]/20 p-6 rounded-2xl shadow-[0_12px_40px_rgba(178,60,150,0.22)] hover:border-[#b23c96]/50 transition-colors flex flex-col text-center items-center h-full">
                    <div className="w-full overflow-hidden rounded-xl mb-4">
                      <img
                        src="/sandbox/assets/Certiciate.jpg"
                        alt="Certificates"
                        className="w-full h-48 md:h-56 object-cover object-[62%_40%] scale-[1.3] transition-transform duration-500 group-hover:scale-[1.36]"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Certificates</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Every student who participates receives an official certificate of participation.
                    </p>
                  </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
