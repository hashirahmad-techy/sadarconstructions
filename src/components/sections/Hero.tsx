import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { site } from "@/data/site";
import { projectImages } from "@/data/projects";
import { ActionLink } from "../ActionLink";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-charcoal">
      <motion.img
        src={projectImages.heroResidence}
        alt="Neoclassical ivory stone residence with arched openings at dusk"
        className="absolute inset-0 size-full object-cover"
        initial={reduce ? { scale: 1 } : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deepcharcoal/90 via-charcoal/45 to-charcoal/55" />

      <div className="shell relative z-10 pb-16 pt-32 md:pb-24">
        <motion.p
          className="label-micro text-ivory/70"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {site.tagline}
        </motion.p>

        <motion.h1
          className="display-xl mt-6 max-w-4xl text-ivory"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          Premium construction,
          <br />
          thoughtful architecture.
        </motion.h1>

        <motion.p
          className="mt-8 max-w-lg text-base leading-relaxed text-ivory/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
        >
          {site.metaDescription}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
        >
          <ActionLink to="/projects" variant="solidLight">
            View Our Work
          </ActionLink>
          <ActionLink to="/contact" variant="onDark">
            Start a Project
          </ActionLink>
        </motion.div>

        <div className="mt-16 flex items-center gap-4 text-ivory/50">
          <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
          <span className="label-micro">Scroll</span>
          <span className="hairline max-w-24 bg-ivory/25" />
        </div>
      </div>
    </section>
  );
}
