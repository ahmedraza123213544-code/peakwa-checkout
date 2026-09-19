"use client";

import { US_STATES } from "@/lib/us-states";
import { SelectField, TextField } from "../fields";
import type { StepProps } from "../types";

export function ContactStep({ state, setField }: StepProps) {
  const contact = state.contact;
  const set = (key: string) => (value: string) => setField("contact", key, value);

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="First name" value={contact.firstName} onChange={set("firstName")} autoComplete="given-name" />
        <TextField label="Last name" value={contact.lastName} onChange={set("lastName")} autoComplete="family-name" />
        <TextField label="Phone number" value={contact.phone} onChange={set("phone")} type="tel" autoComplete="tel" />
        <TextField label="Country" value={contact.country} onChange={set("country")} autoComplete="country-name" />
      </div>
      <TextField label="Address" value={contact.address} onChange={set("address")} autoComplete="street-address" />
      <div className="grid gap-5 sm:grid-cols-3">
        <TextField label="City" value={contact.city} onChange={set("city")} autoComplete="address-level2" />
        <SelectField label="State / Province" value={contact.state} options={US_STATES} onChange={set("state")} />
        <TextField label="Zip / Postal" value={contact.zip} onChange={set("zip")} autoComplete="postal-code" />
      </div>
    </div>
  );
}
