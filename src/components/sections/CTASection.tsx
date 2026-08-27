import { projectImages } from "@/data/projects";
import { ActionLink } from "../ActionLink";
import { Reveal } from "../Reveal";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-deepcharcoal">
      <img
        src={projectImages.detailColumn ?? projectImages.heroResidence}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-25"
      />
      <div className="shell relative z-10 section-y text-center">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-8">
          <span className="label-micro text-ivory/60">Start a project</span>
          <h2 className="display-lg text-ivory">
            Let's build something that lasts
          </h2>
          <p className="text-base leading-relaxed text-ivory/70">
            Share your site, drawings or a rough idea — we'll advise on feasibility, sequencing and
            what it takes to build it properly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <ActionLink to="/contact" variant="solidLight">
              Get in touch
            </ActionLink>
            <ActionLink to="/projects" variant="onDark">
              Browse projects
            </ActionLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
