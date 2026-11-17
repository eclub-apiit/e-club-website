import { Suspense } from 'react';
import SandboxPastEditions from '../../components/sandbox/about/SandboxPastEditions';
import RocketField from '../../components/sandbox/ui/RocketField';

export default function EditionsPage() {
  return (
    <main className="relative isolate w-full min-h-screen">
      <RocketField sparse />
      <Suspense fallback={null}>
        <SandboxPastEditions />
      </Suspense>
    </main>
  );
}
