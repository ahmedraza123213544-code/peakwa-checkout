"use client";

import { useId } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  COMPANY_NAME_TIP,
  COMPANY_TYPES,
  MAIL_ADDRESS_UPSELL,
  MAIL_DELIVERY_TIP,
  MAIL_SCAN_TIERS,
  SERVICE_YEARS,
} from "@/lib/checkout-config";
import { US_STATES } from "@/lib/us-states";
import { FieldError, SelectField, TextField } from "../fields";
import { InfoTip } from "../info-tip";
import type { StepProps } from "../types";

const YES_NO = ["Yes", "No"] as const;

export function CompanyStep({ state, setField, errors }: StepProps) {
  const hireId = useId();
  const company = state.company;
  const hireUs = company.hireChangeAgent === "yes";

  return (
    <div className="space-y-6">
      <TextField
        label="Existing or desired company name"
        value={company.name}
        tip={COMPANY_NAME_TIP}
        error={errors["company.name"]}
        onChange={(v) => setField("company", "name", v)}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Type"
          value={company.type}
          options={COMPANY_TYPES}
          onChange={(v) => setField("company", "type", v)}
        />
        <SelectField
          label="State of formation"
          value={company.state}
          options={US_STATES}
          error={errors["company.state"]}
          onChange={(v) => setField("company", "state", v)}
        />
        <SelectField
          label="Notify your attorney of a lawsuit?"
          value={company.notifyAttorney}
          options={YES_NO}
          onChange={(v) => setField("company", "notifyAttorney", v)}
        />
        <SelectField
          label="Changing registered agent?"
          value={company.changingAgent}
          options={YES_NO}
          error={errors["company.changingAgent"]}
          onChange={(v) => {
            setField("company", "changingAgent", v);
            if (v !== "Yes") setField("company", "hireChangeAgent", "no");
          }}
        />
      </div>

      {company.notifyAttorney === "Yes" ? (
        <TextField
          label="Attorney email"
          type="email"
          value={company.attorneyEmail}
          error={errors["company.attorneyEmail"]}
          onChange={(v) => setField("company", "attorneyEmail", v)}
          autoComplete="email"
        />
      ) : null}

      {company.changingAgent === "Yes" ? (
        <div className="flex items-start gap-3">
          <Checkbox
            id={hireId}
            checked={hireUs}
            onCheckedChange={(value) =>
              setField("company", "hireChangeAgent", value ? "yes" : "no")
            }
            className="mt-0.5"
          />
          <Label htmlFor={hireId} className="font-normal leading-snug">
            Hire us to change your registered agent?
          </Label>
        </div>
      ) : null}

      <div className="space-y-2">
        <SelectField
          label="Number of years of service"
          value={company.yearsOfService}
          options={SERVICE_YEARS.map((item) => ({
            value: item.id,
            label: item.label,
          }))}
          onChange={(v) => setField("company", "yearsOfService", v)}
        />
        <p className="text-[13px] font-medium">
          Order more than one year and get your change of agent service fee
          waived.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-1">
          <Label>
            Where would you like your non-registered agent mail delivered?
          </Label>
          <InfoTip title="Mail delivery" text={MAIL_DELIVERY_TIP} />
        </div>
        <RadioGroup
          className="gap-3"
          value={company.mailDelivery || null}
          onValueChange={(v) => setField("company", "mailDelivery", String(v))}
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="our-office" id="mail-our-office" />
            <Label htmlFor="mail-our-office" className="font-normal">
              Our office
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="your-address" id="mail-your-address" />
            <Label htmlFor="mail-your-address" className="font-normal">
              Your address
            </Label>
          </div>
        </RadioGroup>
        <FieldError message={errors["company.mailDelivery"]} />
        {company.mailDelivery === "our-office" ? (
          <RadioGroup
            className="ml-7 gap-3"
            value={company.mailScan}
            onValueChange={(v) => setField("company", "mailScan", String(v))}
          >
            {MAIL_SCAN_TIERS.map((tier) => (
              <div key={tier.id} className="flex items-start gap-2">
                <RadioGroupItem
                  value={tier.id}
                  id={`scan-${tier.id}`}
                  className="mt-1"
                />
                <Label
                  htmlFor={`scan-${tier.id}`}
                  className="font-normal leading-snug"
                >
                  {tier.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : null}
        {company.mailDelivery === "your-address" ? (
          <p className="ml-7 max-w-prose text-[15px] font-medium leading-relaxed text-primary">
            {MAIL_ADDRESS_UPSELL}
          </p>
        ) : null}
      </div>
    </div>
  );
}
