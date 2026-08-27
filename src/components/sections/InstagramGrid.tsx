import { Instagram } from "lucide-react";
import { site } from "@/data/site";
import { projectImages } from "@/data/projects";
import { Reveal } from "../Reveal";

const tiles = [
  projectImages.heroResidence,
  projectImages.familyResidence,
  projectImages.interior,
  projectImages.urbanResidence,
  projectImages.commercial,
  projectImages.renovation,
];

export function InstagramGrid() {
  return (
    <section className="section-y bg-warmwhite">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="hairline w-8 shrink-0" />
              <span className="label-micro">Instagram</span>
            </div>
            <h2 className="display-lg text-charcoal">Latest from the site</h2>
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="label-micro flex items-center gap-3 border border-charcoal/30 px-6 py-4 text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
          >
            <Instagram className="size-4" aria-hidden="true" />
            {site.instagramHandle}
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          {tiles.map((src, i) => (
            <Reveal key={src} delay={(i % 6) * 0.05}>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden bg-stone"
              >
                <img
                  src={src}
                  alt="Sadar Constructions reference imagery"
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
