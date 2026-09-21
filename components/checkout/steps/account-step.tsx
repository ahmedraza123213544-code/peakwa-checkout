"use client";

import { Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PASSWORD_RULES } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { TextField } from "../fields";
import type { StepProps } from "../types";

function generatePassword() {
  const lower = "abcdefghijkmnopqrstuvwxyz";
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const nums = "23456789";
  const special = "!@#$%&*";
  const pick = (set: string) => set[Math.floor(Math.random() * set.length)]!;
  const chars = [pick(lower), pick(upper), pick(nums), pick(special)];
  const all = lower + upper + nums + special;
  while (chars.length < 12) chars.push(pick(all));
  return chars.sort(() => Math.random() - 0.5).join("");
}

export function AccountStep({ state, setField, errors }: StepProps) {
  const account = state.account;
  const set = (key: string) => (value: string) => setField("account", key, value);

  const fillPassword = () => {
    const password = generatePassword();
    setField("account", "password", password);
    setField("account", "confirmPassword", password);
  };

  return (
    <div className="space-y-5">
      <TextField
        label="Email"
        type="email"
        value={account.email}
        error={errors["account.email"]}
        onChange={set("email")}
        autoComplete="email"
      />
      <TextField
        label="Password"
        type="password"
        value={account.password}
        error={errors["account.password"]}
        onChange={set("password")}
        autoComplete="new-password"
        action={
          <Button
            type="button"
            size="sm"
            className="absolute top-1.5 right-1.5 h-7"
            onClick={fillPassword}
          >
            Generate Password
          </Button>
        }
      />
      <TextField
        label="Confirm password"
        type="password"
        value={account.confirmPassword}
        error={errors["account.confirmPassword"]}
        onChange={set("confirmPassword")}
        autoComplete="new-password"
      />
      <ul className="space-y-1.5 text-[15px] text-muted-foreground">
        {PASSWORD_RULES.map((rule) => {
          const met = rule.test(account.password);
          return (
            <li key={rule.label} className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex size-[18px] items-center justify-center rounded-full text-[11px] font-bold",
                  met
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted-foreground/70 text-background",
                )}
              >
                {met ? "✓" : "!"}
              </span>
              {rule.label}
            </li>
          );
        })}
        <li className="flex items-center gap-2">
          {account.password.length > 0 &&
          account.password === account.confirmPassword ? (
            <span className="inline-flex size-[18px] items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
              ✓
            </span>
          ) : (
            <Circle className="size-3.5 text-muted-foreground" />
          )}
          Passwords must match
        </li>
      </ul>
    </div>
  );
}
