import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero band used at the top of inner pages (Services, Projects, About, Contact...).
 * Always a dark photo band with light text, in both themes (fixed brand colours).
 */
export function PageHero({
  label,
  title,
  description,
  image,
  imageAlt = "",
}: {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="grain relative overflow-hidden bg-deepcharcoal">
      {image && (
        <>
          <motion.img
            src={image}
            alt={imageAlt}
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover opacity-50"
            initial={reduce ? false : { scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: EASE }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deepcharcoal via-deepcharcoal/60 to-deepcharcoal/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-deepcharcoal/70 via-transparent to-transparent" />
        </>
      )}
      <div
        aria-hidden="true"
        className="glow-bronze pointer-events-none absolute -bottom-24 -left-20 size-96 opacity-30"
      />

      <div className="shell relative z-10 pb-10 pt-28 md:pb-14 md:pt-36">
        <motion.div
          className="flex items-center gap-3 text-ivory/70"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <motion.span
            aria-hidden="true"
            className="block h-px w-8 origin-left bg-bronze"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          />
          <p className="label-micro">{label}</p>
        </motion.div>

        <motion.h1
          className="mt-4 max-w-4xl font-display text-[clamp(2.25rem,7vw,4.75rem)] font-normal leading-[1.05] tracking-[-0.03em] text-ivory"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            className="mt-5 max-w-xl text-[15px] font-light leading-relaxed text-ivory/75 md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.26, ease: EASE }}
          >
            {description}
          </motion.p>
        )}

        {/* thin line that draws under the intro */}
        <motion.span
          aria-hidden="true"
          className="mt-7 block h-px w-24 origin-left bg-gradient-to-r from-bronze to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        />
      </div>
    </section>
  );
}
