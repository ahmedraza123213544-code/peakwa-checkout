"use client";

import { SERVICE_OPTIONS } from "@/lib/checkout-config";
import { OptionRow } from "../option-row";
import type { StepProps } from "../types";

export function ServicesStep({ state, setSelected }: StepProps) {
  return (
    <div className="space-y-5">
      <p className="max-w-prose text-[15px] text-muted-foreground">
        Tell us what else you need set up alongside your formation. Select any that
        apply.
      </p>
      <div className="space-y-3">
        {SERVICE_OPTIONS.map((option) => (
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
