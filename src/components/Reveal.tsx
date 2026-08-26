import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  as?: "div" | "section" | "li" | "span";
}

/** Subtle fade-up on scroll entry. Respects prefers-reduced-motion. */
export function Reveal({ children, delay = 0, className, y = 24, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/** Clip-path image reveal for large architectural imagery. */
export function ImageReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { clipPath: "inset(0% 0 0 0)" } : { clipPath: "inset(14% 0 14% 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0% 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
