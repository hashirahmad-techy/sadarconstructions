import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
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
          -right-32 -top-32
          size-64
          rounded-full
          bg-bronze/10
          blur-3xl
          md:-right-40 md:-top-40
          md:size-[30rem]
        "
      />

      {/* ─────────────── MAIN FOOTER ─────────────── */}
      <div className="shell relative py-8 sm:py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">

          {/* Brand */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Logo tone="light" size="lg" />

            <p className="label-micro mt-4 text-bronze">
              {site.tagline}
            </p>

            <p className="mt-3 max-w-md text-sm leading-6 text-ivory/50">
              {site.positioning}
            </p>

            {/* Contact */}
            <div className="mt-5 border-l border-bronze/40 pl-4">
              <p className="label-micro text-ivory/30">
                Enquiries
              </p>

              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                <a
                  href={`tel:${site.contact.phone}`}
                  className="
                    inline-flex items-center gap-2
                    text-xs text-ivory/60
                    transition-colors
                    hover:text-ivory
                  "
                >
                  <Phone className="size-3.5 text-bronze" />
                  {site.contact.phone}
                </a>

                <a
                  href={`mailto:${site.contact.email}`}
                  className="
                    inline-flex items-center gap-2
                    text-xs text-ivory/60
                    transition-colors
                    hover:text-ivory
                  "
                >
                  <Mail className="size-3.5 text-bronze" />
                  {site.contact.email}
                </a>
              </div>
            </div>
          </motion.div>

          {/* ───────────── MOBILE LINK COLUMNS ───────────── */}
          <div className="grid grid-cols-2 gap-8 md:contents">

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

              <ul className="mt-4 flex flex-col gap-2.5">
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

            {/* Expertise */}
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

              <ul className="mt-4 flex flex-col gap-2.5">
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

          </div>

          {/* Connect */}
          <div className="md:col-span-3">
            <h2 className="label-micro text-ivory/30">
              Connect
            </h2>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {/* Instagram */}
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  group flex
                  items-center justify-center
                  gap-2
                  rounded-full
                  border border-ivory/10
                  px-3 py-2.5
                  text-xs text-ivory/60
                  transition-all duration-300
                  hover:border-bronze
                  hover:bg-bronze
                  hover:text-charcoal
                "
              >
                <Instagram className="size-3.5" />
                <span className="hidden sm:inline">
                  Instagram
                </span>
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="
                  group flex
                  items-center justify-center
                  gap-2
                  rounded-full
                  border border-ivory/10
                  px-3 py-2.5
                  text-xs text-ivory/60
                  transition-all duration-300
                  hover:border-bronze
                  hover:bg-bronze
                  hover:text-charcoal
                "
              >
                <MessageCircle className="size-3.5" />
                <span className="hidden sm:inline">
                  WhatsApp
                </span>
              </a>

              {/* Email */}
              <Link
                to="/contact"
                aria-label="Email enquiry"
                className="
                  group flex
                  items-center justify-center
                  gap-2
                  rounded-full
                  border border-ivory/10
                  px-3 py-2.5
                  text-xs text-ivory/60
                  transition-all duration-300
                  hover:border-bronze
                  hover:bg-bronze
                  hover:text-charcoal
                "
              >
                <Mail className="size-3.5" />
                <span className="hidden sm:inline">
                  Email
                </span>
              </Link>
            </div>

            {/* Address */}
            <div className="mt-4 flex gap-2 text-xs leading-5 text-ivory/35">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-bronze" />
              <span>{site.contact.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────── BOTTOM BAR ─────────────── */}
      <div className="border-t border-ivory/10">
        <div
          className="
            shell flex flex-col
            gap-2.5
            py-4
            text-[10px]
            text-ivory/35
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:text-xs
            md:py-5
          "
        >
          <p>
            © 2026 Sadar Constructions. All rights reserved.
          </p>

          <div className="flex gap-5">
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
