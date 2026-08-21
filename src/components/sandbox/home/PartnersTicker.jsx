// PartnersTicker.jsx
// Staggered cross-fade partners band: each slot fades + blurs + rises out, the next
// partner fades in, staggered slot-to-slot, cycling through more partners than fit at
// once. Timing is deliberately slow so every name is readable.
// Real logos aren't finalised yet, so each slot renders a wordmark by default; add
// `logo` to a partner to swap in an <img> from assets/ (import it, never hotlink).

import { useState, useEffect } from 'react'

// Sandbox's real backers / relevant bodies — the details already in the site.
const DEFAULT_PARTNERS = [
  { name: 'Ministry of Education' },
  { name: 'APIIT Sri Lanka' },
  { name: 'APIIT Entrepreneurship Club' },
  { name: 'Sri Lankan Schools' },
  { name: 'Inter-School Network' },
  { name: 'Colombo' },
  { name: 'Student Founders' },
]

const SLOTS = 4       // how many show at once (fewer on small screens via CSS)
const INTERVAL = 5200 // ms each name is held before it cross-fades — slow & readable
const FADE = 600      // ms fade/blur duration

function Slot({ partners, offset }) {
  const [i, setI] = useState(offset % partners.length)
  const [shown, setShown] = useState(true)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || partners.length <= SLOTS) return // hold still if motion is reduced

    let swap
    const id = setInterval(() => {
      setShown(false) // fade + blur out
      swap = setTimeout(() => {
        setI((prev) => (prev + SLOTS) % partners.length) // advance to the next partner
        setShown(true) // fade the next one in
      }, FADE)
    }, INTERVAL + offset * 400) // stagger each slot so they don't all flip together

    return () => {
      clearInterval(id)
      clearTimeout(swap)
    }
  }, [partners.length, offset])

  const p = partners[i]

  return (
    <div className="relative flex h-9 flex-1 items-center justify-center">
      <div
        className={
          'flex items-center justify-center transition-all duration-700 ease-out ' +
          (shown
            ? 'translate-y-0 opacity-100 blur-0'
            : 'translate-y-1.5 opacity-0 blur-[3px]')
        }
      >
        {p.logo ? (
          <img src={p.logo} alt={p.name} className="h-7 w-auto opacity-80 grayscale" />
        ) : (
          <span className="whitespace-nowrap text-lg font-[600] tracking-tight text-[#A64D79] md:text-xl">
            {p.name}
          </span>
        )}
      </div>
    </div>
  )
}

export default function PartnersTicker({
  partners = DEFAULT_PARTNERS,
  caption = 'Backed by & in partnership with',
}) {
  return (
    <section className="w-full py-10" aria-label="Partners">
      {/* <p className="mb-5 text-center text-sm text-white/50">{caption}</p> */}
      <div className="mx-auto flex max-w-3xl items-center gap-6 px-6">
        {Array.from({ length: SLOTS }).map((_, s) => (
          // hide the last slot on small screens so names never crowd
          <div key={s} className={'flex flex-1 ' + (s >= 3 ? 'hidden sm:flex' : '')}>
            <Slot partners={partners} offset={s} />
          </div>
        ))}
      </div>
    </section>
  )
}
