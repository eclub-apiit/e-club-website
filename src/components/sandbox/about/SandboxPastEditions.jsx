import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Wrench, Users, Flag, Trophy, ChevronUp, ChevronDown, Camera } from "lucide-react";
import AboutEditionSlideshow from "../AboutEditionSlideshow";
import ScrollReveal from "../ui/ScrollReveal";
import TrackRecord from "../editions/TrackRecord";

// ─── Photo pools — all images now flat in public/sandbox/assets/ ─────────────────────
const PH = '/sandbox/assets/placeholder-image.png'; // fallback when no photos available

const PHOTOS = {
  '2.0': {
    workshop: [
      '/sandbox/assets/Workshop sandbox 2.0 (1).jpg',
      '/sandbox/assets/Workshop sandbox 2.0 (2).jpg',
      '/sandbox/assets/Workshop sandbox 2.0 (3).jpg',
      '/sandbox/assets/Workshop sandbox 2.0 (4).jpg',
      '/sandbox/assets/Workshop sandbox 2.0 (5).jpg',
      '/sandbox/assets/Workshop sandbox 2.0 (6).jpg',
      '/sandbox/assets/Workshop sandbox 2.0 (7).jpg',
    ],
    prelims: [
      '/sandbox/assets/Preliminary sandbox 2.0 (1).jpg',
      '/sandbox/assets/Preliminary sandbox 2.0 (2).jpg',
      '/sandbox/assets/Preliminary sandbox 2.0 (3).jpg',
      '/sandbox/assets/Preliminary sandbox 2.0 (4).jpg',
      '/sandbox/assets/Preliminary sandbox 2.0 (5).jpg',
      '/sandbox/assets/Preliminary sandbox 2.0 (6).jpg',
      '/sandbox/assets/Preliminary sandbox 2.0 (7).jpg',
    ],
    semis: [PH, PH, PH, PH, PH, PH, PH, PH], // No semi-final photos yet
    grandFinal: [
      '/sandbox/assets/Grand final sandbox 2.0 (1).jpg',
      '/sandbox/assets/Grand final sandbox 2.0 (2).jpg',
      '/sandbox/assets/Grand final sandbox 2.0 (3).jpg',
      '/sandbox/assets/Grand final sandbox 2.0 (4).jpg',
      '/sandbox/assets/Grand final sandbox 2.0 (5).jpg',
      '/sandbox/assets/Grand final sandbox 2.0 (6).jpg',
      '/sandbox/assets/Grand final sandbox 2.0 (7).jpg',
      '/sandbox/assets/Grand final sandbox 2.0 (8).jpg',
      '/sandbox/assets/Grand final sandbox 2.0 (9).jpg',
      '/sandbox/assets/Grand final sandbox 2.0 (10).jpg',
    ],
  },
  '1.0': {
    workshop: [
      '/sandbox/assets/Workshop sandbox 1.0 (7).jpg',
      '/sandbox/assets/Workshop sandbox 1.0 (8).jpg',
      '/sandbox/assets/Workshop sandbox 1.0 (10).jpg',
      '/sandbox/assets/Workshop sandbox 1.0 (12).jpg',
      '/sandbox/assets/Workshop sandbox 1.0 (13).jpg',
      '/sandbox/assets/Workshop sandbox 1.0 (17).jpg',
      '/sandbox/assets/Workshop sandbox 1.0 (19).jpg',
      '/sandbox/assets/Workshop sandbox 1.0 (20).jpg',
      '/sandbox/assets/Workshop sandbox 1.0 (21).jpg',
      '/sandbox/assets/Workshop sandbox 1.0 (22).jpg',
      '/sandbox/assets/Workshop sandbox 1.0 (23).jpg',
      '/sandbox/assets/Workshop sandbox 1.0 (24).jpg',
    ],
    prelims: [], // No preliminary photos
    semis:   [PH, PH, PH, PH, PH, PH, PH, PH], // No semifinals photos yet
    grandFinal: [
      '/sandbox/assets/Grand final sandbox 1.0 (1).jpg',
      '/sandbox/assets/Grand final sandbox 1.0 (2).jpg',
      '/sandbox/assets/Grand final sandbox 1.0 (3).jpg',
      '/sandbox/assets/Grand final sandbox 1.0 (4).jpg',
      '/sandbox/assets/Grand final sandbox 1.0 (5).jpg',
      '/sandbox/assets/Grand final sandbox 1.0 (6).jpg',
      '/sandbox/assets/Grand final sandbox 1.0 (7).jpg',
    ],
  },
};

