import { useMemo } from 'react'

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

function Logo({ s }) {
  // Names of 3+ words break onto 2 lines (first line gets the larger half).
  const words = s.name.trim().split(/\s+/);
  const twoLine = words.length >= 3;
  const splitAt = Math.ceil(words.length / 2);
  const line1 = words.slice(0, splitAt).join(' ');
  const line2 = words.slice(splitAt).join(' ');

  return (
    <div className="mx-3 flex shrink-0 items-center gap-[15px] rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[rgba(52,30,60,0.62)] backdrop-blur-[6px] pl-[12px] pr-[20px] py-[12px] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_30px_-22px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-[4px] hover:bg-[rgba(66,40,74,0.72)] hover:border-[rgba(255,255,255,0.16)]">
      {s.logo ? (
        <img
          src={typeof s.logo === 'string' ? s.logo : s.logo?.src}
          alt={s.name}
          className={`h-20 w-20 shrink-0 rounded-2xl object-contain ${
            s.box === 'white' ? `bg-white ${s.tight ? 'p-0.5' : 'p-2'}` : s.box === 'black' ? `bg-black ${s.tight ? 'p-0.5' : 'p-2'}` : ''
          }`}
        />
      ) : (
        <div className="h-20 w-20 shrink-0 rounded-2xl bg-white/10" />
      )}
      <span className="whitespace-nowrap text-[15px] font-semibold text-[#ffffff] leading-[1.2]">
        {twoLine ? (
          <>
            {line1}
            <br />
            {line2}
          </>
        ) : (
          s.name
        )}
      </span>
    </div>
  )
}

function Row({ items, reverse, duration }) {
  if (!items.length) return null
  // Repeat the row's logos until they comfortably exceed the viewport width, THEN
  // duplicate that whole track so the translateX(-50%) loop is seamless with no gap.
  const MIN_ITEMS = 12
  const filled = []
  while (filled.length < MIN_ITEMS) filled.push(...items)
  const doubled = [...filled, ...filled]
  // Scale the duration by how many times we repeated so the scroll speed stays constant.
  const scaledDuration = duration * (filled.length / items.length)
  return (
    <div className="group relative flex overflow-hidden">
      <div
        className="flex w-max animate-sbx-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animationDuration: `${scaledDuration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((s, i) => (
          <Logo key={i} s={s} />
        ))}
      </div>
    </div>
  )
}

export default function PastSponsorsMarquee({
  sponsors = [],
  perRow = 4,
  secondsPerItem = 7.2, // uniform scroll speed for every row (seconds per card-width)
}) {
  const rows = useMemo(() => chunk(sponsors, perRow), [sponsors, perRow])

  if (rows.length === 0) return null

  return (
    <section className="w-full py-12" aria-label="Past sponsors">
      {/* Scoped keyframes — no global CSS file, no new dependency. */}
      <style>{`
        @keyframes sbx-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-sbx-marquee {
          animation-name: sbx-marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>

      <div className="flex flex-col gap-4">
        {rows.map((items, r) => (
          <Row
            key={r}
            items={items}
            reverse={r % 2 === 1} /* row 0 → left-moving (normal), row 1 → right, alternating */
            duration={items.length * secondsPerItem}
          />
        ))}
      </div>
    </section>
  )
}
