import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
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
  const muted = tone === "light" ? "text-ivory/60" : "text-muted-foreground";
  const strong = tone === "light" ? "text-ivory" : "text-charcoal";

  return (
    <Reveal className={cn("flex flex-col gap-6", align === "center" && "items-center", className)}>
      <div className={cn("flex items-center gap-4", muted)}>
        <span className={cn("hairline w-8 shrink-0", tone === "light" && "bg-ivory/30")} />
        <span className="label-micro">{label}</span>
        {index && <span className="label-micro opacity-60">/ {index}</span>}
      </div>
      <h2 className={cn("display-lg max-w-3xl", strong, align === "center" && "text-center")}>
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-xl text-base leading-relaxed",
            muted,
            align === "center" && "text-center",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
