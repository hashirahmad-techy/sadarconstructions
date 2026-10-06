import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { projects, projectImages } from "@/data/projects";

/**
 * Reads a project defensively, so the carousel works with whatever fields your
 * data/projects.ts has (title|name, category|type, image|cover|images[0], location, year).
 * If `image` is a key of projectImages (e.g. "urbanResidence") it is resolved automatically.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function readProject(p: any) {
  const raw: string | undefined =
    p.image ?? p.cover ?? p.thumbnail ?? p.heroImage ?? p.images?.[0];
  const image = raw ? ((projectImages as Record<string, string>)[raw] ?? raw) : undefined;
  return {
    slug: String(p.slug),
    title: (p.title ?? p.name ?? "Project") as string,
    category: (p.category ?? p.type) as string | undefined,
    location: p.location as string | undefined,
    year: p.year as string | number | undefined,
    summary: (p.summary ?? p.description ?? p.excerpt) as string | undefined,
    image,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectsSection({ limit = 6 }: { limit?: number }) {
  const list = projects.slice(0, limit).map(readProject);
  const reduce = useReducedMotion();

  const scroller = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setProgress(p);
    setActive(Math.round(p * (list.length - 1)));
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
  }, [list.length]);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  function go(dir: 1 | -1) {
    const el = scroller.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (!el || !card) return;
    el.scrollBy({
      left: dir * (card.offsetWidth + 16),
      behavior: reduce ? "auto" : "smooth",
    });
  }

  const ctrl =
    "grid size-10 place-items-center rounded-full border border-border text-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-30";

  return (
    <section className="relative overflow-hidden bg-background py-8 md:py-12 xl:py-14">
      <div
        aria-hidden="true"
        className="glow-bronze pointer-events-none absolute -right-28 top-0 size-80 opacity-25"
      />

      <div className="shell relative">
        {/* Heading + controls */}
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="hairline w-6 shrink-0 bg-accent" />
              <span className="label-micro">03 / Featured Projects</span>
            </div>
            <h2 className="mt-2 font-display text-2xl leading-tight text-foreground md:text-4xl">
              Spaces we&apos;ve{" "}
              <span className="text-gradient-bronze animate-shimmer">brought to life</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span
              className="label-micro hidden text-muted-foreground tabular-nums sm:block"
              aria-live="polite"
            >
              <span className="text-foreground">{pad(active + 1)}</span> / {pad(list.length)}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={atStart}
                aria-label="Previous projects"
                className={ctrl}
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={atEnd}
                aria-label="Next projects"
                className={ctrl}
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Carousel: bleeds to the screen edge, snaps card by card */}
      <div
        ref={scroller}
        onScroll={update}
        className="
          mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:mt-6
          px-5 md:px-10 xl:px-[max(4rem,calc((100vw-88rem)/2+4rem))]
          scroll-px-5 md:scroll-px-10 xl:scroll-px-16
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        "
        tabIndex={0}
        aria-label="Featured projects"
      >
        {list.map((p, i) => (
          <motion.div
            key={p.slug}
            data-card
            className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] xl:w-[27%]"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: Math.min(i, 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Photo cards are always dark with light text, in both themes (fixed brand colours) */}
            <Link
              to="/projects"
              className="group relative block h-[50svh] max-h-[440px] min-h-[320px] overflow-hidden bg-deepcharcoal"
              aria-label={`View project: ${p.title}`}
            >
              {p.image && (
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-deepcharcoal via-deepcharcoal/30 to-deepcharcoal/10 transition-opacity duration-500 group-hover:opacity-90" />

              {/* top row: category chip + number */}
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                {p.category ? (
                  <span className="label-micro rounded-full border border-ivory/25 bg-deepcharcoal/40 px-3 py-1.5 text-ivory backdrop-blur-md">
                    {p.category}
                  </span>
                ) : (
                  <span />
                )}
                <span className="font-display text-lg text-ivory/60">{pad(i + 1)}</span>
              </div>

              {/* bottom: title, meta, hover arrow */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-display text-xl leading-tight text-ivory md:text-2xl">
                      {p.title}
                    </h3>
                    {(p.location || p.year) && (
                      <p className="label-micro mt-1.5 text-ivory/65">
                        {[p.location, p.year].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ivory text-charcoal transition-all duration-500 group-hover:-rotate-12 group-hover:bg-bronze group-hover:text-deepcharcoal">
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </div>

                {p.summary && (
                  <p className="mt-3 line-clamp-2 hidden max-h-0 text-[13px] leading-relaxed text-ivory/75 opacity-0 transition-all duration-500 md:block md:group-hover:max-h-12 md:group-hover:opacity-100">
                    {p.summary}
                  </p>
                )}

                {/* bronze line that draws across on hover */}
                <span
                  aria-hidden="true"
                  className="mt-4 block h-px w-0 bg-bronze transition-[width] duration-700 group-hover:w-full"
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Progress bar + view all */}
      <div className="shell relative mt-4 flex items-center gap-6 md:mt-5">
        <div className="relative h-px flex-1 bg-border" aria-hidden="true">
          <span
            className="absolute inset-y-0 left-0 block h-0.5 -translate-y-px bg-accent transition-[width] duration-300"
            style={{ width: `${Math.max(progress * 100, 100 / Math.max(list.length, 1))}%` }}
          />
        </div>
        <Link
          to="/projects"
          className="label-micro group inline-flex shrink-0 items-center gap-2 text-foreground"
        >
          <span className="link-underline pb-0.5">View all projects</span>
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
