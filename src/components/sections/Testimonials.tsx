import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

export function Testimonials() {
  return (
    <section className="section-y bg-ivory">
      <div className="shell">
        <SectionHeading
          label="Client voices"
          index="05"
          title="What clients say"
          description="Placeholder feedback shown while verified client testimonials are collected."
        />

        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.quote} delay={i * 0.08}>
              <figure className="flex h-full flex-col gap-6 bg-ivory p-8 md:p-10">
                <Quote className="size-6 text-bronze" aria-hidden="true" />
                <blockquote className="font-display text-xl leading-snug text-charcoal">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-auto">
                  <p className="label-micro text-charcoal">{t.name}</p>
                  <p className="label-micro mt-2 text-muted-foreground">{t.project}</p>
                  {t.isPlaceholder && (
                    <p className="label-micro mt-4 text-bronze">Placeholder</p>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
