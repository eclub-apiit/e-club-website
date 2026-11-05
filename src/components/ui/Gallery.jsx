import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "../../lib/cn";
import Reveal from "./Reveal";

/** Even photo grid with lightweight previews and original photos in the lightbox. */
export default function Gallery({ images, className }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;
  const closeButton = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const trigger = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const keyboard = (event) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') setActiveIndex(i => (i + 1) % images.length);
      if (event.key === 'ArrowLeft') setActiveIndex(i => (i - 1 + images.length) % images.length);
      if (event.key === 'Tab') {
        const buttons = [...closeButton.current.closest('[role="dialog"]').querySelectorAll('button')];
        const first = buttons[0], last = buttons.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', keyboard);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', keyboard);
      trigger?.focus();
    };
  }, [isOpen, images.length]);

  const close = () => setActiveIndex(null);
  const step = (dir) => setActiveIndex((i) => (i + dir + images.length) % images.length);

  return (
    <>
      <div data-moments-grid className={cn("grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4", className)}>
        {images.map((img, i) => (
          <Reveal key={img.src} direction="up" delay={(i % 4) * 0.04} className="min-w-0">
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View photo: ${img.alt}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-dark-green/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
            >
              <img
                src={img.preview || img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async" width="960" height="720"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-dark-green/70 via-dark-green/0 to-dark-green/0 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="flex items-center gap-2 text-sm font-medium text-white">
                  <ZoomIn className="h-4 w-4" /> {img.alt}
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {createPortal(<AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog" aria-modal="true" aria-label="Life at APIIT E-Club photo gallery"
            className="fixed inset-0 z-100 flex items-center justify-center bg-dark-green/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              ref={closeButton}
              aria-label="Close gallery"
              onClick={close}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <motion.img
              key={images[activeIndex].src}
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />
            <button
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </>
  );
}
