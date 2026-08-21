import { Suspense } from 'react';
import SandboxPastEditions from '../../components/sandbox/about/SandboxPastEditions';

export default function EditionsPage() {
  return (
    <main className="w-full">
      <Suspense fallback={null}>
        <SandboxPastEditions />
      </Suspense>
    </main>
  );
}
