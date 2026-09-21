"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FILING_SPEEDS,
  FILING_TIP,
  FORMATION_TIERS,
  FORMATION_TIP,
} from "@/lib/checkout-config";
import { money } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { ExtraBox } from "./extra-box";
import { InfoTip } from "./info-tip";
import type { StepProps } from "./types";

export function FormationExtras({ state, setField }: Pick<StepProps, "state" | "setField">) {
  const company = state.company;
  const selectedSpeed =
    FILING_SPEEDS.find((speed) => speed.id === company.filingSpeed) ??
    FILING_SPEEDS[0];

  return (
    <div className="space-y-6">
      <ExtraBox
        title="Formation package"
        description="Choose how much help you want with the filing. Registered agent is billed as its own line."
      >
        <div className="mb-1 flex items-center gap-1 text-sm font-medium">
          Package
          <InfoTip title="Business Formation Service" text={FORMATION_TIP} />
        </div>
        <RadioGroup
          className="gap-3"
          value={company.formationTier}
          onValueChange={(v) => setField("company", "formationTier", String(v))}
        >
          {Object.values(FORMATION_TIERS).map((tier) => (
            <div
              key={tier.id}
              className={cn(
                "flex items-start gap-3 rounded-lg border bg-background p-3.5",
                company.formationTier === tier.id &&
                  "border-primary/40 bg-primary/5",
              )}
            >
              <RadioGroupItem
                value={tier.id}
                id={`tier-${tier.id}`}
                className="mt-1"
              />
              <Label
                htmlFor={`tier-${tier.id}`}
                className="flex flex-1 flex-col items-start gap-1 font-normal"
              >
                <span className="font-medium">
                  {money(tier.price)} — {tier.label}
                </span>
                <span className="text-[13px] leading-relaxed text-muted-foreground">
                  {tier.summary}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </ExtraBox>

      <ExtraBox
        title="Filing options"
        description="How quickly the state should process your formation filing."
        footer={
          <p className="border-t pt-3 text-sm font-medium">
            Total cost for this filing option:{" "}
            {selectedSpeed.price === 0 ? "Included" : money(selectedSpeed.price)}
          </p>
        }
      >
        <div className="mb-1 flex items-center gap-1 text-sm font-medium">
          State filing speed
          <InfoTip title="Filing options" text={FILING_TIP} />
        </div>
        <RadioGroup
          className="gap-3"
          value={company.filingSpeed}
          onValueChange={(v) => setField("company", "filingSpeed", String(v))}
        >
          {FILING_SPEEDS.map((speed) => (
            <div
              key={speed.id}
              className={cn(
                "flex items-start gap-3 rounded-lg border bg-background p-3.5",
                company.filingSpeed === speed.id &&
                  "border-primary/40 bg-primary/5",
              )}
            >
              <RadioGroupItem
                value={speed.id}
                id={`speed-${speed.id}`}
                className="mt-1"
              />
              <Label
                htmlFor={`speed-${speed.id}`}
                className="flex flex-1 flex-col items-start gap-0.5 font-normal"
              >
                <span className="font-medium">
                  {speed.price === 0 ? "Included" : money(speed.price)} —{" "}
                  {speed.label}
                </span>
                <span className="text-[13px] text-muted-foreground">
                  {speed.days}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </ExtraBox>
    </div>
  );
}
