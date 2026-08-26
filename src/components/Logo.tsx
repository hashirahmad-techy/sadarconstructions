import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

/**
 * Text-based logo fallback. To use a real logo asset later, replace the inner
 * markup with an <img src={logo} alt={site.name} /> — nothing else changes.
 */
export function Logo({
  tone = "dark",
  size = "md",
  className,
}: {
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [first, second] = site.nameLines;

  return (
    <Link
      to="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "flex flex-col leading-[0.95] transition-colors duration-500",
        tone === "light" ? "text-ivory" : "text-charcoal",
        className,
      )}
    >
      <span
        className={cn(
          "font-display tracking-[0.18em]",
          size === "sm" && "text-sm",
          size === "md" && "text-base md:text-lg",
          size === "lg" && "text-2xl md:text-3xl",
        )}
      >
        {first}
      </span>
      <span
        className={cn(
          "label-micro opacity-70",
          size === "sm" && "text-[9px]",
          size === "lg" && "text-xs",
        )}
      >
        {second}
      </span>
    </Link>
  );
}
