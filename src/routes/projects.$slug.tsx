import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Gallery } from "@/components/Gallery";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { ActionLink } from "@/components/ActionLink";
import { CTASection } from "@/components/sections/CTASection";
import { getProject, relatedProjects } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project, related: relatedProjects(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project unavailable | Sadar Constructions" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    const description = project.description.slice(0, 155);
    return {
      meta: [
        { title: `${project.title} | Sadar Constructions` },
        { name: "description", content: description },
        { property: "og:title", content: `${project.title} | Sadar Constructions` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProjectDetail,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <div className="shell flex min-h-[70vh] flex-col items-start justify-center gap-6">
      <p className="label-micro text-muted-foreground">Not found</p>
      <h1 className="display-lg text-charcoal">This project doesn't exist</h1>
      <ActionLink to="/projects" variant="secondary">
        Back to projects
      </ActionLink>
    </div>
  );
}

function ProjectDetail() {
  const { project, related } = Route.useLoaderData();

  const meta = [
    { label: "Location", value: project.location },
    { label: "Year", value: project.year },
    { label: "Status", value: project.status },
    { label: "Area", value: project.area },
  ];

  return (
    <>
      <PageHero
        label={project.category}
        title={project.title}
        description={project.description}
        image={project.heroImage}
        imageAlt={project.title}
      />

      <section className="border-b border-border bg-ivory">
        <div className="shell grid grid-cols-2 gap-y-8 py-12 md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label} className="flex flex-col gap-2">
              <span className="label-micro text-muted-foreground">{m.label}</span>
              <span className="font-display text-2xl text-charcoal">{m.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y bg-warmwhite">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-10 lg:col-span-7">
            <Reveal className="flex flex-col gap-4">
              <h2 className="display-md text-charcoal">Design approach</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                {project.designApproach}
              </p>
            </Reveal>
            <Reveal className="flex flex-col gap-4">
              <h2 className="display-md text-charcoal">Construction approach</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                {project.constructionApproach}
              </p>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-5">
            <h2 className="label-micro text-muted-foreground">Key features</h2>
            <ul className="mt-6 flex flex-col border-t border-border">
              {project.features.map((f) => (
                <li key={f} className="border-b border-border py-4 text-sm text-charcoal">
                  {f}
                </li>
              ))}
            </ul>
            {project.isPlaceholder && (
              <p className="label-micro mt-8 text-bronze">
                Reference concept - not a completed project record
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-ivory">
        <div className="shell">
          <h2 className="display-lg text-charcoal">Gallery</h2>
          <div className="mt-10">
            <Gallery images={project.gallery} title={project.title} />
          </div>
        </div>
      </section>

      <section className="section-y bg-warmwhite">
        <div className="shell">
          <h2 className="display-lg text-charcoal">More projects</h2>
          <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Reveal key={p.slug}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
