import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

export function ServicesSection({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <section className="section-y bg-warmwhite">
      <div className="shell">
        <SectionHeading
          label="Services"
          index="01"
          title="What we build"
          description="End-to-end construction and execution, from first drawing to final handover."
        />

        <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {list.map((service, i) => (
            <Reveal key={service.number} delay={(i % 3) * 0.08}>
              <Link
                to="/services"
                className="group flex h-full flex-col gap-6 bg-warmwhite p-8 transition-colors duration-500 hover:bg-ivory md:p-10"
              >
                <div className="flex items-start justify-between">
                  <service.icon className="size-6 text-bronze" aria-hidden="true" />
                  <span className="label-micro text-muted-foreground">{service.number}</span>
                </div>
                <h3 className="display-md text-charcoal">{service.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <span className="label-micro mt-auto flex items-center gap-2 text-charcoal">
                  Learn more
                  <ArrowUpRight
                    className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
