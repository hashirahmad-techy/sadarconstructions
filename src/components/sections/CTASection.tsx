import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { projectImages } from "@/data/projects";
import { whatsappHref } from "@/data/site";
import { Reveal } from "../Reveal";

const words = ["Residential", "Commercial", "Design & Build", "Renovation"];

export function CTASection() {
  const reduce = useReducedMotion();

  // Photo band: always dark with light text, in both themes (fixed brand colours).
  return (
    <section className="grain relative overflow-hidden bg-deepcharcoal text-ivory dark:border-t dark:border-ivory/10">
      <motion.img
        src={projectImages.detailColumn ?? projectImages.heroResidence}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-30"
        initial={reduce ? false : { scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-deepcharcoal via-deepcharcoal/70 to-deepcharcoal/40" />
      <div
        aria-hidden="true"
        className="glow-bronze pointer-events-none absolute -right-24 top-0 size-96 opacity-40"
      />

      <div className="shell relative z-10 py-10 md:py-14">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-ivory/70">
              <span className="hairline w-6 shrink-0 bg-bronze" />
              <span className="label-micro">Start a project</span>
            </div>
            <h2 className="mt-3 font-display text-3xl leading-[1.05] text-ivory md:text-5xl">
              Let&apos;s build something that{" "}
              <span className="text-gradient-bronze animate-shimmer">lasts.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/70 md:text-base">
              Share your site, drawings or a rough idea. We&apos;ll advise on feasibility and what
              it takes to build it properly.
            </p>
          </div>

          {/* Actions */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              to="/contact"
              className="label-micro group relative inline-flex items-center justify-center gap-3 rounded-full bg-ivory px-8 py-4 text-charcoal transition-transform duration-300 hover:scale-[1.03]"
            >
              {/* soft pulse ring to draw the eye */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 animate-ping rounded-full bg-ivory/30 motion-reduce:animate-none"
              />
              Get in touch
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="label-micro inline-flex items-center justify-center gap-2 rounded-full border border-ivory/40 px-7 py-4 text-ivory transition-colors duration-300 hover:bg-ivory hover:text-charcoal"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>

            {/* <Link
              to="/projects"
              className="label-micro link-underline hidden px-2 py-2 text-ivory/80 hover:text-ivory lg:inline-block"
            >
              Browse projects
            </Link> */}
          </div>
        </Reveal>
      </div>

      {/* Drifting word strip along the bottom */}
      <div
        aria-hidden="true"
        className="relative overflow-hidden border-t border-ivory/10 py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div className="flex w-max animate-marquee motion-reduce:animate-none [animation-duration:30s]">
          {[...words, ...words, ...words, ...words].map((w, i) => (
            <span
              key={`${w}-${i}`}
              className="label-micro flex items-center gap-6 pr-6 text-ivory/45"
            >
              {w}
              <span className="size-1 rounded-full bg-bronze" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
