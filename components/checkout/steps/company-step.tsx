"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  COMPANY_TYPES,
  FILING_SPEEDS,
  FORMATION_TIER,
  FORMATION_TIERS,
  FORMATION_TIP,
  REGISTERED_AGENT,
  REGISTERED_AGENT_TIP,
} from "@/lib/checkout-config";
import { money } from "@/lib/pricing";
import { US_STATES } from "@/lib/us-states";
import { ReadOnlyField, SelectField, TextField } from "../fields";
import type { StepProps } from "../types";

const YES_NO = ["Yes", "No"] as const;

export function CompanyStep({ state, setField }: StepProps) {
  const company = state.company;
  const tier = FORMATION_TIERS[FORMATION_TIER];

  return (
    <div className="space-y-6">
      <TextField
        label="Existing or desired company name"
        value={company.name}
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
          onChange={(v) => setField("company", "changingAgent", v)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <ReadOnlyField
          label="Registered agent subscription"
          value={`Free the first year, then ${money(REGISTERED_AGENT.renewalPrice)}/yr`}
          tip={REGISTERED_AGENT_TIP}
        />
        <ReadOnlyField
          label="Business formation service"
          value={`${money(tier.price)} (${tier.label})`}
          tip={FORMATION_TIP}
        />
      </div>

      <div className="space-y-3">
        <Label>State filing speed</Label>
        <RadioGroup className="gap-3"
          value={company.filingSpeed}
          onValueChange={(v) => setField("company", "filingSpeed", String(v))}
        >
          {FILING_SPEEDS.map((speed) => (
            <div key={speed.id} className="flex items-center gap-2">
              <RadioGroupItem value={speed.id} id={`speed-${speed.id}`} />
              <Label htmlFor={`speed-${speed.id}`} className="flex-1 font-normal">
                {speed.label}
              </Label>
              <span className="tabular-nums text-muted-foreground">
                {speed.price === 0 ? "Included" : money(speed.price)}
              </span>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>Where should your non-registered agent mail be delivered?</Label>
        <RadioGroup className="gap-3"
          value={company.mailDelivery}
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
      </div>
    </div>
  );
}
