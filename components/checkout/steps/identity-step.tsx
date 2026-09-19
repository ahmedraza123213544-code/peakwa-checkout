"use client";

import { IDENTITY_OPTIONS } from "@/lib/checkout-config";
import { OptionRow } from "../option-row";
import type { StepProps } from "../types";

export function IdentityStep({ state, setSelected }: StepProps) {
  return (
    <div className="space-y-5">
      <p className="max-w-prose text-[15px] text-muted-foreground">
        Registered agent and business formation are billed as their own lines. Tick
        the items you want below. Only what you choose appears in your order.
      </p>
      <div className="space-y-3">
        {IDENTITY_OPTIONS.map((option) => (
          <OptionRow
            key={option.id}
            option={option}
            checked={Boolean(state.selected[option.id])}
            onChange={(checked) => setSelected(option.id, checked)}
          />
        ))}
      </div>
    </div>
  );
}
