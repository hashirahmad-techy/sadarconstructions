import { motion, useReducedMotion } from "motion/react";
import { process } from "@/data/site";
import { Reveal } from "../Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProcessTimeline() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background py-8 md:py-12 xl:py-14">
      <div
        aria-hidden="true"
        className="glow-bronze pointer-events-none absolute -left-28 top-10 size-80 opacity-20"
      />

      <div className="shell relative">
        <Reveal className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="hairline w-6 shrink-0 bg-accent" />
              <span className="label-micro">04 / Process</span>
            </div>
            <h2 className="mt-2 font-display text-2xl leading-tight text-foreground md:text-4xl">
              From first conversation to{" "}
              <span className="text-gradient-bronze animate-shimmer">final handover</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Six stages that keep design, budget and quality aligned.
          </p>
        </Reveal>

        {/* 1 column on phones, 2 on tablets, 3 on desktop: two compact rows instead of a tall list */}
        <ol className="mt-6 grid gap-x-6 gap-y-6 sm:grid-cols-2 md:mt-8 lg:grid-cols-3 lg:gap-y-8">
          {process.map((step, i) => (
            <motion.li
              key={step.number}
              className="group relative border-t border-border pt-5"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}
            >
              {/* bronze bar that draws across the top when the step appears */}
              <motion.span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-full origin-left bg-accent"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1.1, delay: 0.15 + (i % 3) * 0.08, ease: EASE }}
              />

              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border font-display text-sm text-accent transition-all duration-500 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                  {step.number}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg leading-snug text-foreground md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
