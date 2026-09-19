"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CheckoutState } from "@/lib/checkout-state";
import { buildSummary, money } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { InfoTip } from "./info-tip";

export function OrderSummary({
  state,
  className,
}: {
  state: CheckoutState;
  className?: string;
}) {
  const { lines, total } = buildSummary(state);

  return (
    <Card className={cn("gap-4", className)}>
      <CardHeader>
        <CardTitle className="text-xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3.5">
        {lines.map((line) => (
          <div key={line.id} className="flex items-start justify-between gap-4">
            <div className="space-y-0.5">
              <p className="leading-snug">
                {line.label}
                {line.tip ? (
                  <>
                    {" "}
                    <InfoTip text={line.tip} />
                  </>
                ) : null}
              </p>
              {line.note ? (
                <p className="text-[13px] text-muted-foreground">{line.note}</p>
              ) : null}
            </div>
            <span className="font-medium tabular-nums">{money(line.amount)}</span>
          </div>
        ))}
        <Separator />
        <div className="flex items-baseline justify-between">
          <span className="text-base font-semibold">Total</span>
          <span className="text-2xl font-semibold tabular-nums text-primary">
            {money(total)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
