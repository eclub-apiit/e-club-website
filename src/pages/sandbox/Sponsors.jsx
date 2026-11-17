import React from 'react';
import SponsorsList from '../../components/sandbox/sponsors/SponsorsList';
import PartnerUp from '../../components/sandbox/sponsors/PartnerUp';
import PastPartners from '../../components/sandbox/sponsors/PastPartners';
import RocketField from '../../components/sandbox/ui/RocketField';

export default function SponsorsPage() {
  return (
    <main className="relative isolate w-full bg-[linear-gradient(180deg,#2A1523_0%,#3c1c33_50%,#2A1523_100%)]">
      <RocketField />
      <div className="relative z-10">
        <SponsorsList />
        <PartnerUp />
        <PastPartners />
      </div>
    </main>
  );
}
