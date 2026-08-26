import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { nav } from "@/data/site";
import { Logo } from "./Logo";
import { ActionLink } from "./ActionLink";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !overHero;
  const tone = solid ? "dark" : "light";

  return (
    <>
      <a
        href="#main"
        className="label-micro sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-charcoal focus:px-4 focus:py-3 focus:text-ivory"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700",
          solid ? "border-b border-border bg-warmwhite/95 backdrop-blur-sm" : "border-b border-transparent",
        )}
      >
        <div className="shell flex items-center justify-between py-4 md:py-5">
          <Logo tone={tone} />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "label-micro relative py-1 transition-colors duration-500",
                  tone === "light" ? "text-ivory/80 hover:text-ivory" : "text-charcoal/70 hover:text-charcoal",
                )}
                activeProps={{
                  className: cn(
                    "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full",
                    tone === "light" ? "text-ivory after:bg-ivory" : "text-charcoal after:bg-bronze",
                  ),
                }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
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
                "flex size-12 items-center justify-center border transition-colors duration-500 lg:hidden",
                tone === "light"
                  ? "border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal"
                  : "border-charcoal/25 text-charcoal hover:bg-charcoal hover:text-ivory",
              )}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
