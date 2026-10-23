import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Reveal } from "../Reveal";

// Shuru ka ratio (width / height). Video vertical hai to 9 / 16 rakho, landscape ho to 16 / 9.
// Video load hone par ye apne aap asli ratio se badal jata hai.
const DEFAULT_RATIO = 9 / 16;

export function VideoSection() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ratio, setRatio] = useState(DEFAULT_RATIO);

  function start() {
    setPlaying(true);
    ref.current?.play();
  }

  return (
    <section className="relative overflow-hidden bg-background py-8 md:py-12 xl:py-14">
      <div
        aria-hidden="true"
        className="glow-bronze pointer-events-none absolute -left-28 top-10 size-80 opacity-20"
      />

      <div className="shell relative">
        <Reveal className="text-center">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <span className="hairline w-6 shrink-0 bg-accent" />
            <span className="label-micro">Watch</span>
            <span className="hairline w-6 shrink-0 bg-accent" />
          </div>
          <h2 className="mt-2 font-display text-2xl leading-tight text-foreground md:text-4xl">
            See how we{" "}
            <span className="text-gradient-bronze animate-shimmer italic">build</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-6 md:mt-8">
          {/* Box ki chaudai: screen ki 80% unchai se zyada lambi video nahi hogi,
              aur landscape video ho to max 56rem (max-w-4xl) tak phailegi. */}
          <div
            className="group relative mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-border bg-deepcharcoal shadow-lift"
            style={{
              aspectRatio: ratio,
              width: `min(100%, ${80 * ratio}svh)`,
            }}
          >
            <video
              ref={ref}
              src="/videos/sadar-intro.mp4"
              poster="/videos/sadar-intro-poster.jpg"
              preload="metadata"
              playsInline
              controls={playing}
              onLoadedMetadata={(e) => {
                const { videoWidth, videoHeight } = e.currentTarget;
                if (videoWidth && videoHeight) setRatio(videoWidth / videoHeight);
              }}
              onEnded={() => {
                setPlaying(false);
                if (ref.current) ref.current.currentTime = 0;
              }}
              className="size-full object-contain"
            />

            {!playing && (
              <button
                type="button"
                onClick={start}
                aria-label="Play video"
                className="absolute inset-0 grid place-items-center bg-deepcharcoal/35 transition-colors duration-300 hover:bg-deepcharcoal/20"
              >
                <span className="relative grid size-20 place-items-center rounded-full bg-ivory text-charcoal shadow-lift transition-transform duration-300 group-hover:scale-110 md:size-24">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 animate-ping rounded-full bg-ivory/40 motion-reduce:animate-none"
                  />
                  <Play
                    className="relative size-8 translate-x-0.5 fill-current"
                    aria-hidden="true"
                  />
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}