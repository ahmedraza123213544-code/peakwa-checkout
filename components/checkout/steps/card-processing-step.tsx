"use client";

import { CARD_PROCESSING_OPTION } from "@/lib/checkout-config";
import { OptionRow } from "../option-row";
import type { StepProps } from "../types";

export function CardProcessingStep({ state, setSelected }: StepProps) {
  return (
    <div className="space-y-5">
      <p className="max-w-prose text-[15px] text-muted-foreground">
        Want to accept credit cards from day one? We set you up with a processor and
        payment gateway. No cost to apply.
      </p>
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-3.5 text-[15px] font-medium text-primary">
        Sign up for processing and get a free credit card machine shipped to you.
      </div>
      <OptionRow
        option={CARD_PROCESSING_OPTION}
        checked={Boolean(state.selected[CARD_PROCESSING_OPTION.id])}
        onChange={(checked) => setSelected(CARD_PROCESSING_OPTION.id, checked)}
      />
    </div>
  );
}
