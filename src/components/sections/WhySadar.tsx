import { motion } from "motion/react";
import { whyUs } from "@/data/site";
import { Reveal } from "../Reveal";

export function WhySadar() {
  // Always a dark band in both themes: uses fixed brand tones.
  return (
    <section className="grain relative overflow-hidden bg-charcoal py-12 text-ivory md:py-16 dark:border-y dark:border-ivory/10">
      <div
        aria-hidden="true"
        className="glow-bronze pointer-events-none absolute -right-32 -top-20 size-80 opacity-30"
      />

      <div className="shell relative">
        {/* Heading and intro on one row to save height */}
        <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <div className="flex items-center gap-3 text-ivory/60">
              <span className="hairline w-6 shrink-0 bg-bronze" />
              <span className="label-micro">02 / Why Sadar</span>
            </div>
            <h2 className="mt-3 font-display text-2xl leading-tight text-ivory md:text-4xl">
              Six promises{" "}
              <span className="text-gradient-bronze animate-shimmer">we build by.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ivory/65">
            Same standards on a private home or a commercial block. No exceptions.
          </p>
        </Reveal>

        {/* Compact 3 x 2 grid */}
        <div className="mt-8 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => (
            <motion.div
              key={item.number}
              className="group relative flex gap-4 overflow-hidden bg-charcoal p-5 transition-colors duration-500 hover:bg-deepcharcoal md:p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* bronze line sweeps along the top on hover */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-0 bg-bronze transition-[width] duration-700 group-hover:w-full"
              />
              <span className="font-display text-xl text-bronze transition-transform duration-500 group-hover:scale-110">
                {item.number}
              </span>
              <div className="min-w-0">
                <h3 className="label-micro text-ivory">{item.title}</h3>
                <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-ivory/60">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}