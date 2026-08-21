import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "../../lib/cn";
import Reveal from "./Reveal";

/** Masonry gallery with hover-zoom tiles and a fullscreen lightbox. `images` = [{ src, alt, span? }] */
export default function Gallery({ images, className }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;

  const close = () => setActiveIndex(null);
  const step = (dir) => setActiveIndex((i) => (i + dir + images.length) % images.length);

  return (
    <>
      <div className={cn("columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5", className)}>
        {images.map((img, i) => (
          <Reveal key={img.src} direction="scale" delay={(i % 6) * 0.06} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn("group relative block w-full overflow-hidden rounded-2xl", img.span)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center bg-dark-green/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
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
      </AnimatePresence>
    </>
  );
}
