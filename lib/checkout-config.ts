export const HERO = {
  eyebrow: "Checkout",
  title: "Form your",
  accent: "company",
  subtitle:
    "Tell us about your business, choose what you need, and watch your order total update as you go.",
  highlights: [
    "Registered agent from $49 a year",
    "Pay only for what you select",
  ],
};

export const STEPS = [
  {
    id: "company",
    label: "Company",
    title: "Company Information",
  },
  {
    id: "filing",
    label: "Filing",
    title: "Filing Options",
  },
  {
    id: "contact",
    label: "Contact",
    title: "Contact Information",
    tip: "We use this to reach you about your filing and to mail documents that are not for the registered agent.",
  },
  {
    id: "account",
    label: "Account",
    title: "Account Setup",
    tip: "This email and password is how you sign in later to check filings, documents, and renewals.",
  },
  {
    id: "identity",
    label: "Business Identity",
    title: "Business Identity",
  },
  {
    id: "recommended",
    label: "Recommended Items",
    title: "Recommended Items",
  },
  {
    id: "payment",
    label: "Payment",
    title: "Billing Information",
  },
] as const;

export type StepId = (typeof STEPS)[number]["id"];

export function visibleSteps(hireChangeAgent: boolean) {
  return STEPS.filter((step) => step.id !== "filing" || hireChangeAgent);
}

export const FORMATION_TIERS = {
  basic: {
    id: "basic",
    label: "Basic",
    price: 99,
    summary: "Name check and filing of your formation documents with the state.",
    includes: [
      { id: "name-check", label: "Company name availability check" },
      { id: "articles", label: "Preparation and filing of formation documents" },
    ],
  },
  deluxe: {
    id: "deluxe",
    label: "Deluxe",
    price: 219,
    summary: "Basic plus your federal EIN so you can bank and hire.",
    includes: [
      { id: "name-check", label: "Company name availability check" },
      { id: "articles", label: "Preparation and filing of formation documents" },
      { id: "ein", label: "Federal Tax ID Number (EIN)" },
    ],
  },
  complete: {
    id: "complete",
    label: "Complete",
    price: 269,
    summary:
      "Deluxe plus an operating agreement, certified copies, kit and seal.",
    includes: [
      { id: "name-check", label: "Company name availability check" },
      { id: "articles", label: "Preparation and filing of formation documents" },
      { id: "ein", label: "Federal Tax ID Number (EIN)" },
      { id: "agreement", label: "Custom operating agreement or bylaws" },
      { id: "kit", label: "Corporate kit, seal, and certified copies" },
    ],
  },
} as const;

export type FormationTierId = keyof typeof FORMATION_TIERS;

export const FORMATION_TIER: FormationTierId = "deluxe";

export const REGISTERED_AGENT = {
  firstYearPrice: 49,
  renewalPrice: 149,
};

export const SERVICE_YEARS = [
  { id: "1", years: 1, label: "1 Year - $49" },
  { id: "2", years: 2, label: "2 Years - $198" },
  { id: "3", years: 3, label: "3 Years - $347" },
] as const;

export const FILING_SPEEDS = [
  {
    id: "standard",
    label: "Standard",
    days: "Processed by the state in 15–20 business days",
    price: 0,
  },
  {
    id: "expedited",
    label: "Expedited",
    days: "Processed by the state in 5–7 business days",
    price: 150,
  },
  {
    id: "expedited-1-day",
    label: "Expedited 1 Day",
    days: "Processed by the state in 2–3 business days",
    price: 250,
  },
] as const;

export type FilingSpeedId = (typeof FILING_SPEEDS)[number]["id"];

export const CHANGE_AGENT_FILING = {
  ourFee: 25,
  speeds: [
    {
      id: "standard",
      label: "Standard",
      days: "Processed by the state in 10 business days",
      stateFee: 50,
    },
    {
      id: "expedited",
      label: "Expedited",
      days: "Processed by the state in 2 business days",
      stateFee: 150,
    },
    {
      id: "expedited-1-day",
      label: "Expedited 1 Day",
      days: "Processed by the state in 1 business day",
      stateFee: 250,
    },
  ],
} as const;

