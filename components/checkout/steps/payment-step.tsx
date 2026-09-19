"use client";

import { SelectField, TextField } from "../fields";
import type { StepProps } from "../types";

const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const THIS_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 12 }, (_, i) => String(THIS_YEAR + i));

export function PaymentStep({ state, setField }: StepProps) {
  const payment = state.payment;
  const set = (key: string) => (value: string) => setField("payment", key, value);

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="First name on card" value={payment.firstName} onChange={set("firstName")} autoComplete="cc-given-name" />
        <TextField label="Last name on card" value={payment.lastName} onChange={set("lastName")} autoComplete="cc-family-name" />
        <TextField label="Card number" value={payment.cardNumber} onChange={set("cardNumber")} autoComplete="cc-number" placeholder="1234 5678 9012 3456" />
        <TextField label="CVV / CVC" type="password" value={payment.cvv} onChange={set("cvv")} autoComplete="cc-csc" />
        <SelectField label="Exp. month" value={payment.expMonth} options={MONTHS} onChange={set("expMonth")} placeholder="MM" />
        <SelectField label="Exp. year" value={payment.expYear} options={YEARS} onChange={set("expYear")} placeholder="YYYY" />
      </div>
    </div>
  );
}
