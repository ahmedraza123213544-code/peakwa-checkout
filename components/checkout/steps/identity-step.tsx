"use client";

import { useId } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { IDENTITY_PACKAGE, IDENTITY_PACKAGE_ITEMS } from "@/lib/checkout-config";
import type { StepProps } from "../types";

export function IdentityStep({ state, setSelected }: StepProps) {
  const id = useId();
  const checked = Boolean(state.selected[IDENTITY_PACKAGE.id]);

  return (
    <div className="space-y-5">
      <p className="max-w-xl text-[15px] leading-relaxed">
        {IDENTITY_PACKAGE.intro}
      </p>
      <div className="flex items-start gap-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(value) => {
            const next = Boolean(value);
            setSelected(IDENTITY_PACKAGE.id, next);
            if (next) {
              IDENTITY_PACKAGE_ITEMS.forEach((option) =>
                setSelected(option.id, true),
              );
            }
          }}
          className="mt-0.5"
        />
        <Label htmlFor={id} className="font-normal leading-snug">
          {IDENTITY_PACKAGE.checkboxLabel}
        </Label>
      </div>
    </div>
  );
}