export const MAIL_SCAN_TIERS = [
  {
    id: "free",
    price: 0,
    label:
      "Free Mail Scanning - 3 mail docs per year open and scanned, no unique mailing address - $0/year",
    tip: "We open and scan up to 3 pieces of mail a year. You do not get a unique mailing address with this tier.",
  },
  {
    id: "standard",
    price: 49,
    label:
      "Includes unique mailing address for your business & 10 more documents opened, scanned, and virtually forwarded - $49/year",
    tip: "A unique business mailing address, plus up to 10 extra documents opened, scanned, and forwarded to you each year.",
  },
  {
    id: "plus",
    price: 99,
    label:
      "Includes unique mailing address for your business & 25 more documents opened, scanned, and virtually forwarded - $99/year",
    tip: "A unique business mailing address, plus up to 25 extra documents opened, scanned, and forwarded to you each year.",
  },
] as const;

export const MAIL_ADDRESS_UPSELL =
  "Okay, but you could also get a unique business mailing address for just $49 a year or a unique business address at our office and unlimited mail scans for $19 a month.";

export const COMPANY_TYPES = [
  "LLC",
  "Corporation",
  "Non-Profit Corporation",
  "LLP",
  "Limited Partnership",
  "Trust",
] as const;

export type Option = {
  id: string;
  label: string;
  price: number;
  note?: string;
  tip: string;
  extraField?: { key: string; label: string; placeholder?: string };
  extraFiling?: {
    title: string;
    ourFee: number;
    speeds?: readonly {
      id: string;
      label: string;
      days: string;
      price: number;
    }[];
    stateFeeIncluded?: boolean;
  };
  related?: { id: string; label: string; price: number; tip: string };
};

export const IDENTITY_PACKAGE = {
  id: "business-identity",
  label: "Business Identity",
  checkboxLabel: "Sign up for our Business Identity package",
  intro:
    "Our web package includes everything you need to get your business online. Domain, website + SSL, email & phone number! FREE for 90 days. Keep all services and save 20%!",
  tip: "A starter kit to get your business online: phone, domain, website hosting with SSL, and email. Free for 90 days. Website hosting is then $10/mo unless you cancel.",
  alacarteTitle: "Individual Business Identity Items",
  alacarteIntro:
    "Website hosting is free for 3 months, then $10 a month. Other identity items are free to start.",
  bundleNote:
    "Save 20% when you bundle all services in the Business Identity package above!",
};

/** Items nested under the Business Identity package (matches Delaware). */
export const IDENTITY_PACKAGE_ITEMS: Option[] = [
  {
    id: "business-phone",
    label: "Phone Service",
    price: 0,
    tip: "A dedicated business phone number, included with the Business Identity package. Free for 90 days.",
  },
  {
    id: "domain",
    label: "Domain Name",
    price: 0,
    tip: "Your business domain name, included with the Business Identity package. Free for 90 days.",
  },
  {
    id: "website-hosting",
    label: "Website Hosting",
    price: 0,
    note: "Free for 3 months, then $10/mo.",
    tip: "A full business website with SSL and hosting. Free for 3 months, then $10/mo unless you cancel before the free period ends.",
  },
  {
    id: "business-email",
    label: "Email Service",
    price: 0,
    tip: "A business email address on your own domain, included with the Business Identity package. Free for 90 days.",
  },
];

/** Extra Peakwa identity add-ons shown a la carte on Recommended Items. */
export const IDENTITY_EXTRA_OPTIONS: Option[] = [
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
    tip: "We publish 10 posts a month to your Google Business Profile to keep it active and ranking. Free for 3 months, then $19.99/mo unless you cancel before the period ends.",
  },
  {
    id: "blog-posts",
    label: "5 blog posts a month",
    price: 0,
    note: "Free for 3 months, then $19.99/mo.",
    tip: "We write and publish 5 blog posts a month to your website for SEO. Free for 3 months, then $19.99/mo unless you cancel before the period ends.",
  },
];

