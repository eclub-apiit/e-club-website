import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../ui/ScrollReveal';

// URI-encoded path to the actual PDF
const SPONSORSHIP_PROPOSAL_PDF = "/sandbox/Sandbox%203.0%20Sponsorship%20Proposal.pdf";

function handleSponsorshipClick(e) {
  e.preventDefault();
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const link = document.createElement('a');
  link.href = SPONSORSHIP_PROPOSAL_PDF;
  if (isMobile) {
    // Auto-download on mobile
    link.download = 'Sandbox 3.0 Sponsorship Proposal.pdf';
  } else {
    // Preview in a new tab on desktop
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function PartnerUp() {
  return (
    <section id="become-a-partner" className="relative overflow-hidden pt-32 pb-20 bg-[linear-gradient(180deg,#2A1523_0%,#3c1c33_50%,#2A1523_100%)]">
      {/* Soft plum glows for depth — matches AboutSandbox */}
      <div className="absolute top-[12%] left-[8%] w-[400px] h-[400px] bg-[#7A3D68] rounded-full filter blur-[90px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[12%] right-[8%] w-[450px] h-[450px] bg-[#A87196] rounded-full filter blur-[90px] opacity-30 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="rounded-[2.5rem] border border-[rgba(183,155,221,0.28)] bg-[rgba(122,79,176,0.10)] backdrop-blur-sm px-6 py-16 md:px-16">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-coolvetica font-normal text-white mb-6">
            Partner With <span className="text-[#a64d79]">Sandbox</span>
          </h2>
          <p className="text-lg text-[#C6B9E0] mb-10 leading-relaxed">
            Gain unparalleled access to Sri Lanka's brightest young minds. Align your brand with youth empowerment, innovation, and entrepreneurship. Partnering with Sandbox connects you directly with the next generation of leaders from over 150 schools nationwide.
          </p>
          <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-4">
            {/* Secondary — outlined */}
            <button
              onClick={handleSponsorshipClick}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-transparent border border-white/40 hover:bg-white/10 text-white transition-all focus:ring-2 focus:ring-white/40 focus:outline-none min-h-[44px] cursor-pointer"
            >
              View Sponsorship Proposal
            </button>

            {/* Primary — main */}
            <Link
              to="/sandbox/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white transition-all focus:ring-2 focus:ring-white/50 focus:outline-none shadow-lg min-h-[44px]"
            >
              Become a Partner
            </Link>
          </div>
        </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
