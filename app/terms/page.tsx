import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { TERMS } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Terms | Peakwa Biz Solutions" };

export default function TermsPage() {
  return <LegalPage title="Terms of Service" sections={TERMS} />;
}
