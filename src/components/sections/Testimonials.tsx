import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Reveal } from "../Reveal";

const AUTOPLAY_MS = 5000;
const EASE = [0.22, 1, 0.36, 1] as const;

function initials(name: string) {
  return name
    .replace(/^(mr|mrs|ms|dr)\.?\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Dots with a loading fill: the active dot is a pill that fills up over AUTOPLAY_MS,
 * and when it is full the card changes. Hovering/focusing the carousel freezes the fill.
 * Progress lives in this component only, so just the dots re-render while it animates.
 */
function Dots({
  count,
  active,
  paused,
  autoplay,
  onSelect,
  onComplete,
}: {
  count: number;
  active: number;
  paused: boolean;
  autoplay: boolean;
  onSelect: (i: number) => void;
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);

  // restart the fill whenever the card changes
  useEffect(() => {
    setProgress(0);
  }, [active]);

  useEffect(() => {
    if (!autoplay || paused || count < 2) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setProgress((p) => Math.min(1, p + dt / AUTOPLAY_MS));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoplay, paused, count, active]);

  useEffect(() => {
    if (progress >= 1) onComplete();
  }, [progress, onComplete]);

  return (
    <div
      className="mt-5 flex items-center justify-center gap-2"
      role="tablist"
      aria-label="Choose testimonial"
    >
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Show testimonial ${i + 1} of ${count}`}
            onClick={() => onSelect(i)}
            className={`relative h-2 overflow-hidden rounded-full transition-all duration-500 ${
              isActive ? "w-12 bg-foreground/15" : "w-2 bg-foreground/20 hover:bg-foreground/40"
            }`}
          >
            {isActive && (
              <span
                className="absolute inset-y-0 left-0 block rounded-full bg-accent"
                // no autoplay (reduce motion) = solid pill, otherwise it fills with time
                style={{ width: autoplay ? `${progress * 100}%` : "100%" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export function Testimonials() {
  const reduce = useReducedMotion();
  const n = testimonials.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((a) => (a + 1) % n), [n]);
  const prev = useCallback(() => setActive((a) => (a - 1 + n) % n), [n]);

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  }

  return (
    <section className="relative overflow-hidden border-y border-border bg-card py-8 md:py-12 xl:py-14">
      <div
        aria-hidden="true"
        className="glow-bronze pointer-events-none absolute left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 opacity-20"
      />

      <div className="shell relative">
        <Reveal className="text-center">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <span className="hairline w-6 shrink-0 bg-accent" />
            <span className="label-micro">04 / Client voices</span>
            <span className="hairline w-6 shrink-0 bg-accent" />
          </div>
          <h2 className="mt-2 font-display text-2xl leading-tight text-foreground md:text-4xl">
            What clients{" "}
            <span className="text-gradient-bronze animate-shimmer">say</span>
          </h2>
        </Reveal>

        {/* Stage: the active card sits in the centre, neighbours peek in from the sides */}
        <motion.div
          className="relative mx-auto mt-6 h-[17.5rem] max-w-5xl touch-pan-y select-none overflow-hidden outline-none sm:h-[16.5rem] md:mt-8"
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onPanEnd={(_, info) => {
            if (info.offset.x < -50) next();
            else if (info.offset.x > 50) prev();
          }}
        >
          {testimonials.map((t, i) => {
            // shortest circular distance from the active card
            const d = (i - active + n) % n;
            const offset = d > n / 2 ? d - n : d;
            const abs = Math.abs(offset);
            const isActive = abs === 0;

            return (
              <motion.figure
                key={`${t.name}-${i}`}
                aria-hidden={!isActive}
                onClick={() => !isActive && abs === 1 && setActive(i)}
                className={`absolute inset-y-0 left-0 right-0 mx-auto flex w-[84%] flex-col justify-between gap-4 rounded-[28px] border bg-background p-6 sm:w-[28rem] md:p-7 ${
                  isActive
                    ? "border-accent/50 shadow-lift"
                    : "cursor-pointer border-border shadow-soft"
                }`}
                style={{ zIndex: 10 - abs, pointerEvents: abs > 1 ? "none" : "auto" }}
                initial={false}
                animate={{
                  x: `${offset * 106}%`,
                  scale: 1 - Math.min(abs, 3) * 0.1,
                  opacity: isActive ? 1 : abs === 1 ? 0.4 : 0,
                }}
                transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-6 place-items-center rounded-full bg-accent/15 text-accent">
                    <Quote className="size-4" aria-hidden="true" />
                  </span>
                  {t.isPlaceholder && (
                    <span className="label-micro rounded-full border border-border px-3 py-1 text-muted-foreground">
                      Sample
                    </span>
                  )}
                </div>

                <blockquote className="line-clamp-5 font-display text-[17px] leading-snug text-foreground md:text-xl">
                  “{t.quote}”
                </blockquote>

                <figcaption className="flex items-center gap-3">
                  <span className="label-micro grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    {initials(t.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="label-micro block truncate text-foreground">{t.name}</span>
                    <span className="label-micro mt-1 block truncate text-muted-foreground">
                      {t.project}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </motion.div>

        <Dots
          count={n}
          active={active}
          paused={paused}
          autoplay={!reduce}
          onSelect={setActive}
          onComplete={next}
        />
      </div>
    </section>
  );
}
