import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import { nav, site, whatsappHref } from "@/data/site";
import { Logo } from "./Logo";

const explore = [
  { label: "Residential", to: "/services" },
  { label: "Commercial", to: "/services" },
  { label: "Design & Build", to: "/services" },
  { label: "Renovation", to: "/services" },
] as const;

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="shell grid gap-14 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo tone="light" size="lg" />
          <p className="label-micro mt-6 text-ivory/50">{site.tagline}</p>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-ivory/60">
            {site.positioning}
          </p>
        </div>

        <nav className="md:col-span-2" aria-labelledby="footer-company">
          <h2 id="footer-company" className="label-micro text-ivory/40">
            Company
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {nav.slice(1).map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="text-sm text-ivory/75 transition-colors hover:text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="md:col-span-2" aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="label-micro text-ivory/40">
            Explore
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {explore.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="text-sm text-ivory/75 transition-colors hover:text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="label-micro text-ivory/40">Connect</h2>
          <ul className="mt-6 flex flex-col gap-3">
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-ivory/75 transition-colors hover:text-ivory"
              >
                <Instagram className="size-4" aria-hidden="true" />
                Instagram
              </a>
            </li>
            <li>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-ivory/75 transition-colors hover:text-ivory"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp
              </a>
            </li>
            <li>
              <Link
                to="/contact"
                className="flex items-center gap-3 text-sm text-ivory/75 transition-colors hover:text-ivory"
              >
                <Mail className="size-4" aria-hidden="true" />
                Email enquiry
              </Link>
            </li>
          </ul>
          {/* PLACEHOLDER contact details — replace in src/data/site.ts */}
          <p className="mt-8 text-xs leading-relaxed text-ivory/40">
            {site.contact.phone}
            <br />
            {site.contact.email}
            <br />
            {site.contact.address}
          </p>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="shell flex flex-col gap-4 py-6 text-xs text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Sadar Constructions. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-ivory">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-ivory">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
