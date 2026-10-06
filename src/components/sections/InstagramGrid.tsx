import { useReducedMotion } from "motion/react";
import { Instagram } from "lucide-react";
import { site } from "@/data/site";
import { projectImages } from "@/data/projects";
import { Reveal } from "../Reveal";

/**
 * Takes the images from data/projects.ts in order (skipping the floor plan drawing)
 * and keeps the first 18. The last ones (owner photos) are left out.
 */
const MAX_IMAGES = 18;

const tiles = Array.from(
  new Set(
    Object.entries(projectImages)
      .filter(([key]) => key !== "floorPlan")
      .map(([, src]) => src as string),
  ),
).slice(0, MAX_IMAGES);

// Two rows that drift in opposite directions
const half = Math.ceil(tiles.length / 2);
const rowA = tiles.slice(0, half);
const rowB = tiles.slice(half);

// Instagram brand gradient (brand colours, so not part of the site palette)
const igGradient =
  "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)";

const fade =
  "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]";

function Row({
  images,
  reverse,
  duration,
  still,
}: {
  images: string[];
  reverse?: boolean;
  duration: string;
  still: boolean;
}) {
  // Duplicate the list so the loop is seamless (the animation moves exactly half the width)
  const items = still ? images : [...images, ...images];

  return (
    <div className={`group/row ${still ? "overflow-x-auto" : `overflow-hidden ${fade}`}`}>
      <div
        className={`flex w-max gap-2 sm:gap-3 ${
          still
            ? ""
            : `animate-marquee hover:[animation-play-state:paused] ${
                reverse ? "[animation-direction:reverse]" : ""
              }`
        }`}
        style={still ? undefined : { animationDuration: duration }}
      >
        {items.map((src, i) => (
          <a
            key={`${src}-${i}`}
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Instagram"
            aria-hidden={!still && i >= images.length ? true : undefined}
            tabIndex={!still && i >= images.length ? -1 : undefined}
            className="group relative block size-36 shrink-0 overflow-hidden rounded-[18px] bg-muted sm:size-44 md:size-52"
          >
            <img
              src={src}
              alt={i < images.length ? `Sadar Constructions project photo ${i + 1}` : ""}
              loading="lazy"
              draggable={false}
              className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Photo overlay: always dark with a white icon, in both themes */}
            <span className="absolute inset-0 grid place-items-center bg-deepcharcoal/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Instagram className="size-6 text-white" aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function InstagramGrid() {
  const reduce = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background py-8 md:py-12 xl:py-14">
      <div
        aria-hidden="true"
        className="glow-bronze pointer-events-none absolute -left-28 top-1/2 size-80 -translate-y-1/2 opacity-20"
      />

      <div className="shell relative">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            {/* Instagram badge */}
            <span
              className="grid size-12 shrink-0 place-items-center rounded-2xl text-white shadow-soft"
              style={{ background: igGradient }}
              aria-hidden="true"
            >
              <Instagram className="size-6" />
            </span>
            <div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="hairline w-6 shrink-0 bg-accent" />
                <span className="label-micro">05 / Instagram</span>
              </div>
              <h2 className="mt-1 font-display text-2xl leading-tight text-foreground md:text-4xl">
                Our work, on your{" "}
                <span className="text-gradient-bronze animate-shimmer">feed</span>
              </h2>
            </div>
          </div>

          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="label-micro inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-white transition-transform duration-300 hover:scale-105 sm:w-auto"
            style={{ background: igGradient }}
          >
            <Instagram className="size-4" aria-hidden="true" />
            Follow {site.instagramHandle}
          </a>
        </Reveal>
      </div>

      {/* Two drifting rows; hover pauses the row you are on */}
      <div className="mt-6 flex flex-col gap-2 sm:gap-3 md:mt-8">
        <Row images={rowA} duration="55s" still={reduce} />
        <Row images={rowB} reverse duration="65s" still={reduce} />
      </div>
    </section>
  );
}