export const IDENTITY_OPTIONS: Option[] = [
  ...IDENTITY_PACKAGE_ITEMS,
  ...IDENTITY_EXTRA_OPTIONS,
];

export const CARD_MACHINE_OPTION: Option = {
  id: "card-machine",
  label: "Free Credit Card Machine",
  price: 0,
  note: "This is credit card processing - sign up and we ship a free machine to you.",
  tip: "This is our credit card processing service. We set you up with a payment processor and gateway so you can accept cards from day one. There is no cost to apply, and a physical credit card machine is shipped to you free of charge when you sign up.",
};

export const TRADEMARK_OPTION: Option = {
  id: "trademark-filing",
  label: "Trademark Filing",
  price: 799,
  tip: "A trademark is a word, phrase, symbol, or design that promotes items for sale. Federal registration offers robust trademark rights: exclusive ownership, national brand protection, and use of ®.\n\nWith our Trademark Service, attorneys and trademark experts closely review your mark and offer advice, complete and file your application, keep track of application deadlines, and respond to procedural office actions.",
};

export const DBA_OPTION: Option = {
  id: "dba-trade-name",
  label: "DBA Trade Name Filing",
  price: 150,
  tip: "This is an alternative name your business can use to operate in a jurisdiction instead of your legal name. A Trade Name - also called a DBA name or assumed name - is like a pseudonym for your business, allowing you to do business under a different name without forming a brand new business entity. Trade Names require an additional filing. We can file this for you for $125 plus state fees.",
  extraField: {
    key: "dba-name",
    label: "Trade Name (DBA)",
    placeholder: "Name you want to do business as",
  },
  extraFiling: {
    title: "DBA Trade Name Filing Options",
    ourFee: 125,
    stateFeeIncluded: true,
    speeds: [
      {
        id: "certificate",
        label: "Trade Name Certificate",
        days: "Processed by the state in 7 business days",
        price: 25,
      },
    ],
  },
  related: {
    id: "foreign-status-report",
    label: "Foreign Registration - Company Status Report",
    price: 50,
    tip: "A company status report often needed when filing a DBA or foreign registration. Shows current filing status with the state.",
  },
};

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
    extraField: {
      key: "license-activity",
      label: "Describe your business activity",
      placeholder: "e.g. retail clothing store, consulting, restaurant",
    },
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
    extraFiling: {
      title: "Annual Report Filing Options",
      ourFee: 89,
    },
    related: {
      id: "good-standing",
      label: "Certificate of Good Standing",
      price: 50,
      tip: "A state-issued certificate showing your company is in good standing. Often required for banks, licenses, and foreign registrations.",
    },
  },
];

export const RECOMMENDED_OPTIONS: Option[] = [
  TRADEMARK_OPTION,
  DBA_OPTION,
  CARD_MACHINE_OPTION,
  ...SERVICE_OPTIONS,
];

export const COMPANY_NAME_TIP =
  "The exact legal name you want on the formation documents. If the name is taken in your state, we will contact you with options.";

export const MAIL_DELIVERY_TIP =
  "Legal and tax mail still goes to your registered agent. This is for everything else - bank mail, vendor mail, and similar.";

export const REGISTERED_AGENT_TIP =
  "A person or company designated to receive legal and state documents on your behalf, required in every state. $49 the first year, then renews at $149/yr.";

export const FORMATION_TIP =
  "Our fee for preparing and filing your formation documents with the state. Choose Basic, Deluxe, or Complete depending on whether you also need an EIN, operating agreement, and formation kit.";

export const FILING_TIP =
  "How fast the state processes your formation filing. Standard is included. Expedited and Expedited 1 Day are extra.";

export const CHANGE_AGENT_TIP =
  "If you already have a company and are switching registered agents, we file the change with the state. Order more than one year of service and this filing fee is waived.";

export const MAIL_SCAN_TIP =
  "If mail is delivered to our office, we can open, scan, and forward it. The free tier covers 3 documents a year; paid tiers add a unique mailing address and more scans.";

export const RENEWAL_FILINGS_TIP =
  "Periodic state reports and registered-agent renewals after this first year. There is no extra charge for renewal filings on this order.";
