"use client";

import { useId } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { COUNTRIES } from "@/lib/countries";
import { US_STATES } from "@/lib/us-states";
import { SelectField, TextField } from "../fields";
import type { StepProps } from "../types";

const MONTHS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
const THIS_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 12 }, (_, i) => String(THIS_YEAR + i));

const CARD_BRANDS = [
  { src: "/cards/cc-form-visa.png", alt: "Visa", width: 60, height: 40 },
  { src: "/cards/cc-form-master.png", alt: "Mastercard", width: 60, height: 41 },
  { src: "/cards/cc-form-amex.png", alt: "American Express", width: 60, height: 41 },
  { src: "/cards/cc-form-discover.png", alt: "Discover", width: 60, height: 41 },
] as const;

export function PaymentStep({ state, setField, errors }: StepProps) {
  const otherId = useId();
  const payment = state.payment;
  const set = (key: string) => (value: string) => setField("payment", key, value);
  const otherAddress = payment.useOtherAddress === "yes";

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">We accept all major credit cards</p>
        <div className="flex flex-wrap items-center gap-2">
          {CARD_BRANDS.map((card) => (
            <Image
              key={card.alt}
              src={card.src}
              alt={card.alt}
              width={card.width}
              height={card.height}
              className="h-8 w-auto"
            />
          ))}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="First name on card"
          value={payment.firstName}
          error={errors["payment.firstName"]}
          onChange={set("firstName")}
          autoComplete="cc-given-name"
        />
        <TextField
          label="Last name on card"
          value={payment.lastName}
          error={errors["payment.lastName"]}
          onChange={set("lastName")}
          autoComplete="cc-family-name"
        />
        <TextField
          label="Card number"
          value={payment.cardNumber}
          error={errors["payment.cardNumber"]}
          onChange={set("cardNumber")}
          autoComplete="cc-number"
          placeholder="•••• •••• •••• ••••"
        />
        <TextField
          label="CVV/CVC code"
          type="password"
          value={payment.cvv}
          error={errors["payment.cvv"]}
          onChange={set("cvv")}
          autoComplete="cc-csc"
        />
        <SelectField
          label="Exp. month"
          value={payment.expMonth}
          options={MONTHS}
          error={errors["payment.expMonth"]}
          onChange={set("expMonth")}
          placeholder="Month"
        />
        <SelectField
          label="Exp. year"
          value={payment.expYear}
          options={YEARS}
          error={errors["payment.expYear"]}
          onChange={set("expYear")}
          placeholder="Year"
        />
      </div>
      <div className="flex items-center gap-3 pt-1">
        <Checkbox
          id={otherId}
          checked={otherAddress}
          onCheckedChange={(value) =>
            set("useOtherAddress")(value ? "yes" : "no")
          }
        />
        <Label htmlFor={otherId} className="font-normal">
          Use address other than mailing address
        </Label>
        <span className="inline-flex items-center rounded bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
          Secure transaction
        </span>
      </div>
      {otherAddress ? (
        <div className="space-y-5 border-t pt-5">
          <SelectField
            label="Country"
            value={payment.country}
            options={COUNTRIES}
            placeholder="Choose Country"
            onChange={set("country")}
          />
          <TextField
            label="Address"
            value={payment.address}
            error={errors["payment.address"]}
            onChange={set("address")}
            autoComplete="billing street-address"
          />
          <div className="grid gap-5 sm:grid-cols-3">
            <TextField
              label="City"
              value={payment.city}
              error={errors["payment.city"]}
              onChange={set("city")}
              autoComplete="billing address-level2"
            />
            <SelectField
              label="State / Province"
              value={payment.state}
              options={US_STATES}
              error={errors["payment.state"]}
              onChange={set("state")}
            />
            <TextField
              label="Zip / Postal"
              value={payment.zip}
              error={errors["payment.zip"]}
              onChange={set("zip")}
              autoComplete="billing postal-code"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
