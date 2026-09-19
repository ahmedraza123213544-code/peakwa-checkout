"use client";

import { useId } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Option } from "@/lib/checkout-config";
import { money } from "@/lib/pricing";
import { InfoTip } from "./info-tip";

export function OptionRow({
  option,
  checked,
  onChange,
}: {
  option: Option;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="flex items-start gap-3 rounded-xl border p-3.5">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onChange(Boolean(value))}
        className="mt-0.5"
      />
      <div className="flex-1 space-y-0.5">
        <p className="leading-snug">
          <Label htmlFor={id} className="inline font-medium">
            {option.label}
          </Label>{" "}
          <InfoTip text={option.tip} />
        </p>
        {option.note ? (
          <p className="text-[13px] text-muted-foreground">{option.note}</p>
        ) : null}
      </div>
      <span className="text-sm font-medium tabular-nums">
        {option.price === 0 ? "Free" : money(option.price)}
      </span>
    </div>
  );
}
