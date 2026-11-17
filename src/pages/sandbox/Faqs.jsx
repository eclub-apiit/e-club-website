import React from 'react';
import FaqAccordion from '../../components/sandbox/faqs/FaqAccordion';
import RocketField from '../../components/sandbox/ui/RocketField';

export default function FaqsPage() {
  return (
    <main className="relative isolate w-full">
      <RocketField sparse dropRight={2} topRocket />
      <FaqAccordion />
    </main>
  );
}
