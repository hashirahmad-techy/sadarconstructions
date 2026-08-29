import { useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { projectTypes, budgetRanges, timelines } from "@/data/site";
import { sendEnquiry } from "@/lib/enquiry";
import { ActionButton } from "./ActionLink";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full border border-border bg-warmwhite px-4 py-4 text-sm text-charcoal outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-charcoal disabled:cursor-not-allowed disabled:opacity-60";

const labelClass = "label-micro text-muted-foreground";

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
    err instanceof Error
      ? err.message
      : "Something went wrong. Please try again.",
  );
} finally {
  setSending(false);
}


  }

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-5 border border-border bg-ivory p-10">
        <span className="flex size-12 items-center justify-center border border-charcoal/25 text-bronze">
          <Check className="size-5" aria-hidden="true" />
        </span>

        <h3 className="display-md text-charcoal">
          Enquiry received
        </h3>

        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Thank you for contacting Sadar Constructions. Your enquiry has been
          sent successfully. Our team will get back to you shortly.
        </p>

        <button
          type="button"
          onClick={() => {
            setSent(false);
            setError(null);
          }}
          className="label-micro underline underline-offset-8"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <label className={labelClass} htmlFor="name">
            Full name*
          </label>

          <input
            id="name"
            name="name"
            className={fieldClass}
            placeholder="Your name"
            required
            disabled={sending}
          />
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
            disabled={sending}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            className={fieldClass}
            placeholder="Your phone number"
            disabled={sending}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className={labelClass} htmlFor="type">
            Project type
          </label>

          <select
            id="type"
            name="type"
            className={cn(fieldClass, "appearance-none")}
            disabled={sending}
          >
            {projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <label className={labelClass} htmlFor="budget">
            Budget range
          </label>

          <select
            id="budget"
            name="budget"
            className={cn(fieldClass, "appearance-none")}
            disabled={sending}
          >
            {budgetRanges.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <label className={labelClass} htmlFor="timeline">
            Timeline
          </label>

          <select
            id="timeline"
            name="timeline"
            className={cn(fieldClass, "appearance-none")}
            disabled={sending}
          >
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
          disabled={sending}
        />
      </div>

      {error && (
        <p
          role="alert"
          className="border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      <ActionButton
        type="submit"
        disabled={sending}
        className="self-start"
      >
        {sending ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          "Send enquiry"
        )}
      </ActionButton>
    </form>
  );
}