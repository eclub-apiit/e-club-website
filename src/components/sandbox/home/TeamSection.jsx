import React, { useState } from 'react';

const TEAMS = [
  {
    id: 1,
    name: "InnovateX",
    school: "Royal College",
    photo: "/sandbox/placeholder-image.png",
    members: ["Kamal Perera", "Nimal Fernando", "Sunil Silva"],
    ideaTitle: "Eco-Friendly Packaging Solutions",
    blurb: "A sustainable alternative to single-use plastics using biodegradable local materials to revolutionize the packaging industry in Sri Lanka."
  },
  {
    id: 2,
    name: "Future Builders",
    school: "Visakha Vidyalaya",
    photo: "/sandbox/placeholder-image.png",
    members: ["Ama Silva", "Samanthi Perera"],
    ideaTitle: "AI-Driven Study Buddy",
    blurb: "An intelligent platform that adapts to individual learning speeds, helping students prepare for exams more efficiently."
  },
  {
    id: 3,
    name: "TechTitans",
    school: "Gateway College",
    photo: "/sandbox/placeholder-image.png",
    members: ["Rahul Raj", "Zainab Ali", "Devin Jayasuriya", "Sarah Chen"],
    ideaTitle: "Smart Agri-Sensors",
    blurb: "Low-cost IoT soil monitors designed to help local farmers optimize water usage and increase crop yields organically."
  }
];

const TeamCard = ({ team }) => {
  const [spinning, setSpinning] = useState(false);

  const handleToggle = () => setSpinning(!spinning);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      className="group relative h-[450px] w-full cursor-pointer [perspective:1000px]"
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={spinning}
      aria-label={`View details for ${team.name}`}
    >
      <style>{`
        @keyframes flip-alternate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(180deg); }
        }
        .animate-flip-spin {
          animation: flip-alternate 3s ease-in-out infinite alternate;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-flip-spin {
            animation: none !important;
            transform: rotateY(180deg);
          }
        }
      `}</style>
      <div
        className={`w-full h-full relative [transform-style:preserve-3d] ${
          spinning ? 'animate-flip-spin' : 'transition-transform duration-500'
        }`}
      >
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[#3B1C32] rounded-3xl border-2 border-[#6A1E55] group-hover:border-[#A64D79] overflow-hidden flex flex-col transition-colors duration-300">
          <div className="relative h-2/3 w-full bg-[#1A1A1D]">
            {/* Fallback pattern if image is literally /placeholder-image.png and not present,
                but using standard img tags as requested. We'll use a generic div fallback to prevent broken UI if the image 404s. */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1D] to-[#3B1C32] flex items-center justify-center border-b border-[#6A1E55]">
               <span className="text-[#6A1E55] font-display font-bold opacity-50">IMAGE PLACEHOLDER</span>
            </div>
            {/* Using standard img for placeholder as required by prompt (use placeholder-image if unavailable) */}
            {team.photo && (
               <img
                 src={team.photo}
                 alt={team.name}
                 className="absolute inset-0 w-full h-full object-cover z-10"
                 onError={(e) => { e.currentTarget.style.display = 'none' }}
               />
            )}
          </div>
          <div className="p-6 flex flex-col justify-center flex-1 bg-gradient-to-t from-[#1A1A1D] to-[#3B1C32]">
            <h3 className="text-2xl font-display font-bold text-[#14F3DB] mb-1">
              {team.name}
            </h3>
            <p className="text-white font-sans text-sm tracking-wide">
              {team.school}
            </p>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1A1A1D] rounded-3xl border-2 border-[#14F3DB] overflow-hidden p-8 flex flex-col">
          <div className="mb-4">
            <h3 className="text-2xl font-display font-bold text-[#14F3DB] mb-2">
              {team.ideaTitle}
            </h3>
            <p className="text-slate-300 font-sans text-sm leading-relaxed">
              {team.blurb}
            </p>
          </div>

          <div className="mt-auto border-t border-[#6A1E55] pt-4">
            <p className="text-[#A64D79] text-xs font-bold tracking-widest uppercase mb-2">
              Team Members
            </p>
            <div className="flex flex-wrap gap-2">
              {team.members.map((member, idx) => (
                <span
                  key={idx}
                  className="bg-[#3B1C32] text-white text-xs px-2.5 py-1 rounded-md"
                >
                  {member}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TeamSection() {
  return (
    <section className="py-20 bg-[#3B1C32]">
      <div className="container max-w-6xl mx-auto px-4">

        <div className="text-center mb-16">
          <p className="text-[#14F3DB] font-medium tracking-widest uppercase mb-4 text-sm">
            Meet the Teams
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
            The Next Generation of Entrepreneurs
          </h2>
          <p className="text-slate-300 text-lg font-sans max-w-2xl mx-auto">
            Tap a card to discover the innovative ideas being pitched on the SANDBOX stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TEAMS.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>

      </div>
    </section>
  );
}
