import React from 'react';
import SandboxHero from '../../components/sandbox/home/SandboxHero';
import AboutSandbox from '../../components/sandbox/home/AboutSandbox';
import Guidelines from '../../components/sandbox/home/Guidelines';
import Timeline from '../../components/sandbox/home/Timeline';
import PhotoCollageBackground from '../../components/sandbox/home/PhotoCollageBackground';
import ProjectProposalBanner from '../../components/sandbox/home/ProjectProposalBanner';
import BackToEclub from '../../components/home/BackToEclub';

export default function Home() {
  return (
    <main className="w-full relative">
      <BackToEclub />
      <SandboxHero />
      <PhotoCollageBackground>
        <AboutSandbox />
        <Timeline />
        <Guidelines />
        <ProjectProposalBanner />
      </PhotoCollageBackground>
    </main>
  );
}
