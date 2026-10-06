import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";
const KEY = "theme";

/**
 * Put this string in the <head> so the right theme is applied BEFORE first paint
 * (prevents the white flash on dark mode). Follows the visitor's system setting
 * until they press the toggle; after that their choice is remembered.
 *
 * In routes/__root.tsx:
 *   import { themeInitScript } from "@/components/ThemeToggle";
 *   head: () => ({ scripts: [{ children: themeInitScript }], ... })
 * (or <script dangerouslySetInnerHTML={{ __html: themeInitScript }} /> inside <head>)
 * and add suppressHydrationWarning to the <html> tag.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${KEY}');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}})();`;

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Read the real theme after mount (avoids server/client mismatch)
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    root.classList.add("theme-transition");
    root.classList.toggle("dark", next === "dark");
    window.setTimeout(() => root.classList.remove("theme-transition"), 500);

    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode: ignore */
    }
    setTheme(next);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className={`glass relative grid size-10 place-items-center overflow-hidden rounded-full text-foreground transition-transform hover:scale-105 active:scale-95 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme && (
          <motion.span
            key={theme}
            className="grid place-items-center"
            initial={{ y: 14, opacity: 0, rotate: -60 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 60 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {isDark ? (
              <Sun className="size-4" aria-hidden="true" />
            ) : (
              <Moon className="size-4" aria-hidden="true" />
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
