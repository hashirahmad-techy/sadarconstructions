import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { site } from "@/data/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Sadar Constructions" },
      {
        name: "description",
        content:
          "How Sadar Constructions collects, uses and protects personal information submitted through this website.",
      },
      { property: "og:title", content: "Privacy Policy | Sadar Constructions" },
      {
        property: "og:description",
        content: "Our approach to handling enquiry data submitted through this website.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero label="Legal" title="Privacy Policy" />
      <section className="section-y bg-warmwhite">
        <div className="shell flex max-w-3xl flex-col gap-8 text-base leading-relaxed text-muted-foreground">
          <p className="label-micro text-bronze">Draft — pending legal review</p>
          <div>
            <h2 className="display-md text-charcoal">Information we collect</h2>
            <p className="mt-4">
              When you submit an enquiry we may collect your name, email address, phone number and
              the project details you choose to share.
            </p>
          </div>
          <div>
            <h2 className="display-md text-charcoal">How we use it</h2>
            <p className="mt-4">
              Enquiry information is used only to respond to your request and discuss a possible
              project. We do not sell personal information.
            </p>
          </div>
          <div>
            <h2 className="display-md text-charcoal">Retention and access</h2>
            <p className="mt-4">
              You may request access to, correction of, or deletion of the information you have
              shared with us at any time.
            </p>
          </div>
          <div>
            <h2 className="display-md text-charcoal">Contact</h2>
            <p className="mt-4">
              Privacy questions can be sent to {site.contact.email}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
