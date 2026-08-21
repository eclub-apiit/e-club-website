import { useState, useEffect, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Fisher–Yates sample: pick `n` random items from an array (stable for one mount).
function sample(arr, n) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(0, Math.min(n, a.length))
}

export default function AboutEditionSlideshow({
  images = [],
  label = 'Sandbox',
  interval = 4000, // slide every 4 seconds
}) {
  // Use all provided images, filter out any placeholders if they exist
  const pics = useMemo(() => images.filter(img => img && !img.includes('placeholder-image.png')), [images])
  const [i, setI] = useState(0)

  useEffect(() => {
    // Reset index if it goes out of bounds when the images array changes
    if (i >= pics.length && pics.length > 0) {
      setI(0)
    }
  }, [pics.length, i])

  // Manual nav via the side arrows (wraps around).
  const go = (dir) => setI((prev) => (prev + dir + pics.length) % pics.length)

  useEffect(() => {
    if (pics.length <= 1) return

    const id = setInterval(() => {
      setI((prev) => (prev + 1) % pics.length)
    }, interval)
    return () => clearInterval(id)
  }, [pics.length, interval])

  if (pics.length === 0) {
    // Nothing imported yet — keep the layout from breaking (project placeholder rule).
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm text-white/40">
        {label} photos coming soon
      </div>
    )
  }

  // Use the safe index to render (in case the effect hasn't fired yet)
  const safeI = i >= pics.length ? 0 : i;

  return (
    <div
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40"
      role="group"
      aria-roledescription="carousel"
      aria-label={`${label} photo gallery`}
    >
      <div
        className="flex h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${safeI * 100}%)` }}
      >
        {pics.map((src, idx) => (
          <div key={idx} className="relative h-full w-full flex-shrink-0">
            <img
              src={typeof src === 'string' ? src : src?.src /* next/image static import shape */}
              alt={`${label} — photo ${idx + 1}`}
              loading={idx === 0 ? 'eager' : 'lazy'}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* subtle dark gradient so any caption/label stays legible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* side arrows — previous / next */}
      {pics.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-sm transition hover:bg-black/70 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-sm transition hover:bg-black/70 hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* progress dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {pics.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to photo ${idx + 1}`}
            className={
              'h-1.5 rounded-full transition-all ' +
              (idx === safeI ? 'w-5 bg-[#38BDF8]' : 'w-1.5 bg-white/40 hover:bg-white/70')
            }
          />
        ))}
      </div>
    </div>
  )
}
