import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { projects, projectCategories, projectImages } from "@/data/projects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects | Sadar Constructions Portfolio" },
      {
        name: "description",
        content:
          "Explore residential, commercial, interior and renovation project concepts by Sadar Constructions, filtered by category.",
      },
      { property: "og:title", content: "Projects | Sadar Constructions Portfolio" },
      {
        property: "og:description",
        content:
          "A portfolio of residential, commercial, interior and renovation work illustrating our design and execution language.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [active, setActive] = useState<string>("All");
  const list = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <PageHero
        label="Projects"
        title="Selected work"
        description="Reference concepts across residential, commercial, interior and renovation work."
        image={projectImages.urbanResidence}
        imageAlt="Contemporary multi-level residence in charcoal stone"
      />

      <section className="section-y bg-warmwhite">
        <div className="shell">
          <div className="flex flex-wrap gap-2 border-b border-border pb-8">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
                className={cn(
                  "label-micro border px-5 py-3 transition-colors duration-500",
                  active === cat
                    ? "border-charcoal bg-charcoal text-ivory"
                    : "border-border text-muted-foreground hover:border-charcoal hover:text-charcoal",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <Reveal key={p.slug}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>

          {list.length === 0 && (
            <p className="py-20 text-center text-sm text-muted-foreground">
              No projects in this category yet.
            </p>
          )}

          <p className="label-micro mt-16 text-muted-foreground">
            Note — imagery and project details shown are reference concepts, pending verified
            project data.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
