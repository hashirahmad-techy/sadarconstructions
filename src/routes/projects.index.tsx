import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { CTASection } from "@/components/sections/CTASection";
import { projects, projectCategories, projectImages } from "@/data/projects";
import { cn } from "@/lib/utils";
import { seo } from "@/lib/seo";

const EASE = [0.22, 1, 0.36, 1] as const;

export const Route = createFileRoute("/projects/")({
  head: () =>
    seo({
      title: "Our Projects | Sadar Constructions, Bhopal",
      description:
        "Explore residential, commercial, interior and renovation projects built by Sadar Constructions in Bhopal.",
      path: "/projects",
    }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("All");
  const list = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <PageHero
        label="Projects"
        title={
          <>
            Featured{" "}
            <span className="text-gradient-bronze animate-shimmer italic">projects</span>
          </>
        }
        description="Reference concepts across residential, commercial, interior and renovation work."
        image={projectImages.urbanResidence}
        imageAlt="Contemporary multi-level residence in charcoal stone"
      />

      <section className="relative overflow-hidden bg-background py-8 md:py-12 xl:py-14">
        <div
          aria-hidden="true"
          className="glow-bronze pointer-events-none absolute -right-28 top-0 size-80 opacity-20"
        />

        <div className="shell relative">
          {/* Filter chips: scroll sideways on phones, wrap on larger screens */}
          <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
            <div
              role="group"
              aria-label="Filter projects by category"
              className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {projectCategories.map((cat) => {
                const on = active === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActive(cat)}
                    aria-pressed={on}
                    className={cn(
                      "label-micro relative shrink-0 rounded-full border px-5 py-2.5 transition-colors duration-300",
                      on
                        ? "border-transparent text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                    )}
                  >
                    {/* sliding pill behind the active chip */}
                    {on && (
                      <motion.span
                        layoutId="project-filter-pill"
                        aria-hidden="true"
                        className="absolute inset-0 -z-0 rounded-full bg-primary"
                        transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>

            <p
              className="label-micro hidden shrink-0 text-muted-foreground tabular-nums sm:block"
              aria-live="polite"
            >
              <span className="text-foreground">{String(list.length).padStart(2, "0")}</span>{" "}
              {list.length === 1 ? "project" : "projects"}
            </p>
          </div>

          <motion.div
            layout={!reduce}
            className="mt-6 grid gap-x-6 gap-y-8 md:mt-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.05, ease: EASE }}
                >
                  <ProjectCard project={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {list.length === 0 && (
            <p className="py-16 text-center text-sm text-muted-foreground">
              No projects in this category yet.
            </p>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