const editions = {
  "2.0": {
    label: "Sandbox 2.0",
    year: "2025",
    stages: [
      { title: "Workshop",       icon: "Wrench", desc: "Hands-on sessions to sharpen ideas before the pitch.", photos: PHOTOS['2.0'].workshop },
      { title: "Preliminary Round",  icon: "Users",  desc: "The top 50 teams face off to determine who advances.", photos: PHOTOS['2.0'].prelims },
      { title: "Grand Finale",    icon: "Trophy", desc: "The ultimate showdown in front of industry judges.", photos: PHOTOS['2.0'].grandFinal },
    ],
  },
  "1.0": {
    label: "Sandbox 1.0",
    year: "2024",
    stages: [
      { title: "Workshop",           icon: "Wrench", desc: "The very first Sandbox workshop series.", photos: PHOTOS['1.0'].workshop },
      { title: "Grand Finale",             icon: "Trophy", desc: "The inaugural Grand Finale.", photos: PHOTOS['1.0'].grandFinal },
    ],
  },
};

const iconMap = {
  Wrench: Wrench,
  Users: Users,
  Flag: Flag,
  Trophy: Trophy,
};

function StagePhotoCarousel({ photos, stageTitle }) {
  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 mb-4">
      <AboutEditionSlideshow images={photos} label={stageTitle} />
    </div>
  );
}

function StageCard({ stage, isOpen, onToggle }) {
  const IconComponent = iconMap[stage.icon];

  return (
    <div className="relative pl-12 sm:pl-16">
      {/* Icon Node */}
      <div className={`absolute left-0 top-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full border bg-[#0A0A0F] flex items-center justify-center z-10 transition-colors duration-300 ${isOpen ? 'border-[#7C3AED] shadow-[0_0_15px_rgba(124,58,237,0.4)] text-[#a64d79]' : 'border-white/10 text-slate-500'}`}>
        <IconComponent size={16} />
      </div>

      {/* Card */}
      <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'bg-[#1E0F19] border-white/10 shadow-lg' : 'bg-[#1E0F19]/50 border-white/5 hover:bg-[#1E0F19]/80'}`}>
        <button
          onClick={onToggle}
          className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between text-left focus:outline-none"
        >
          <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-white' : 'text-slate-300'}`}>{stage.title}</span>
          {isOpen ? <ChevronUp className="text-slate-400 flex-shrink-0" size={20} /> : <ChevronDown className="text-slate-500 flex-shrink-0" size={20} />}
        </button>

        {/* Body */}
        <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-white/5">
              {/* 10-Photo Carousel */}
              <StagePhotoCarousel photos={stage.photos} stageTitle={stage.title} />

              {/* Stage description */}
              <p className="text-slate-400 text-sm">{stage.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SandboxPastEditions() {
  const [searchParams] = useSearchParams();
  const editionParam = searchParams.get("edition");

  const [activeEdition, setActiveEdition] = useState("2.0");
  const data = editions[activeEdition];

  const [openStageIdx, setOpenStageIdx] = useState(0);

  useEffect(() => {
    if (editionParam === "1.0" || editionParam === "2.0") {
      setActiveEdition(editionParam);
      setOpenStageIdx(0);
    }
  }, [editionParam]);

  const toggleStage = (idx) => {
    setOpenStageIdx(openStageIdx === idx ? -1 : idx);
  };

  return (
    <div
      className="min-h-screen text-white pt-36 pb-24 px-4 sm:px-6 font-sans"
      style={{
        background:
          'radial-gradient(720px 620px at 12% 12%, rgba(122,61,104,0.42) 0%, rgba(122,61,104,0) 60%), radial-gradient(780px 680px at 88% 88%, rgba(168,113,150,0.30) 0%, rgba(168,113,150,0) 60%), linear-gradient(180deg, #2A1523 0%, #3c1c33 50%, #2A1523 100%)',
      }}
    >
      <ScrollReveal immediate>
      <div className="mx-auto max-w-3xl">

        {/* A. Intro / hero block */}
        <div className="mb-14">
          <p className="text-[#a64d79] uppercase font-bold text-xs tracking-[0.2em] mb-4">Past Editions</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display text-white mb-6 tracking-tight">Where Sandbox has been.</h1>
          <p className="text-slate-400 leading-relaxed">
            Held every year in Colombo, Sandbox is Sri Lanka's first-ever inter-school business pitching competition, organised by the Entrepreneurship Club of APIIT in partnership with the Ministry of Education. It launched in 2024, open to government, private, and international schools alike. By its second edition in 2025, the competition had grown to 38 participating schools and 50 competing teams, with the strongest ideas advancing through a workshop and Preliminary Round to a live Grand Finale in front of a panel of industry judges.
          </p>
        </div>

        {/* B. Track Record section (replaces old edition toggle, header, winner & theme blocks) */}
        <TrackRecord
          activeEdition={activeEdition}
          onEditionChange={(id) => {
            setActiveEdition(id);
            setOpenStageIdx(0);
          }}
        />

        {/* F. Stage timeline (vertical accordion) */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-[15px] sm:left-[19px] top-6 bottom-6 w-px bg-white/10 z-0"></div>

          <div className="space-y-6">
            {data.stages.map((stage, idx) => (
              <StageCard
                key={idx}
                stage={stage}
                isOpen={openStageIdx === idx}
                onToggle={() => toggleStage(idx)}
              />
            ))}
          </div>
        </div>



      </div>
      </ScrollReveal>
    </div>
  );
}
