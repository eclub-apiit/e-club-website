import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

export default function EventModal({ event, onClose }) {
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (!event) return;
    setPhotoIndex(0);
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [event, onClose]);

  if (!event) return null;

  const images =
    event.images && event.images.length > 0
      ? event.images
      : [event.coverImage || "/images/placeholder.jpg"];

  const handlePrev = (e) => {
    e?.stopPropagation();
    setPhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setPhotoIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Subtle dark backdrop */}
        <motion.div
          className="absolute inset-0 bg-[#07251c]/85 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Sheet */}
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          {/* Top Bar with Minimalist Close */}
          <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4 bg-white">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                {event.academicYear} Edition
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-[11px] font-medium text-teal-dark">
                {event.category}
              </span>
              {event.tag && (
                <>
                  <span className="text-stone-300">·</span>
                  <span className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-dark-green">
                    {event.tag}
                  </span>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-colors hover:bg-stone-200 hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Scrollable Story Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Photography Showcase */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-stone-900">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[photoIndex]}
                  src={images[photoIndex]}
                  alt={`${event.title} - photo ${photoIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full w-full object-contain sm:object-cover"
                />
              </AnimatePresence>

              {/* Multi-Photo Carousel Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous photo"
                    className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-transform hover:scale-105"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next photo"
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-transform hover:scale-105"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <div className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                    {photoIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail selector (if multiple) */}
            {images.length > 1 && (
              <div className="flex gap-2 border-b border-stone-100 bg-stone-50 px-6 py-2.5 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setPhotoIndex(idx)}
                    className={`h-12 w-20 shrink-0 overflow-hidden rounded border transition-all ${
                      idx === photoIndex
                        ? "border-dark-green ring-1 ring-dark-green"
                        : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Article Content */}
            <div className="px-6 py-8 sm:px-10">
              {/* Header Title */}
              <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {event.title}
              </h2>
              {event.subtitle && (
                <p className="mt-1.5 text-sm font-medium text-stone-500">
                  {event.subtitle}
                </p>
              )}

              {/* Natural Meta Byline */}
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-600 border-b border-stone-100 pb-4">
                <span className="flex items-center gap-1.5 font-medium">
                  <CalendarDays className="h-3.5 w-3.5 text-teal" />
                  {event.date}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-teal" />
                  {event.location}
                </span>
                {event.speaker && (
                  <>
                    <span>·</span>
                    <span className="font-semibold text-dark-green">
                      With {event.speaker}
                    </span>
                  </>
                )}
              </div>

              {/* Story Narrative */}
              <div className="mt-6 text-sm sm:text-base leading-relaxed text-stone-700 space-y-4 font-normal">
                <p>{event.description}</p>
              </div>

              {/* Footer */}
              <div className="mt-10 flex items-center justify-end border-t border-stone-100 pt-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg bg-dark-green px-6 py-2.5 text-xs font-semibold text-white transition-all hover:bg-teal-dark hover:shadow-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
