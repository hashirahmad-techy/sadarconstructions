import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { projectTypes, budgetRanges, timelines } from "@/data/site";
import { ActionButton } from "./ActionLink";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full border border-border bg-warmwhite px-4 py-4 text-sm text-charcoal outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-charcoal";

const labelClass = "label-micro text-muted-foreground";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setError("Please complete name, email and project details.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-5 border border-border bg-ivory p-10">
        <span className="flex size-12 items-center justify-center border border-charcoal/25 text-bronze">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <h3 className="display-md text-charcoal">Enquiry noted</h3>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Message delivery is not connected yet, so nothing has been sent to our team. Please reach
          us on Instagram or WhatsApp in the meantime — once contact details are configured this
          form will deliver directly.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="label-micro underline underline-offset-8"
        >
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <label className={labelClass} htmlFor="name">
            Full name*
          </label>
          <input id="name" name="name" className={fieldClass} placeholder="Your name" required />
        </div>
        <div className="flex flex-col gap-3">
          <label className={labelClass} htmlFor="email">
            Email*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={fieldClass}
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>
          <input id="phone" name="phone" className={fieldClass} placeholder="Optional" />
        </div>
        <div className="flex flex-col gap-3">
          <label className={labelClass} htmlFor="type">
            Project type
          </label>
          <select id="type" name="type" className={cn(fieldClass, "appearance-none")}>
            {projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label className={labelClass} htmlFor="budget">
            Budget range
          </label>
          <select id="budget" name="budget" className={cn(fieldClass, "appearance-none")}>
            {budgetRanges.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label className={labelClass} htmlFor="timeline">
            Timeline
          </label>
          <select id="timeline" name="timeline" className={cn(fieldClass, "appearance-none")}>
            {timelines.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className={labelClass} htmlFor="message">
          Project details*
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={fieldClass}
          placeholder="Site location, scope, drawings available, anything else useful."
          required
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <ActionButton type="submit" className="self-start">
        Send enquiry
      </ActionButton>
    </form>
  );
}
