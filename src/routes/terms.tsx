import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
   head: () =>
    seo({
  title: "Terms & Conditions | Sadar Constructions",
  description: "Terms and conditions for using the Sadar Constructions website and requesting our construction services.",
  path: "/terms",
}),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHero label="Legal" title="Terms of Use" />
      <section className="section-y bg-warmwhite">
        <div className="shell flex max-w-3xl flex-col gap-8 text-base leading-relaxed text-muted-foreground">
          <p className="label-micro text-bronze">Draft - pending legal review</p>
          <div>
            <h2 className="display-md text-charcoal">Website content</h2>
            <p className="mt-4">
              Content on this website is provided for general information. Project imagery and
              descriptions currently shown are reference concepts and do not represent completed
              contracted work unless explicitly stated.
            </p>
          </div>
          <div>
            <h2 className="display-md text-charcoal">No contractual offer</h2>
            <p className="mt-4">
              Nothing on this website constitutes a quotation, estimate or contractual commitment.
              Scope, pricing and timelines are agreed in writing on a per-project basis.
            </p>
          </div>
          <div>
            <h2 className="display-md text-charcoal">Intellectual property</h2>
            <p className="mt-4">
              Text, layout and imagery on this site may not be reproduced without permission.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
