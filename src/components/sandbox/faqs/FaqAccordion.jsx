import React, { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import { ChevronDown } from 'lucide-react';

const FAQ_DATA = [
  {
    question: "What is this year's theme?",
    answer: "This year's theme is “A Better Tomorrow,” so the scope is limitless. Pitch any solution that makes life easier, improves your community, or makes the world a better place."
  },
  {
    question: "Who can participate in Sandbox?",
    answer: "Open to students of the O/Level and A/Level curriculam."
  },
  {
    question: "How many members can be in a team?",
    answer: "There must be 3 to 5 members per team."
  },
  {
    question: "How many teams can register from a single school?",
    answer: "1 school can register up to 5 teams."
  },
  {
    question: "Is there a registration fee?",
    answer: "No, Sandbox is completely free to enter."
  },
  {
    question: "What is the deadline for registration?",
    answer: "Registrations for this edition will close on October 30th. Ensure your team signs up before the deadline!"
  },
  {
    question: "Do we need a prototype to pitch?",
    answer: "Prototypes are optional for the Preliminary Round and Semifinals, and required for the Grand Finale."
  }
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="pt-32 pb-24 min-h-screen"
      style={{
        background:
          'radial-gradient(720px 620px at 12% 12%, rgba(122,61,104,0.42) 0%, rgba(122,61,104,0) 60%), radial-gradient(780px 680px at 88% 88%, rgba(168,113,150,0.30) 0%, rgba(168,113,150,0) 60%), linear-gradient(180deg, #2A1523 0%, #3c1c33 50%, #2A1523 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-coolvetica font-normal text-white tracking-normal mb-6">
              FREQUENTLY ASKED <span className="text-[#a64d79]">QUESTIONS</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about participating in Sri Lanka's largest inter-school pitching competition.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={idx} delay={idx * 50} direction="up">
                <div className={`border rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-md ${isOpen ? 'border-white/20 bg-white/10 shadow-lg' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}>
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between focus:outline-none rounded-2xl transition-all"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                  >
                    <span className="text-lg font-bold text-white text-left pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`}
                      size={24}
                    />
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
