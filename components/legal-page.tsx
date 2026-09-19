import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { LEGAL_LAST_UPDATED, type LegalSection } from "@/lib/legal-content";
import { PageHero } from "./page-hero";

export function LegalPage({
  title,
  sections,
}: {
  title: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        subtitle={`Last updated ${LEGAL_LAST_UPDATED}`}
      />
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <article className="space-y-8">
          {sections.map((section, index) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="text-xl font-semibold">
                {index + 1}. {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>
        <div className="mt-12 border-t pt-6">
          <Link
            href="/"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Back to checkout
          </Link>
        </div>
      </main>
    </>
  );
}
