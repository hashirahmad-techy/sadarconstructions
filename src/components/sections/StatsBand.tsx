import { stats } from "@/data/site";
import { Reveal } from "../Reveal";

export function StatsBand() {
  return (
    <section className="border-y border-border bg-ivory">
      <div className="shell grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4 md:py-16">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="flex flex-col gap-2">
            <span className="font-display text-4xl text-charcoal md:text-5xl">
              {s.value}
              <span className="text-bronze">{s.suffix}</span>
            </span>
            <span className="label-micro text-muted-foreground">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
