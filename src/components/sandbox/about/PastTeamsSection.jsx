import { Linkedin } from '../../../components/ui/SocialIcons'
import { PAST_TEAMS } from '../../../data/teamData'

function PastMemberCard({ member }) {
  const { name, role, image, linkedin } = member
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#17171d]">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#17171d] to-transparent" />
      </div>
      <div className="px-4 pb-4 pt-1">
        <p className="font-['Space_Grotesk'] text-sm font-medium text-white md:text-base">{name}</p>
        <p className="text-xs text-white/55 md:text-sm">{role}</p>
        {linkedin ? (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#14f2db] transition-colors hover:text-white"
          >
            <Linkedin className="h-3.5 w-3.5" />
            LinkedIn
          </a>
        ) : (
          /* keeps card heights consistent while URL is missing */
          <span className="mt-2 block h-[18px]" aria-hidden="true" />
        )}
      </div>
    </div>
  )
}

export default function PastTeamsSection({ teams = PAST_TEAMS, hideHeader = false }) {
  return (
    <section aria-label="Past organising teams" className="mx-auto max-w-5xl px-0 py-8 sm:px-4 sm:py-16">
      {!hideHeader && (
        <header className="mb-10 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#14f2db]">Past editions</p>
          <h2 className="font-['Space_Grotesk'] text-3xl font-medium text-white md:text-4xl">
            Meet the teams
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/55">
            The boards that built Sandbox, edition by edition.
          </p>
        </header>
      )}

      <div className="space-y-14">
        {teams.map(({ edition, year, members }) => (
          <div key={edition}>
            {!hideHeader ? (
              <div className="mb-5 flex items-baseline gap-3">
                <h3 className="font-['Space_Grotesk'] text-xl font-medium text-white">{edition}</h3>
                <span className="rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-2.5 py-0.5 text-xs text-[#c4b5fd]">
                  {year}
                </span>
                <span className="ml-auto hidden h-px flex-1 bg-white/10 md:block" />
              </div>
            ) : (
              <div className="mb-6 flex items-center gap-3">
                <h3 className="font-display text-2xl font-bold text-white tracking-tight">The Team Behind {edition}</h3>
                <span className="ml-auto hidden h-px flex-1 bg-white/10 sm:block" />
              </div>
            )}

            {/* Optional sub-groups (e.g. Executive Board / Committee) via m.group.
                Members without a group render in one flat grid as before. */}
            {(() => {
              const KEEP = /president|chair/i;
              const leaders = members.filter((m) => KEEP.test(m.role));

              const groups = []
              leaders.forEach((m) => {
                const g = m.group || null
                const last = groups[groups.length - 1]
                if (last && last.label === g) last.items.push(m)
                else groups.push({ label: g, items: [m] })
              })
              return groups.map(({ label, items }, gi) => (
                <div key={label ?? gi} className={gi > 0 ? 'mt-10' : ''}>
                  {label && (
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                      {label}
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
                    {items.map((m) => (
                      <PastMemberCard key={m.name + m.role} member={m} />
                    ))}
                  </div>
                </div>
              ))
            })()}
          </div>
        ))}
      </div>
    </section>
  )
}
