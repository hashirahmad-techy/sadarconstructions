import { useState, type FormEvent, type ReactNode } from "react";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { projectTypes, budgetRanges, timelines } from "@/data/site";
import { sendEnquiry } from "@/lib/enquiry";
import { cn } from "@/lib/utils";

// All colours come from the theme, so inputs read well in both light and dark.
// bg-background sits one step away from the card behind the form, so fields stand out in both themes.
const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-60";

const labelClass = "label-micro text-muted-foreground";

/** Select with a visible chevron (the native arrow is hidden by appearance-none). */
function SelectWrap({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (sending) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const type = String(data.get("type") ?? "").trim();
    const budget = String(data.get("budget") ?? "").trim();
    const timeline = String(data.get("timeline") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const website = String(data.get("website") ?? "").trim();

    // Client-side validation
    if (!name || !email || !message) {
      setError("Please complete name, email and project details.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setSending(true);

    try {
      await sendEnquiry({
        data: {
          name,
          email,
          phone,
          type,
          budget,
          timeline,
          message,
          website,
        },
      });

      setSent(true);
      form.reset();
    } catch (err) {
      console.error("Enquiry submission error:", err);

      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-background p-8 md:p-10">
        <span className="flex size-12 items-center justify-center rounded-full border border-accent/50 bg-accent/10 text-accent">
          <Check className="size-5" aria-hidden="true" />
        </span>

        <h3 className="font-display text-2xl leading-tight text-foreground">
          Enquiry received
        </h3>

        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Thank you for contacting Sadar Constructions. Your enquiry has been sent successfully.
          Our team will get back to you shortly.
        </p>

        <button
          type="button"
          onClick={() => {
            setSent(false);
            setError(null);
          }}
          className="label-micro text-foreground underline underline-offset-8 transition-colors hover:text-accent"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot: hidden from people, catches bots */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className={labelClass} htmlFor="name">
            Full name*
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className={fieldClass}
            placeholder="Your name"
            required
            disabled={sending}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass} htmlFor="email">
            Email*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            placeholder="you@example.com"
            required
            disabled={sending}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            placeholder="Your phone number"
            disabled={sending}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass} htmlFor="type">
            Project type
          </label>
          <SelectWrap>
            <select
              id="type"
              name="type"
              className={cn(fieldClass, "appearance-none pr-11")}
              disabled={sending}
            >
              {projectTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </SelectWrap>
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass} htmlFor="budget">
            Budget range
          </label>
          <SelectWrap>
            <select
              id="budget"
              name="budget"
              className={cn(fieldClass, "appearance-none pr-11")}
              disabled={sending}
            >
              {budgetRanges.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </SelectWrap>
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass} htmlFor="timeline">
            Timeline
          </label>
          <SelectWrap>
            <select
              id="timeline"
              name="timeline"
              className={cn(fieldClass, "appearance-none pr-11")}
              disabled={sending}
            >
              {timelines.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </SelectWrap>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass} htmlFor="message">
          Project details*
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={cn(fieldClass, "resize-y")}
          placeholder="Site location, scope, drawings available, anything else useful."
          required
          disabled={sending}
        />
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      {/* Submit button uses theme colours directly, so it is always readable:
          dark with light text in light mode, light with dark text in dark mode. */}
      <button
        type="submit"
        disabled={sending}
        className="label-micro group inline-flex items-center justify-center gap-2 self-start rounded-full bg-primary px-8 py-4 text-primary-foreground shadow-soft transition-all duration-300 hover:scale-[1.03] hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-60 max-sm:w-full"
      >
        {sending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          "Send enquiry"
        )}
      </button>
    </form>
  );
}
