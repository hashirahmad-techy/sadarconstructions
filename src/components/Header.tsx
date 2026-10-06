import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { nav } from "@/data/site";
import { Logo } from "./Logo";
import { ActionLink } from "./ActionLink";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // "light" = transparent header floating over the hero photo (always light text)
  // "dark"  = solid header on the page background (theme-aware text)
  const solid = scrolled || !overHero;
  const tone = solid ? "dark" : "light";

  return (
    <>
      <a
        href="#main"
        className="label-micro sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700",
          solid
            ? "border-b border-border bg-background/80 shadow-soft backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent",
        )}
      >
        <div className="shell flex items-center justify-between py-4 md:py-5">
          {/* Logo: over the hero it is always light. Otherwise swap with the theme using CSS only
              (no JS = no hydration flicker). */}
          {tone === "light" ? (
            <Logo tone="light" />
          ) : (
            <>
              <span className="dark:hidden">
                <Logo tone="dark" />
              </span>
              <span className="hidden dark:block">
                <Logo tone="light" />
              </span>
            </>
          )}

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "label-micro link-underline relative py-1 transition-colors duration-500",
                  tone === "light"
                    ? "text-ivory/80 hover:text-ivory"
                    : "text-foreground/70 hover:text-foreground",
                )}
                activeProps={{
                  className: cn(
                    "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full",
                    tone === "light"
                      ? "text-ivory after:bg-ivory"
                      : "text-foreground after:bg-accent",
                  ),
                }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <ActionLink
              to="/contact"
              variant={tone === "light" ? "onDark" : "primary"}
              className="hidden px-6 py-3 lg:inline-flex"
            >
              Start a Project
            </ActionLink>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className={cn(
                "flex size-10 items-center justify-center border transition-colors duration-500 lg:hidden",
                tone === "light"
                  ? "border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal"
                  : "border-foreground/25 text-foreground hover:bg-foreground hover:text-background",
              )}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Reading-progress line along the bottom edge of the header */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent"
            style={{ scaleX: scrollYProgress, opacity: solid ? 1 : 0 }}
          />
        )}
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
