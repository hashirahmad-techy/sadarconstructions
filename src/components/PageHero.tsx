import type { ReactNode } from "react";
import { motion } from "motion/react";

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
  return (
    <section className="relative overflow-hidden bg-charcoal">
      {image && (
        <>
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 size-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deepcharcoal/85 to-charcoal/50" />
        </>
      )}
      <div className="shell relative z-10 pb-16 pt-36 md:pb-24 md:pt-48">
        <motion.p
          className="label-micro text-ivory/60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {label}
        </motion.p>
        <motion.h1
          className="display-xl mt-6 max-w-4xl text-ivory"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            className="mt-8 max-w-xl text-base leading-relaxed text-ivory/70"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.24 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
