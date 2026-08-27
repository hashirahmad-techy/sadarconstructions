import { process } from "@/data/site";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

export function ProcessTimeline() {
  return (
    <section className="section-y bg-warmwhite">
      <div className="shell">
        <SectionHeading
          label="Process"
          index="03"
          title="From first conversation to final handover"
          description="A six-stage sequence that keeps design intent, budget and quality aligned."
        />

        <ol className="mt-14 border-t border-border">
          {process.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 0.05}>
              <div className="group grid items-baseline gap-4 border-b border-border py-8 transition-colors duration-500 hover:bg-ivory md:grid-cols-12 md:gap-8 md:py-10">
                <span className="label-micro text-bronze md:col-span-1">{step.number}</span>
                <h3 className="display-md text-charcoal md:col-span-4">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:col-span-7">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
