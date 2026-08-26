import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const actionVariants = cva(
  "group inline-flex items-center justify-center gap-3 label-micro rounded-none transition-all duration-500 disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-charcoal text-ivory px-7 py-4 hover:bg-deepcharcoal",
        secondary:
          "border border-charcoal/30 text-charcoal px-7 py-4 hover:border-charcoal hover:bg-charcoal hover:text-ivory",
        onDark:
          "border border-ivory/40 text-ivory px-7 py-4 hover:bg-ivory hover:text-charcoal hover:border-ivory",
        solidLight: "bg-ivory text-charcoal px-7 py-4 hover:bg-stone",
        quiet: "text-charcoal underline-offset-8 hover:underline p-0",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type Variants = VariantProps<typeof actionVariants>;

export function ActionLink({
  variant,
  className,
  ...props
}: ComponentProps<typeof Link> & Variants) {
  return <Link className={cn(actionVariants({ variant }), className)} {...props} />;
}

export function ActionAnchor({
  variant,
  className,
  ...props
}: ComponentProps<"a"> & Variants) {
  return <a className={cn(actionVariants({ variant }), className)} {...props} />;
}

export function ActionButton({
  variant,
  className,
  ...props
}: ComponentProps<"button"> & Variants) {
  return <button className={cn(actionVariants({ variant }), className)} {...props} />;
}
