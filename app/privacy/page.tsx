import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { PRIVACY } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Privacy | Peakwa Biz Solutions" };

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" sections={PRIVACY} />;
}
