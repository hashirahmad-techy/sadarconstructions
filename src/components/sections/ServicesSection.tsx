import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { projectImages } from "@/data/projects";
import { Reveal } from "../Reveal";
import { ActionLink } from "../ActionLink";

export function ServicesSection({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Photo drifts slowly as the section scrolls past
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // Photo section: always dark with light text, in both themes (fixed brand colours).
  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-deepcharcoal py-8 text-ivory md:py-12 xl:py-14"
    >
      {/* Background photo: slow zoom-out on entry + parallax */}
      <motion.img
        src={projectImages.urbanResidence}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover"
        style={reduce ? undefined : { y }}
        initial={reduce ? false : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-deepcharcoal/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-deepcharcoal/80 via-transparent to-deepcharcoal/85" />
      <div
        aria-hidden="true"
        className="glow-bronze pointer-events-none absolute -right-24 top-0 size-80 opacity-40"
      />

      <div className="shell relative">
        <Reveal className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <div className="flex items-center gap-3 text-ivory/70">
              <motion.span
                aria-hidden="true"
                className="hairline block w-6 shrink-0 origin-left bg-bronze"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
              />
              <span className="label-micro">01 / Services</span>
            </div>
            <h2 className="mt-2 font-display text-2xl leading-tight text-ivory md:text-4xl">
              What we <span className="text-gradient-bronze animate-shimmer">build</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ivory/75">
            End-to-end construction, from first drawing to final handover.
          </p>
        </Reveal>

        {/* Frosted panel keeps text readable over the photo */}
        <div className="mt-5 grid border-x border-t border-ivory/15 bg-deepcharcoal/40 backdrop-blur-md md:mt-6 lg:grid-cols-2">
          {list.map((service, i) => (
            <Reveal key={service.number} delay={(i % 2) * 0.08 + Math.floor(i / 2) * 0.05}>
              <Link
                to="/services"
                className="group relative flex items-center gap-3 border-b border-ivory/15 px-4 py-3.5 transition-all duration-500 hover:bg-ivory/10 sm:gap-4 sm:px-5 sm:py-4 lg:[&:nth-child(odd)]:border-r"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 bg-bronze transition-all duration-500 group-hover:h-3/5"
                />

                <span className="label-micro w-5 shrink-0 text-ivory/50 transition-colors duration-300 group-hover:text-bronze">
                  {service.number}
                </span>

                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-ivory/25 text-bronze transition-all duration-500 group-hover:-rotate-6 group-hover:border-bronze group-hover:bg-bronze group-hover:text-deepcharcoal">
                  <service.icon className="size-4" aria-hidden="true" />
                </span>

                <span className="min-w-0 flex-1">
                  <h3 className="font-display text-lg leading-tight text-ivory sm:text-xl">
                    {service.title}
                  </h3>
                  <p className="mt-0.5 line-clamp-1 text-[13px] text-ivory/65">
                    {service.description}
                  </p>
                </span>

                <ArrowUpRight
                  className="size-4 shrink-0 text-ivory/50 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bronze"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          ))}
        </div>

        {limit && services.length > limit && (
          <Reveal className="mt-6 flex justify-center">
            <ActionLink to="/services" variant="onDark">
              View all services
            </ActionLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}