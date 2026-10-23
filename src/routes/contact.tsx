import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Instagram, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { site, whatsappHref, whatsapp } from "@/data/site";
import { projectImages } from "@/data/projects";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact Sadar Constructions | Bhopal",
      description:
        "Share your site, drawings or idea with Sadar Constructions in Bhopal and get advice on feasibility, cost and timelines.",
      path: "/contact",
    }),
  component: ContactPage,
});

// Same look for both buttons; colours come from the theme so they read well in light and dark.
const actionClass =
  "label-micro group flex items-center justify-between gap-3 rounded-full border border-border px-6 py-4 text-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background";

function ContactPage() {
  const details = [
    { icon: Phone, label: "Phone", value: site.contact.phone },
    // { icon: Mail, label: "Email", value: site.contact.email },
    { icon: MapPin, label: "Office", value: site.contact.address },
    { icon: Clock, label: "Hours", value: site.contact.hours },
  ];

  return (
    <>
      <PageHero
        label="Contact"
        title={
          <>
            Start a{" "}
            <span className="text-gradient-bronze animate-shimmer italic">project</span>
          </>
        }
        description="Tell us about your site, scope and timeline - we'll take it from there."
        image={projectImages.interior}
        imageAlt="Warm interior with oak joinery and travertine floors"
      />

      <section className="relative overflow-hidden bg-background py-8 md:py-12 xl:py-14">
        <div
          aria-hidden="true"
          className="glow-bronze pointer-events-none absolute -left-28 top-10 size-80 opacity-20"
        />

        <div className="shell relative grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Form */}
          <Reveal className="lg:col-span-7">
            <div className="rounded-[28px] border border-border bg-card p-6 shadow-soft md:p-8">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="hairline w-6 shrink-0 bg-accent" />
                <span className="label-micro">Enquiry</span>
              </div>
              <h2 className="mt-2 font-display text-2xl leading-tight text-foreground md:text-3xl">
                Send an enquiry
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">Fields marked * are required.</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          {/* Direct contact */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="hairline w-6 shrink-0 bg-accent" />
              <span className="label-micro">Direct</span>
            </div>
            <h2 className="mt-2 font-display text-2xl leading-tight text-foreground md:text-3xl">
              Reach us directly
            </h2>

            <ul className="mt-5 flex flex-col border-t border-border">
              {details.map((d) => (
                <li key={d.label} className="group flex items-center gap-4 border-b border-border py-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-accent transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                    <d.icon className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="label-micro text-muted-foreground">{d.label}</p>
                    <p className="mt-1 text-sm text-foreground">{d.value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className={actionClass}
              >
                <span className="flex items-center gap-3">
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {whatsapp.number ? "Chat on WhatsApp" : "Message us on Instagram"}
                </span>
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={actionClass}
              >
                <span className="flex items-center gap-3">
                  <Instagram className="size-4" aria-hidden="true" />
                  {site.instagramHandle}
                </span>
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
