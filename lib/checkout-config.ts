export const HERO = {
  eyebrow: "Checkout",
  title: "Form your",
  accent: "company",
  subtitle:
    "Tell us about your business, choose what you need, and watch your order total update as you go.",
  highlights: [
    "7 simple steps",
    "Registered agent free the first year",
    "Pay only for what you select",
  ],
};

export const STEPS = [
  { id: "company", label: "Company" },
  { id: "contact", label: "Contact" },
  { id: "account", label: "Account" },
  { id: "identity", label: "Business Identity" },
  { id: "services", label: "Services" },
  { id: "card-processing", label: "Card Processing" },
  { id: "payment", label: "Payment" },
] as const;

export type StepId = (typeof STEPS)[number]["id"];

export const FORMATION_TIERS = {
  basic: { label: "Basic", price: 99 },
  deluxe: { label: "Deluxe", price: 219 },
  complete: { label: "Complete", price: 269 },
} as const;

export const FORMATION_TIER: keyof typeof FORMATION_TIERS = "deluxe";

export const REGISTERED_AGENT = {
  firstYearPrice: 0,
  renewalPrice: 149,
};

export const FILING_SPEEDS = [
  { id: "standard", label: "Standard (15-20 business days)", price: 0 },
  { id: "express", label: "Express (5-7 business days)", price: 150 },
  { id: "24-hour", label: "24 Hour (2-3 business days)", price: 250 },
] as const;

export const COMPANY_TYPES = [
  "Limited Liability Company",
  "C-Corporation",
  "S-Corporation",
  "Non-Profit Corporation",
  "Professional Corporation",
] as const;

export type Option = {
  id: string;
  label: string;
  price: number;
  note?: string;
  tip: string;
};

export const IDENTITY_OPTIONS: Option[] = [
  {
    id: "card-machine",
    label: "Credit card machine",
    price: 0,
    note: "Shipped free once you sign up for credit card processing.",
    tip: "A physical card reader shipped to you at no cost when you sign up for credit card processing.",
  },
  {
    id: "website-hosting",
    label: "Website and hosting",
    price: 0,
    note: "Free for 2 years.",
    tip: "A full business website with hosting included, free for 2 years.",
  },
  {
    id: "business-email",
    label: "Business email",
    price: 0,
    tip: "A business email address on your own domain, included with the free package.",
  },
  {
    id: "business-phone",
    label: "Business phone number",
    price: 0,
    tip: "A dedicated business phone number, included with the free package.",
  },
  {
    id: "domain",
    label: "Domain name",
    price: 20,
    note: "Priced to match GoDaddy and Namecheap.",
    tip: "Priced to match GoDaddy and Namecheap. The one part of the package that isn't free.",
  },
  {
    id: "gmb-setup",
    label: "Google My Business set up",
    price: 0,
    tip: "We create and verify your Google Business Profile so you show up in local search and Maps.",
  },
  {
    id: "google-posts",
    label: "10 Google posts a month",
    price: 0,
    note: "Free for 3 months, then $19.99/mo.",
    tip: "We publish 10 posts a month to your Google Business Profile to keep it active and ranking.",
  },
  {
    id: "blog-posts",
    label: "5 blog posts a month",
    price: 0,
    note: "Free for 3 months, then $19.99/mo.",
    tip: "We write and publish 5 blog posts a month to your website for SEO.",
  },
];

// Prices are CorpNet's current list for a Georgia LLC; the annual report price varies by state.
export const SERVICE_OPTIONS: Option[] = [
  {
    id: "s-corp-election",
    label: "S-Corp Election Submission and Filing (IRS Form 2553)",
    price: 69,
    tip: "Files IRS Form 2553 to have your entity taxed as an S Corp instead of the default.",
  },
  {
    id: "business-license-research",
    label: "Business License Research Package",
    price: 199,
    tip: "We research which local, state, and federal licenses your business actually needs.",
  },
  {
    id: "fincen-boi",
    label: "FinCEN BOI Reporting Submission and Filing",
    price: 199,
    tip: "Files your federal Beneficial Ownership Information report, required for most new entities.",
  },
  {
    id: "annual-report",
    label: "Initial/Annual Report Submission and Filing",
    price: 89,
    tip: "Keeps your entity in good standing by filing the report your state requires each year.",
  },
];

export const CARD_PROCESSING_OPTION: Option = {
  id: "card-processing",
  label: "Credit card processing",
  price: 0,
  note: "Includes a free credit card machine shipped to you.",
  tip: "We set you up with a processor and payment gateway. No cost to apply.",
};

export const REGISTERED_AGENT_TIP =
  "A person or company designated to receive legal and state documents on your behalf, required in every state. Free the first year, then renews at $149/yr.";

export const FORMATION_TIP =
  "Our fee for preparing and filing your formation documents with the state.";
