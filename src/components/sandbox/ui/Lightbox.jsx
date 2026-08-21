import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ images, currentIndex, isOpen, onClose, onNext, onPrev }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md">
      <button onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white z-50">
        <X size={32} />
      </button>

      <button onClick={onPrev} className="absolute left-6 text-white/70 hover:text-white z-50">
        <ChevronLeft size={48} />
      </button>

      <div className="relative w-full max-w-5xl h-[80vh] px-16">
        {currentImage && (
          <img
            src={currentImage.src}
            alt={currentImage.alt || 'Gallery image'}
            className="absolute inset-0 h-full w-full object-contain"
          />
        )}
        {currentImage?.caption && (
          <div className="absolute bottom-4 left-0 right-0 text-center text-white/90 text-sm">
            {currentImage.caption}
          </div>
        )}
      </div>

      <button onClick={onNext} className="absolute right-6 text-white/70 hover:text-white z-50">
        <ChevronRight size={48} />
      </button>
    </div>
  );
}
