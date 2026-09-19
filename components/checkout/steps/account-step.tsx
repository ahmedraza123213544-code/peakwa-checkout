"use client";

import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextField } from "../fields";
import type { StepProps } from "../types";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  {
    label: "A lowercase and a capital letter",
    test: (p: string) => /[a-z]/.test(p) && /[A-Z]/.test(p),
  },
  { label: "At least one number", test: (p: string) => /\d/.test(p) },
  {
    label: "At least one special character",
    test: (p: string) => /[^A-Za-z0-9]/.test(p),
  },
];

export function AccountStep({ state, setField }: StepProps) {
  const account = state.account;
  const set = (key: string) => (value: string) => setField("account", key, value);

  return (
    <div className="space-y-5">
      <TextField label="Email" type="email" value={account.email} onChange={set("email")} autoComplete="email" />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Password" type="password" value={account.password} onChange={set("password")} autoComplete="new-password" />
        <TextField label="Confirm password" type="password" value={account.confirmPassword} onChange={set("confirmPassword")} autoComplete="new-password" />
      </div>
      <ul className="space-y-1.5 text-[15px]">
        {PASSWORD_RULES.map((rule) => {
          const met = rule.test(account.password);
          return (
            <li
              key={rule.label}
              className={cn("flex items-center gap-2", met ? "text-primary" : "text-muted-foreground")}
            >
              {met ? <Check className="size-4" /> : <Circle className="size-3" />}
              {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
