import type { CheckoutState } from "@/lib/checkout-state";

export type Section = "company" | "contact" | "account" | "payment";

export type StepProps = {
  state: CheckoutState;
  setField: (section: Section, key: string, value: string) => void;
  setSelected: (id: string, checked: boolean) => void;
};
