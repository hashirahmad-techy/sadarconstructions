import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { site, whatsappHref, whatsapp } from "@/data/site";
import { projectImages } from "@/data/projects";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Sadar Constructions | Start Your Project" },
      {
        name: "description",
        content:
          "Get in touch with Sadar Constructions to discuss a residential, commercial, renovation or interior construction project.",
      },
      { property: "og:title", content: "Contact Sadar Constructions" },
      {
        property: "og:description",
        content:
          "Share your site, drawings or brief and we'll advise on feasibility, sequencing and execution.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const details = [
    { icon: Phone, label: "Phone", value: site.contact.phone },
    { icon: Mail, label: "Email", value: site.contact.email },
    { icon: MapPin, label: "Office", value: site.contact.address },
    { icon: Clock, label: "Hours", value: site.contact.hours },
  ];

  return (
    <>
      <PageHero
        label="Contact"
        title="Start a project"
        description="Tell us about your site, scope and timeline — we'll take it from there."
        image={projectImages.interior}
        imageAlt="Warm interior with oak joinery and travertine floors"
      />

      <section className="section-y bg-warmwhite">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <h2 className="display-lg text-charcoal">Send an enquiry</h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Fields marked * are required.
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <h2 className="display-md text-charcoal">Reach us directly</h2>
            <ul className="mt-8 flex flex-col border-t border-border">
              {details.map((d) => (
                <li key={d.label} className="flex items-start gap-4 border-b border-border py-5">
                  <d.icon className="mt-0.5 size-4 shrink-0 text-bronze" aria-hidden="true" />
                  <div>
                    <p className="label-micro text-muted-foreground">{d.label}</p>
                    <p className="mt-2 text-sm text-charcoal">{d.value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="label-micro flex items-center gap-3 border border-charcoal/25 px-6 py-4 text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
              >
                <Instagram className="size-4" aria-hidden="true" />
                {site.instagramHandle}
              </a>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="label-micro flex items-center gap-3 border border-charcoal/25 px-6 py-4 text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                {whatsapp.number ? "Chat on WhatsApp" : "Message us on Instagram"}
              </a>
            </div>

            <p className="label-micro mt-8 leading-relaxed text-muted-foreground">
              Contact details in brackets are placeholders awaiting verified company information.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
