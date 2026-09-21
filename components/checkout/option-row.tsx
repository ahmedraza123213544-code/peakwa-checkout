"use client";

import { useId, type ReactNode } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Option } from "@/lib/checkout-config";
import { money } from "@/lib/pricing";
import { InfoTip } from "./info-tip";

export function OptionRow({
  option,
  checked,
  onChange,
  extra,
  showPrice = true,
}: {
  option: Option;
  checked: boolean;
  onChange: (checked: boolean) => void;
  extra?: ReactNode;
  showPrice?: boolean;
}) {
  const id = useId();
  const price =
    option.price === 0 ? "Free" : money(option.price).replace(".00", "");

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(value) => onChange(Boolean(value))}
          className="mt-0.5"
        />
        <div className="flex-1">
          <div className="flex items-start gap-1.5">
            <Label htmlFor={id} className="min-w-0 font-normal leading-snug">
              {showPrice ? `${option.label} — ${price}` : option.label}
            </Label>
            <InfoTip title={option.label} text={option.tip} className="mt-0.5" />
          </div>
          {showPrice && option.note && !checked ? (
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              {option.note}
            </p>
          ) : null}
        </div>
      </div>
      {checked && extra ? extra : null}
    </div>
  );
}
