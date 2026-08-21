import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';

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

export default function SponsorshipProposalBanner() {
  return (
    <section className="bg-[#2A1523] pb-12 pt-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="rounded-[2.5rem] border border-[rgba(183,155,221,0.28)] bg-[rgba(122,79,176,0.10)] backdrop-blur-sm p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left">

            <div className="flex-1">
              <h3 className="text-3xl md:text-4xl font-coolvetica font-normal text-white mb-3">
                Want to sponsor <span className="text-[#a64d79]">Sandbox</span>?
              </h3>
              <p className="text-lg text-[#C6B9E0] leading-relaxed">
                Put your brand in front of ~150 schools and Sri Lanka's next founders.
              </p>
            </div>

            <div className="w-full md:w-auto mt-4 md:mt-0">
              <button
                onClick={handleSponsorshipClick}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-full bg-[#a64d79]/15 backdrop-blur-md border border-[#a64d79]/50 text-white hover:bg-[#a64d79] hover:border-[#a64d79] hover:shadow-[0_0_20px_rgba(166,77,121,0.4)] transition-all focus:ring-2 focus:ring-[#a64d79]/50 focus:outline-none min-h-[44px] cursor-pointer"
              >
                View Sponsorship Proposal
              </button>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
