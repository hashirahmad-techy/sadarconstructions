import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { projectImages } from "@/data/projects";

const EASE = [0.22, 1, 0.36, 1] as const;

const services = [
  { label: "Residential", to: "/services" },
  { label: "Commercial", to: "/services" },
  { label: "Design & Build", to: "/services" },
  { label: "Renovation", to: "/services" },
] as const;

const cycleWords = ["inspire", "endure", "impress"];

/** Reveals each word by sliding it up from behind a mask. */
function RevealWords({
  text,
  delay = 0,
  reduce,
}: {
  text: string;
  delay?: number;
  reduce: boolean | null;
}) {
  return (
    <span className="block">
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.14em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%", rotate: 4 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.12, ease: EASE }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * Italic bronze word that swaps every few seconds.
 * All words share ONE grid cell, so the box is always as wide as the widest word
 * (nothing gets cut off) and the baseline matches the text next to it.
 */
function CycleWord({ reduce }: { reduce: boolean | null }) {
  const [i, setI] = useState(0);
  const n = cycleWords.length;

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % n), 2800);
    return () => window.clearInterval(id);
  }, [reduce, n]);

  return (
    <span
      aria-hidden="true"
      className="inline-grid pr-[0.12em] italic [clip-path:inset(-0.05em_-0.3em_-0.25em_-0.3em)]"
    >
      {cycleWords.map((w, idx) => {
        const state = idx === i ? "active" : idx === (i - 1 + n) % n ? "prev" : "next";
        return (
          <motion.span
            key={w}
            className="text-gradient-bronze animate-shimmer whitespace-nowrap [grid-area:1/1] motion-reduce:animate-none"
            initial={false}
            animate={{
              y: state === "active" ? "0%" : state === "prev" ? "-130%" : "130%",
              opacity: state === "active" ? 1 : 0,
            }}
            transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
          >
            {w}.
          </motion.span>
        );
      })}
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Parallax: image drifts slower than the page, content floats up and fades
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Hero is always a dark photo with light text, in both themes (fixed brand colours).
  // Phones: height follows the content (no big empty gap). md and up: full screen height.
  return (
    <section
      ref={ref}
      className="grain relative flex flex-col overflow-hidden bg-deepcharcoal md:min-h-svh md:justify-end"
    >
      <motion.img
        src={projectImages.heroResidence}
        alt="Neoclassical ivory stone residence with arched openings at dusk"
        className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover object-center"
        style={reduce ? undefined : { y: imageY }}
        initial={reduce ? { scale: 1 } : { scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.6, ease: EASE }}
        fetchPriority="high"
      />

      {/* Overlays: base tint, bottom fade for text, left fade, soft bronze glow */}
      <div className="absolute inset-0 bg-deepcharcoal/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-deepcharcoal via-deepcharcoal/65 to-deepcharcoal/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-deepcharcoal/70 via-deepcharcoal/20 to-transparent" />
      <div
        aria-hidden="true"
        className="glow-bronze pointer-events-none absolute -bottom-24 -left-24 size-[28rem] opacity-30"
      />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="
          shell relative z-10
          pb-10 pt-[5.5rem]
          sm:pb-12 sm:pt-28
          md:pb-14
          [@media(max-height:760px)]:md:pb-8
          [@media(max-height:760px)]:md:pt-20
        "
      >
        <div className="grid items-end gap-10 lg:grid-cols-12">
          {/* ── Left: message ── */}
          <div className="lg:col-span-8">
            {/* Tagline pill with live pulse dot */}
            <motion.div
              className="inline-flex max-w-full items-center gap-3 rounded-full border border-ivory/20 bg-ivory/5 px-4 py-2 backdrop-blur-md"
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            >
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-bronze/80 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-bronze" />
              </span>
              <span className="label-micro max-sm:!text-[10px] max-sm:!tracking-[0.12em] text-ivory/85">
                {site.tagline}
              </span>
            </motion.div>

            <h1
              className="
                mt-42 max-w-4xl font-display font-normal tracking-[-0.03em] text-ivory sm:mt-7
                text-[clamp(2.25rem,min(9.4vw,12svh),6rem)] leading-[1.02]
              "
            >
              <span className="sr-only">Built to last. Designed to inspire.</span>
              <span aria-hidden="true">
                <RevealWords text="Built to last." delay={0.35} reduce={reduce} />

                {/* Outer box is the static "mask"; the inner span slides up inside it.
                    The mask is taller at the bottom so letters like g, p, y are never cut. */}
                <span className="block [clip-path:inset(0_-1em_-0.3em_-1em)]">
                  <motion.span
                    className="block"
                    initial={reduce ? false : { y: "140%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
                  >
                    <span className="text-ivory/90">Designed to </span>
                    <CycleWord reduce={reduce} />
                  </motion.span>
                </span>
              </span>
            </h1>

            <motion.p
              className="mt-4 max-w-md text-[15px] font-light leading-relaxed text-ivory/75 sm:mt-6 sm:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
            >
              Homes and spaces crafted with precision,{" "}
              <span className="font-display italic text-ivory">
                from first sketch to final stone.
              </span>
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="mt-5 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.4, ease: EASE }}
            >
              {/* Primary: glowing bronze-to-ivory gradient pill, pulsing ring, arrow disc, light sweep */}
              <div className="relative w-full sm:w-auto">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-ping rounded-full bg-bronze/30 [animation-duration:2.8s] motion-reduce:animate-none"
                />
                <Link
                  to="/projects"
                  className="group relative flex h-14 items-center justify-between gap-6 overflow-hidden rounded-full bg-gradient-to-r from-bronze via-ivory to-bronze bg-[length:200%_100%] py-2 pl-7 pr-2 text-deepcharcoal shadow-[0_14px_44px_-10px_color-mix(in_oklch,var(--color-bronze)_85%,transparent)] transition-transform duration-300 animate-shimmer hover:scale-[1.03] motion-reduce:animate-none"
                >
                  <span className="label-micro relative z-10 !font-semibold">View Our Work</span>
                  <span className="relative z-10 grid size-10 place-items-center rounded-full bg-deepcharcoal text-ivory transition-colors duration-500 group-hover:bg-ivory group-hover:text-deepcharcoal">
                    <ArrowUpRight
                      className="size-4 transition-transform duration-500 group-hover:rotate-45"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
                  />
                </Link>
              </div>

              {/* Secondary: frosted glass pill with a bronze edge glow */}
              <Link
                to="/contact"
                className="label-micro group relative flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-ivory/40 bg-ivory/10 px-8 text-ivory backdrop-blur-md transition-all duration-300 hover:border-ivory hover:bg-ivory hover:text-charcoal sm:w-auto"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-bronze to-transparent"
                />
                <span className="!font-semibold">Start a Project</span>
                <span
                  aria-hidden="true"
                  className="block h-px w-6 bg-current transition-all duration-500 group-hover:w-10"
                />
              </Link>
            </motion.div>
          </div>

          {/* ── Right: glass "what we do" card (large screens, tall windows only) ── */}
          <motion.aside
            aria-label="Our services"
            className="hidden lg:col-span-4 lg:block [@media(max-height:760px)]:!hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6, ease: EASE }}
          >
            <div className="rounded-[26px] border border-ivory/15 bg-deepcharcoal/45 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 text-ivory/60">
                <span className="hairline w-6 shrink-0 bg-bronze" />
                <span className="label-micro">What we do</span>
              </div>
              <ul className="mt-3">
                {services.map((s, i) => (
                  <li key={s.label} className="border-t border-ivory/10 first:border-t-0">
                    <Link
                      to={s.to}
                      className="group flex items-center gap-4 py-3.5 text-ivory transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="font-display text-sm text-bronze">0{i + 1}</span>
                      <span className="flex-1 font-display text-xl">{s.label}</span>
                      <ArrowUpRight
                        className="size-4 text-ivory/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bronze"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </div>

        {/* Scroll cue: a line that drips downward (desktop, tall windows only) */}
        <motion.div
          className="mt-10 hidden items-center gap-4 text-ivory/50 md:flex [@media(max-height:760px)]:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <span className="relative block h-10 w-px overflow-hidden bg-ivory/20" aria-hidden="true">
            <motion.span
              className="absolute inset-x-0 top-0 block h-1/2 bg-bronze"
              animate={reduce ? undefined : { y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <span className="label-micro">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
