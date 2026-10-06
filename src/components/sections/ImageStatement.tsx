import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { projectImages } from "@/data/projects";
import { ImageReveal, Reveal } from "../Reveal";

export function ImageStatement() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Photo drifts slowly while scrolling past
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative">
      <ImageReveal className="relative h-[60vh] min-h-[380px] w-full overflow-hidden md:h-[78vh]">
        <motion.img
          src={projectImages.urbanResidence}
          alt="Contemporary charcoal stone residence with cantilevered balconies"
          loading="lazy"
          style={reduce ? undefined : { y }}
          className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover"
        />

        {/* Always dark: this text sits on a photo, so it uses fixed brand colours in both themes */}
        <div className="absolute inset-0 bg-deepcharcoal/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-deepcharcoal/70 via-transparent to-transparent" />

        <div className="shell absolute inset-0 flex items-center">
          <Reveal className="max-w-2xl">
            <div className="flex items-center gap-4">
              <motion.span
                aria-hidden="true"
                className="block h-px w-10 origin-left bg-bronze"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              />
              <p className="label-micro text-ivory/70">Design intent</p>
            </div>
            <p className="display-lg mt-6 text-ivory">
              We build what the drawing{" "}
              <span className="text-gradient-bronze animate-shimmer">promises.</span>
            </p>
            <p className="mt-5 max-w-md text-base text-ivory/70 md:text-lg">
              Proportion, material and light, held to the millimetre.
            </p>
          </Reveal>
        </div>
      </ImageReveal>
    </section>
  );
}

const checkpoints = [
  "Coordinated documentation",
  "Structural planning",
  "Material specification",
  "Site quality control",
];

export function PlanToReality() {
  return (
    <section className="section-y relative overflow-hidden bg-card">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <ImageReveal className="group relative">
          {/* offset frame behind the image */}
          <span
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 hidden size-full border border-accent/50 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2 md:block"
          />
          <div className="relative overflow-hidden">
            <img
              src={projectImages.floorPlan}
              alt="Architectural floor plan drawing with dimensions"
              loading="lazy"
              className="aspect-4/3 w-full object-cover transition-transform duration-1000 group-hover:scale-105 dark:brightness-90"
            />
            <span className="label-micro glass absolute bottom-4 left-4 px-4 py-2 text-foreground">
              Plan → Built
            </span>
          </div>
        </ImageReveal>

        <Reveal className="flex flex-col gap-6">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="hairline w-8 shrink-0 bg-accent" />
            <span className="label-micro">Plan to reality</span>
          </div>

          <h2 className="display-lg text-foreground">
            Drawn with care. <span className="text-gradient-bronze animate-shimmer">Built exactly.</span>
          </h2>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Layouts, levels and finishing details are resolved before the first pour, so what
            gets built is what was designed.
          </p>

          <ul className="mt-2 grid gap-px border border-border bg-border sm:grid-cols-2">
            {checkpoints.map((item, i) => (
              <li
                key={item}
                className="group flex items-center gap-4 bg-card p-5 transition-colors duration-300 hover:bg-surface-strong"
              >
                <span className="font-display text-sm text-accent">0{i + 1}</span>
                <span className="label-micro text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}