import { whyUs } from "@/data/site";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

export function WhySadar() {
  return (
    <section className="section-y bg-charcoal text-ivory">
      <div className="shell">
        <SectionHeading
          label="Why Sadar"
          index="02"
          tone="light"
          title="Six principles behind every build"
          description="Our approach is consistent whether the project is a private residence or a commercial development."
        />

        <div className="mt-14 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => (
            <Reveal key={item.number} delay={(i % 3) * 0.08}>
              <div className="flex h-full flex-col gap-4 bg-charcoal p-8 transition-colors duration-500 hover:bg-deepcharcoal md:p-10">
                <span className="font-display text-3xl text-bronze">{item.number}</span>
                <h3 className="label-micro text-ivory">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ivory/60">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
