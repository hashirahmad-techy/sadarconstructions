import { MessageCircle } from "lucide-react";
import { whatsapp, whatsappHref } from "@/data/site";

/**
 * Floating WhatsApp CTA.
 * Set VITE_WHATSAPP_NUMBER (country code + number, digits only) to enable.
 * Without it, the button points at the official Instagram profile rather than
 * a fabricated phone number.
 */
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
          : "Contact Sadar Constructions (WhatsApp number not yet configured — opens Instagram)"
      }
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 border border-charcoal bg-charcoal px-4 py-4 text-ivory shadow-lg transition-all duration-500 hover:-translate-y-0.5 hover:bg-deepcharcoal md:bottom-8 md:right-8"
    >
      <MessageCircle className="size-5 shrink-0" aria-hidden="true" />
      <span className="label-micro max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-500 group-hover:max-w-40 group-hover:opacity-100 md:group-focus-visible:max-w-40 md:group-focus-visible:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
