import { MessageCircle } from "lucide-react";
import { whatsapp, whatsappHref } from "@/data/site";

export function WhatsAppButton() {
  const configured = Boolean(whatsapp.number);

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        configured
          ? "Chat with Sadar Constructions on WhatsApp"
          : "Contact Sadar Constructions"
      }
      className="
        group fixed bottom-5 right-5 z-40
        flex items-center
        rounded-full
        bg-charcoal
        text-ivory
        shadow-[0_10px_35px_rgba(0,0,0,0.18)]
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-[0_14px_40px_rgba(0,0,0,0.25)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-charcoal
        focus-visible:ring-offset-4
        md:bottom-8 md:right-8
      "
    >
      {/* Pulse */}
      {configured && (
        <span
          className="
            absolute inset-0 -z-10
            animate-ping
            rounded-full
            bg-charcoal/20
          "
          aria-hidden="true"
        />
      )}

      {/* Icon */}
      <span
        className="
          flex size-14 shrink-0
          items-center justify-center
          rounded-full
          border border-white/10
          bg-charcoal
          transition-transform duration-500
          group-hover:scale-105
        "
      >
        <MessageCircle
          className="size-6"
          strokeWidth={1.7}
          aria-hidden="true"
        />
      </span>

      {/* Label */}
      <span
        className="
          max-w-0 overflow-hidden
          whitespace-nowrap
          opacity-0
          transition-all duration-500
          group-hover:max-w-36
          group-hover:pr-5
          group-hover:opacity-100
          md:group-focus-visible:max-w-36
          md:group-focus-visible:pr-5
          md:group-focus-visible:opacity-100
        "
      >
        <span className="label-micro">
          Chat with us
        </span>
      </span>
    </a>
  );
}