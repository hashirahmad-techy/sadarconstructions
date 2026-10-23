import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** "dark" = theme-aware text (use on normal page backgrounds).
   *  "light" = always-light text (use on sections that are dark in BOTH themes, e.g. over a photo). */
  tone?: "dark" | "light";
  className?: string;
  index?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
  index,
}: SectionHeadingProps) {
  const muted = tone === "light" ? "text-ivory/65" : "text-muted-foreground";
  const strong = tone === "light" ? "text-ivory" : "text-foreground";
  const center = align === "center";

  return (
    <Reveal className={cn("flex flex-col gap-3", center && "items-center", className)}>
      <div className={cn("flex items-center gap-3", muted)}>
        <span className="hairline w-6 shrink-0 bg-accent" />
        <span className="label-micro">
          {index ? `${index} / ` : ""}
          {label}
        </span>
        {center && <span className="hairline w-6 shrink-0 bg-accent" />}
      </div>

      <h2
        className={cn(
          "max-w-3xl font-display text-2xl leading-tight md:text-4xl",
          strong,
          center && "text-center",
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "max-w-xl text-sm leading-relaxed md:text-base",
            muted,
            center && "text-center",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
