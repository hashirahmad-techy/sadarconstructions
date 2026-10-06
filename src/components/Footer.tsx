import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Instagram,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { nav, site, whatsappHref } from "@/data/site";
import { Logo } from "./Logo";

const explore = [
  { label: "Residential", to: "/services" },
  { label: "Commercial", to: "/services" },
  { label: "Design & Build", to: "/services" },
  { label: "Renovation", to: "/services" },
] as const;

const linkClass =
  "group inline-flex items-center gap-2 text-sm text-ivory/60 transition-all duration-300 hover:translate-x-1 hover:text-ivory";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-ivory">
      {/* Ambient bronze glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-40 -top-40
          size-[34rem]
          rounded-full
          bg-bronze/10
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-40 bottom-20
          size-[24rem]
          rounded-full
          bg-bronze/[0.04]
          blur-3xl
        "
      />

      {/* ───────────────── CTA ───────────────── */}
      {/* <section className="shell relative border-b border-ivory/10 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <motion.div
            className="md:col-span-8"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="label-micro mb-5 text-bronze">
              Start a conversation
            </p>

            <h2 className="display-lg max-w-4xl text-ivory">
              Let&apos;s build something{" "}
              <span className="text-gradient-bronze">
                worth coming home to.
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="md:col-span-4 md:flex md:justify-end"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              to="/contact"
              className="
                group inline-flex
                w-full items-center justify-between
                rounded-full
                bg-ivory
                px-6 py-4
                text-charcoal
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-bronze
                sm:w-auto
              "
            >
              <span className="label-micro">Start a Project</span>

              <span
                className="
                  ml-8 grid size-9 place-items-center
                  rounded-full
                  bg-charcoal
                  text-ivory
                  transition-transform duration-300
                  group-hover:rotate-45
                "
              >
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section> */}

      {/* ───────────────── MAIN FOOTER ───────────────── */}
      <div className="shell relative py-16 md:py-20">
        <div className="grid gap-14 md:grid-cols-12">
          {/* Brand */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Logo tone="light" size="lg" />

            <p className="label-micro mt-6 text-bronze">
              {site.tagline}
            </p>

            <p className="mt-5 max-w-md text-sm leading-7 text-ivory/55">
              {site.positioning}
            </p>

            {/* Contact mini card */}
            <div className="mt-8 max-w-md border-l border-bronze/40 pl-5">
              <p className="label-micro text-ivory/35">
                Enquiries
              </p>

              <a
                href={`tel:${site.contact.phone}`}
                className="
                  mt-2 flex items-center gap-3
                  text-sm text-ivory/70
                  transition-colors
                  hover:text-ivory
                "
              >
                <Phone className="size-4 text-bronze" />
                {site.contact.phone}
              </a>

              <a
                href={`mailto:${site.contact.email}`}
                className="
                  mt-2 flex items-center gap-3
                  text-sm text-ivory/70
                  transition-colors
                  hover:text-ivory
                "
              >
                <Mail className="size-4 text-bronze" />
                {site.contact.email}
              </a>
            </div>
          </motion.div>

          {/* Company */}
          <nav
            className="md:col-span-2"
            aria-labelledby="footer-company"
          >
            <h2
              id="footer-company"
              className="label-micro text-ivory/30"
            >
              Company
            </h2>

            <ul className="mt-6 flex flex-col gap-4">
              {nav.slice(1).map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={linkClass}>
                    <span
                      className="
                        h-px w-0 bg-bronze
                        transition-all duration-300
                        group-hover:w-3
                      "
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Explore */}
          <nav
            className="md:col-span-2"
            aria-labelledby="footer-explore"
          >
            <h2
              id="footer-explore"
              className="label-micro text-ivory/30"
            >
              Expertise
            </h2>

            <ul className="mt-6 flex flex-col gap-4">
              {explore.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={linkClass}>
                    <span
                      className="
                        h-px w-0 bg-bronze
                        transition-all duration-300
                        group-hover:w-3
                      "
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div className="md:col-span-3">
            <h2 className="label-micro text-ivory/30">
              Connect
            </h2>

            <div className="mt-6 space-y-3">
              {/* Instagram */}
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex items-center
                  justify-between
                  border-b border-ivory/10
                  pb-3
                  text-sm text-ivory/60
                  transition-colors
                  hover:text-ivory
                "
              >
                <span className="flex items-center gap-3">
                  <span
                    className="
                      grid size-9 place-items-center
                      rounded-full
                      border border-ivory/10
                      transition-all duration-300
                      group-hover:border-bronze
                      group-hover:bg-bronze
                      group-hover:text-charcoal
                    "
                  >
                    <Instagram className="size-4" />
                  </span>

                  Instagram
                </span>

                <ArrowUpRight
                  className="
                    size-4 opacity-0
                    transition-all duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:opacity-100
                  "
                />
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex items-center
                  justify-between
                  border-b border-ivory/10
                  pb-3
                  text-sm text-ivory/60
                  transition-colors
                  hover:text-ivory
                "
              >
                <span className="flex items-center gap-3">
                  <span
                    className="
                      grid size-9 place-items-center
                      rounded-full
                      border border-ivory/10
                      transition-all duration-300
                      group-hover:border-bronze
                      group-hover:bg-bronze
                      group-hover:text-charcoal
                    "
                  >
                    <MessageCircle className="size-4" />
                  </span>

                  WhatsApp
                </span>

                <ArrowUpRight
                  className="
                    size-4 opacity-0
                    transition-all duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:opacity-100
                  "
                />
              </a>

              {/* Email */}
              <Link
                to="/contact"
                className="
                  group flex items-center
                  justify-between
                  border-b border-ivory/10
                  pb-3
                  text-sm text-ivory/60
                  transition-colors
                  hover:text-ivory
                "
              >
                <span className="flex items-center gap-3">
                  <span
                    className="
                      grid size-9 place-items-center
                      rounded-full
                      border border-ivory/10
                      transition-all duration-300
                      group-hover:border-bronze
                      group-hover:bg-bronze
                      group-hover:text-charcoal
                    "
                  >
                    <Mail className="size-4" />
                  </span>

                  Email enquiry
                </span>

                <ArrowUpRight
                  className="
                    size-4 opacity-0
                    transition-all duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:opacity-100
                  "
                />
              </Link>
            </div>

            {/* Address */}
            <div className="mt-7 flex gap-3 text-xs leading-6 text-ivory/40">
              <MapPin className="mt-1 size-4 shrink-0 text-bronze" />
              <span>{site.contact.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────── WATERMARK ───────────────── */}
      <div className="relative overflow-hidden">
        <motion.p
          aria-hidden="true"
          className="
            pointer-events-none
            select-none
            whitespace-nowrap
            text-center
            font-display
            text-[clamp(5rem,24vw,19rem)]
            font-medium
            leading-[0.72]
            tracking-[-0.06em]
            text-ivory/[0.035]
          "
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          SADAR
        </motion.p>
      </div>

      {/* ───────────────── BOTTOM BAR ───────────────── */}
      <div className="relative border-t border-ivory/10">
        <div
          className="
            shell flex flex-col
            gap-4 py-6
            text-xs text-ivory/35
            md:flex-row md:items-center
            md:justify-between
          "
        >
          <p>
            © 2026 Sadar Constructions. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="transition-colors hover:text-ivory"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition-colors hover:text-ivory"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}