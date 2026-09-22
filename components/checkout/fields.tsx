"use client";

import { useId, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InfoTip } from "./info-tip";

function FieldLabel({
  htmlFor,
  label,
  tip,
}: {
  htmlFor?: string;
  label: string;
  tip?: string;
}) {
  return (
    <div className="flex items-center gap-1">
      <Label htmlFor={htmlFor}>{label}</Label>
      {tip ? <InfoTip title={label} text={tip} /> : null}
    </div>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-[13px] font-medium text-destructive">{message}</p>;
}

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  tip,
  error,
  action,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  tip?: string;
  error?: string;
  action?: ReactNode;
}) {
  const id = useId();
  return (
    <div className="space-y-2">
      <FieldLabel htmlFor={id} label={label} tip={tip} />
      <div className="relative">
        <Input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          className={action ? "pr-40" : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
        {action}
      </div>
      <FieldError message={error} />
    </div>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  tip,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[] | readonly { value: string; label: string }[];
  placeholder?: string;
  tip?: string;
  error?: string;
}) {
  const id = useId();
  const items = options.map((option) =>
    typeof option === "string"
      ? { value: option, label: option }
      : option,
  );
  return (
    <div className="space-y-2">
      <FieldLabel htmlFor={id} label={label} tip={tip} />
      <Select
        value={value || null}
        onValueChange={(v: string | null) => onChange(v ?? "")}
        items={items}
      >
        <SelectTrigger
          id={id}
          className="w-full"
          aria-invalid={Boolean(error)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError message={error} />
    </div>
  );
}
