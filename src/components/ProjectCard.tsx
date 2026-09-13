import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="group flex flex-col"
    >
      <div className="relative overflow-hidden bg-stone">
        <img
          src={project.heroImage}
          alt={project.title}
          loading="lazy"
          className="aspect-4/3 w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/20" />
        <span className="label-micro absolute left-4 top-4 bg-warmwhite/90 px-3 py-2 text-charcoal">
          {project.category}
        </span>
      </div>

      <div className="flex items-start justify-between gap-6 border-b border-border py-6">
        <div>
          <h3 className="display-md text-charcoal">{project.title}</h3>
          {/* <p className="label-micro mt-3 text-muted-foreground">
            {project.location} / {project.year}
          </p> */}
        </div>
        <ArrowUpRight
          className="mt-2 size-5 shrink-0 text-bronze transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
