import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Contact | Peakwa Biz Solutions" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact us"
        subtitle="Questions about your order or our services? Send us a message."
      />
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <ContactForm />
      </main>
    </>
  );
}
