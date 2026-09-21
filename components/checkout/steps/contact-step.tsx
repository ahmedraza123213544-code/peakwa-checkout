"use client";

import { COUNTRIES } from "@/lib/countries";
import { US_STATES } from "@/lib/us-states";
import { SelectField, TextField } from "../fields";
import type { StepProps } from "../types";

export function ContactStep({ state, setField, errors }: StepProps) {
  const contact = state.contact;
  const set = (key: string) => (value: string) => setField("contact", key, value);

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="First name"
          value={contact.firstName}
          error={errors["contact.firstName"]}
          onChange={set("firstName")}
          autoComplete="given-name"
        />
        <TextField
          label="Last name"
          value={contact.lastName}
          error={errors["contact.lastName"]}
          onChange={set("lastName")}
          autoComplete="family-name"
        />
        <TextField
          label="Phone number"
          value={contact.phone}
          error={errors["contact.phone"]}
          onChange={set("phone")}
          type="tel"
          autoComplete="tel"
        />
        <SelectField
          label="Country"
          value={contact.country}
          options={COUNTRIES}
          placeholder="Choose Country"
          error={errors["contact.country"]}
          onChange={set("country")}
        />
      </div>
      <TextField
        label="Address"
        value={contact.address}
        error={errors["contact.address"]}
        onChange={set("address")}
        autoComplete="street-address"
      />
      <div className="grid gap-5 sm:grid-cols-3">
        <TextField
          label="City"
          value={contact.city}
          error={errors["contact.city"]}
          onChange={set("city")}
          autoComplete="address-level2"
        />
        <SelectField
          label="State / Province"
          value={contact.state}
          options={US_STATES}
          error={errors["contact.state"]}
          onChange={set("state")}
        />
        <TextField
          label="Zip / Postal"
          value={contact.zip}
          error={errors["contact.zip"]}
          onChange={set("zip")}
          autoComplete="postal-code"
        />
      </div>
    </div>
  );
}
