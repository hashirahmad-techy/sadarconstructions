import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown } from "lucide-react";
import { site } from "@/data/site";
import { projectImages } from "@/data/projects";
import { ActionLink } from "../ActionLink";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Reveals each word by sliding it up from behind a mask. */
function RevealWords({
  text,
  delay = 0,
  className = "",
  reduce,
}: {
  text: string;
  delay?: number;
  className?: string;
  reduce: boolean | null;
}) {
  return (
    <span className={`block ${className}`}>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
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

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Subtle parallax: image drifts slower than the page while scrolling
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-deepcharcoal"
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

      {/* Dark theme overlays */}
      <div className="absolute inset-0 bg-deepcharcoal/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-deepcharcoal via-deepcharcoal/70 to-deepcharcoal/30" />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="
          shell relative z-10
          pb-8 pt-24
          sm:pb-12 sm:pt-28
          md:pb-16
          [@media(max-height:760px)]:pb-8
          [@media(max-height:760px)]:pt-20
        "
      >
        {/* Tagline pill with live pulse dot */}
        <motion.div
          className="inline-flex items-center gap-3 rounded-full border border-ivory/20 bg-ivory/5 px-4 py-2 backdrop-blur-md"
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-ivory/70" />
            <span className="relative inline-flex size-2 rounded-full bg-ivory" />
          </span>
          <span className="label-micro text-ivory/80">{site.tagline}</span>
        </motion.div>

        <h1
          className="
            display-xl mt-5 max-w-4xl text-ivory sm:mt-7
            !text-[clamp(2.5rem,min(10vw,11svh),5.5rem)] !leading-[1]
          "
        >
          <RevealWords text="Built to last." delay={0.35} reduce={reduce} />

          {/* Shimmering second line */}
          <motion.span
            className="block bg-gradient-to-r from-ivory via-ivory/40 to-ivory bg-[length:200%_100%] bg-clip-text text-transparent"
            animate={reduce ? undefined : { backgroundPosition: ["0% 0%", "200% 0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <RevealWords
              text="Designed to inspire."
              delay={0.75}
              reduce={reduce}
            />
          </motion.span>
        </h1>

        {/* Animated underline accent */}
        <motion.span
          className="mt-5 block h-px w-24 origin-left bg-ivory/60 sm:mt-7 sm:w-32"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.3, ease: EASE }}
        />

        <motion.p
          className="
            mt-4 max-w-md text-base leading-relaxed text-ivory/75
            sm:mt-6 sm:text-lg
          "
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
        >
          Homes and spaces crafted with precision, from first sketch to final
          stone.
        </motion.p>

        <motion.div
          className="
            mt-6 flex flex-col gap-3
            sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4
            [&>*]:w-full sm:[&>*]:w-auto
          "
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4, ease: EASE }}
        >
          <ActionLink to="/projects" variant="solidLight">
            View Our Work
          </ActionLink>
          <ActionLink to="/contact" variant="onDark">
            Start a Project
          </ActionLink>
        </motion.div>

        {/* Scroll hint: hidden on phones and short laptop windows */}
        <motion.div
          className="
            mt-12 hidden items-center gap-4 text-ivory/50
            md:flex
            [@media(max-height:760px)]:hidden
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
          <span className="label-micro">Scroll</span>
          <span className="hairline max-w-24 bg-ivory/25" />
        </motion.div>
      </motion.div>
    </section>
  );
}
