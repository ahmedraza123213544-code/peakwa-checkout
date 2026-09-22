"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CHANGE_AGENT_FILING, CHANGE_AGENT_TIP } from "@/lib/checkout-config";
import {
  changeAgentFeeWaived,
  changeAgentTotal,
  money,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { ExtraBox } from "../extra-box";
import { InfoTip } from "../info-tip";
import type { StepProps } from "../types";

export function FilingStep({ state, setField }: StepProps) {
  const company = state.company;
  const agent = changeAgentTotal(state);
  const agentWaived = changeAgentFeeWaived(state);

  return (
    <ExtraBox
      title="Change Registered Agent Filing Options"
      description={`${money(agentWaived ? 0 : CHANGE_AGENT_FILING.ourFee)} - Our fee${agentWaived ? " (waived when you order more than one year)" : ""}`}
      footer={
        <p className="border-t pt-3 text-sm font-medium">
          Total cost for this filing product: {money(agent.total)}
        </p>
      }
    >
      <div className="mb-1 flex items-center gap-1 text-sm font-medium">
        Filing speed
        <InfoTip title="Change Registered Agent Filing" text={CHANGE_AGENT_TIP} />
      </div>
      <RadioGroup
        className="gap-3"
        value={company.agentFilingSpeed}
        onValueChange={(v) => setField("company", "agentFilingSpeed", String(v))}
      >
        {CHANGE_AGENT_FILING.speeds.map((speed) => (
          <div
            key={speed.id}
            className={cn(
              "flex items-start gap-3 rounded-lg border bg-background p-3.5",
              company.agentFilingSpeed === speed.id &&
                "border-primary/40 bg-primary/5",
            )}
          >
            <RadioGroupItem
              value={speed.id}
              id={`agent-speed-${speed.id}`}
              className="mt-1"
            />
            <Label
              htmlFor={`agent-speed-${speed.id}`}
              className="flex flex-1 flex-col items-start gap-0.5 font-normal"
            >
              <span className="font-medium">
                {money(speed.stateFee)} - {speed.label}
              </span>
              <span className="text-[13px] text-muted-foreground">
                {speed.days}
              </span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </ExtraBox>
  );
}
