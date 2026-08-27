import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => ((i ?? 0) + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => ((i ?? 0) - 1 + images.length) % images.length);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, images.length]);

  return (
    <>
      <div className="grid gap-2 sm:grid-cols-2">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Open image ${i + 1} of ${images.length} for ${title}`}
            className="group overflow-hidden bg-stone"
          >
            <img
              src={src}
              alt={`${title} — view ${i + 1}`}
              loading="lazy"
              className="aspect-4/3 w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} gallery`}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-deepcharcoal/96 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setIndex(null)}
              aria-label="Close gallery"
              className="absolute right-4 top-4 flex size-12 items-center justify-center border border-ivory/25 text-ivory transition-colors hover:bg-ivory hover:text-charcoal"
            >
              <X className="size-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setIndex((i) => ((i ?? 0) - 1 + images.length) % images.length)}
              aria-label="Previous image"
              className="absolute left-4 flex size-12 items-center justify-center border border-ivory/25 text-ivory transition-colors hover:bg-ivory hover:text-charcoal"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>

            <motion.img
              key={index}
              src={images[index]}
              alt={`${title} — view ${(index ?? 0) + 1}`}
              className="max-h-[82vh] max-w-[88vw] object-contain"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />

            <button
              type="button"
              onClick={() => setIndex((i) => ((i ?? 0) + 1) % images.length)}
              aria-label="Next image"
              className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center border border-ivory/25 text-ivory transition-colors hover:bg-ivory hover:text-charcoal"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>

            <span className="label-micro absolute bottom-6 text-ivory/60">
              {(index ?? 0) + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
