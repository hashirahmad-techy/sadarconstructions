import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { stats } from "@/data/site";
import { Reveal } from "../Reveal";

/**
 * Counts up from 0 to the target when scrolled into view.
 * Non-numeric values render as-is.
 */
function CountUp({ value }: { value: string | number }) {
  const ref = useRef<HTMLSpanElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-30px",
  });

  const reduce = useReducedMotion();

  const raw = String(value);
  const target = Number(raw.replace(/,/g, ""));
  const isNumber = Number.isFinite(target);

  const [display, setDisplay] = useState(
    isNumber && !reduce ? 0 : target
  );

  useEffect(() => {
    if (!inView || !isNumber || reduce) {
      if (isNumber) setDisplay(target);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });

    return () => controls.stop();
  }, [inView, isNumber, reduce, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {isNumber ? display.toLocaleString("en-IN") : raw}
    </span>
  );
}

export function StatsBand() {
  return (
    <section
      className="
        relative overflow-hidden
        border-y border-border
        bg-card
      "
    >
      {/* Very subtle architectural grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          opacity-[0.025]
          [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />

      {/* Subtle bronze atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-32 top-1/2
          size-64
          -translate-y-1/2
          rounded-full
          bg-accent/10
          blur-[90px]
        "
      />

      <div className="shell relative py-9 sm:py-12 md:py-16">
        {/* Desktop intro / Mobile compact heading */}
        <Reveal>
          <div className="mb-7 flex items-end justify-between md:mb-12">
            <div>
              <span className="label-micro text-accent">
                By the numbers
              </span>

              <h2
                className="
                  mt-2
                  font-display
                  text-xl
                  tracking-tight
                  text-foreground
                  sm:text-2xl
                  md:text-3xl
                "
              >
                Built on experience.
              </h2>
            </div>

            {/* Hidden on mobile to save vertical space */}
            <p
              className="
                hidden
                max-w-xs
                text-right
                text-sm
                leading-6
                text-muted-foreground
                md:block
              "
            >
              Thoughtful design, quality construction,
              and lasting value.
            </p>
          </div>
        </Reveal>

        {/* Stats */}
        <div
          className="
            grid
            grid-cols-2
            border-t border-border
            md:grid-cols-4
          "
        >
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              className={`
                group
                relative
                py-6
                sm:py-7
                md:px-8
                md:py-8

                ${i % 2 !== 0 ? "border-l border-border" : ""}

                ${i >= 2 ? "border-t border-border" : ""}

                md:border-t-0
                md:first:pl-0
                md:last:pr-0

                md:[&:not(:first-child)]:border-l
              `}
            >
              {/* Index */}
              <div className="mb-4 flex items-center justify-between md:mb-6">
                <span
                  className="
                    font-mono
                    text-[9px]
                    tracking-[0.18em]
                    text-muted-foreground/45
                  "
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span
                  aria-hidden="true"
                  className="
                    size-1
                    rounded-full
                    bg-accent/60
                    transition-transform
                    duration-300
                    group-hover:scale-150
                  "
                />
              </div>

              {/* Number */}
              <div
                className="
                  font-display
                  text-[2.75rem]
                  leading-none
                  tracking-[-0.04em]
                  text-foreground
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  sm:text-5xl
                  md:text-6xl
                "
              >
                <CountUp value={s.value} />

                <span className="ml-0.5 text-accent">
                  {s.suffix}
                </span>
              </div>

              {/* Label */}
              <p
                className="
                  mt-3
                  max-w-[130px]
                  text-[10px]
                  font-medium
                  uppercase
                  leading-4
                  tracking-[0.1em]
                  text-muted-foreground
                  sm:text-xs
                  md:mt-4
                "
              >
                {s.label}
              </p>

              {/* Accent */}
              <div className="mt-4 flex items-center gap-1.5 md:mt-6">
                <span
                  aria-hidden="true"
                  className="
                    h-px w-4
                    bg-accent
                    transition-all
                    duration-300
                    group-hover:w-8
                  "
                />

                <span
                  aria-hidden="true"
                  className="
                    h-px w-2
                    bg-border
                  "
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
