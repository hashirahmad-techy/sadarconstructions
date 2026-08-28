import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { X, Instagram } from "lucide-react";
import { useEffect } from "react";
import { nav, site } from "@/data/site";
import { Logo } from "./Logo";
import { ActionLink } from "./ActionLink";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[100] bg-charcoal text-ivory"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-ivory/10 px-5 py-5">
              <Logo tone="light" onClick={onClose} />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="flex size-12 items-center justify-center border border-ivory/20 text-ivory transition-colors hover:bg-ivory hover:text-charcoal"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-5">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.06 * i + 0.1 }}
                    className="border-b border-ivory/10"
                  >
                    <Link
                      to={item.to}
                      onClick={onClose}
                      className="flex items-baseline gap-4 py-5"
                      activeProps={{ className: "opacity-100" }}
                    >
                      <span className="label-micro text-ivory/40">
                        0{i + 1}
                      </span>
                      <span className="font-display text-3xl">{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-4 px-5 pb-8">
              <ActionLink to="/contact" variant="solidLight" onClick={onClose}>
                Start a Project
              </ActionLink>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="label-micro flex items-center gap-3 text-ivory/70 transition-colors hover:text-ivory"
              >
                <Instagram className="size-4" aria-hidden="true" />
                {site.instagramHandle}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
