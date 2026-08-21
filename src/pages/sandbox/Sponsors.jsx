import React from 'react';
// import SponsorsList from '../../components/sandbox/sponsors/SponsorsList'; // hidden (kept for later)
import PartnerUp from '../../components/sandbox/sponsors/PartnerUp';
// import SponsorshipProposalBanner from '../../components/sandbox/sponsors/SponsorshipProposalBanner'; // hidden (kept for later)
import PastPartners from '../../components/sandbox/sponsors/PastPartners';

export default function SponsorsPage() {
  return (
    <main className="w-full">
      {/* <SponsorsList /> */}
      <PartnerUp />
      {/* <SponsorshipProposalBanner /> */}
      <PastPartners />
    </main>
  );
}
