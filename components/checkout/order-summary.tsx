"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CheckoutState } from "@/lib/checkout-state";
import { buildSummary, money, type SummaryLine } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { InfoTip } from "./info-tip";

function SummaryRow({
  line,
  nested = false,
}: {
  line: SummaryLine;
  nested?: boolean;
}) {
  return (
    <div className={cn(nested && "pl-5")}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-0.5">
          <div className="flex items-start gap-1.5">
            <p className={cn("min-w-0 leading-snug", nested && "text-[15px]")}>
              {line.label}
            </p>
            {line.tip ? (
              <InfoTip
                title={line.label}
                text={line.tip}
                className="mt-0.5"
              />
            ) : null}
          </div>
          {line.note ? (
            <p className="text-[13px] text-muted-foreground">{line.note}</p>
          ) : null}
        </div>
        <span
          className={cn(
            "shrink-0 tabular-nums",
            nested ? "text-sm text-muted-foreground" : "font-medium",
          )}
        >
          {money(line.amount)}
        </span>
      </div>
      {line.children?.length ? (
        <div className="mt-2 space-y-2">
          {line.children.map((child) => (
            <SummaryRow key={child.id} line={child} nested />
          ))}
        </div>
      ) : null}
    </div>
  );
}

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
          <SummaryRow key={line.id} line={line} />
        ))}
        <Separator />
        <div className="flex items-baseline justify-between">
          <span className="text-base font-semibold">Total</span>
          <span className="text-2xl font-semibold tabular-nums text-primary">
            {money(total)}
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          By clicking &quot;Submit Order&quot;, you acknowledge your order includes
          subscription services and accept the{" "}
          <Link
            href="/terms"
            className="text-primary underline-offset-2 hover:underline"
          >
            terms
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
}
