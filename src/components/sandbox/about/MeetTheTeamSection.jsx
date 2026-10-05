import { useState } from 'react'
import TeamFlipCard from './TeamFlipCard'
import { TEAM, CATEGORIES } from '../../../data/teamData'
import ScrollReveal from '../ui/ScrollReveal'

export default function MeetTheTeamSection() {
  const [active, setActive] = useState('all')

  const members = active === 'all'
    ? TEAM
    : TEAM.filter((m) =>
        Array.isArray(m.category) ? m.category.includes(active) : m.category === active
      )

  return (
    <section className="relative px-4 py-16 w-full overflow-hidden">

      {/* ---------- headline ---------- */}
      <ScrollReveal immediate>
      <header className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="mb-4 text-sm md:text-base uppercase tracking-[0.2em] text-[#14f2db]">
          The people behind Sandbox
        </p>
        <h1 className="font-coolvetica text-4xl font-normal leading-tight text-white md:text-5xl">
          Meet the team that makes
          <br />
          the <em className="italic text-[#a64d79]">magic</em> happen
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
          The student board organising Sri Lanka&rsquo;s flagship inter-school business
          pitching competition. Tap a card to see their background.
        </p>
      </header>
      </ScrollReveal>

      {/* ---------- filter tabs ---------- */}
      <ScrollReveal immediate>
      <nav
        aria-label="Filter team by department"
        className="relative z-10 mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2"
      >
        {CATEGORIES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActive(id)}
            aria-pressed={active === id}
            className={
              'rounded-full px-4 py-1.5 text-sm transition-colors ' +
              (active === id
                ? 'bg-white text-[#0d0d12]'
                : 'text-white/55 hover:bg-white/5 hover:text-white')
            }
          >
            {label}
          </button>
        ))}
      </nav>
      </ScrollReveal>

      {/* ---------- grid ---------- */}
      <ScrollReveal immediate>
      <div
        aria-label="Team members"
        className="relative z-10 mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4"
      >
        {members.map((m) => (
          <TeamFlipCard key={m.name + m.role} member={m} />
        ))}
      </div>
      </ScrollReveal>

      {members.length === 0 && (
        <p className="mt-16 text-center text-sm text-white/40">
          No members in this team yet.
        </p>
      )}
    </section>
  )
}
