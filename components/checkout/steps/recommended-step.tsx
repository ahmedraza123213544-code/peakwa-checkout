"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  IDENTITY_OPTIONS,
  IDENTITY_PACKAGE,
  RECOMMENDED_OPTIONS,
  type Option,
} from "@/lib/checkout-config";
import { extraFilingSpeeds, money } from "@/lib/pricing";
import { ExtraBox } from "../extra-box";
import { FormationExtras } from "../formation-extras";
import { TextField } from "../fields";
import { OptionRow } from "../option-row";
import type { StepProps } from "../types";

export function RecommendedStep({
  state,
  errors,
  setField,
  setSelected,
  setExtra,
}: StepProps) {
  return (
    <div className="space-y-8">
      <FormationExtras state={state} setField={setField} />

      <section className="space-y-4">
        <h3 className="text-lg font-medium">
          {IDENTITY_PACKAGE.alacarteTitle}
        </h3>
        <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          {IDENTITY_PACKAGE.alacarteIntro}
        </p>
        <p className="max-w-xl text-[15px] font-medium">
          {IDENTITY_PACKAGE.bundleNote}
        </p>
        <div className="space-y-4">
          {IDENTITY_OPTIONS.map((option) => (
            <OptionRow
              key={option.id}
              option={option}
              checked={Boolean(state.selected[option.id])}
              showPrice={false}
              onChange={(value) => {
                setSelected(option.id, value);
                if (!value && state.selected[IDENTITY_PACKAGE.id]) {
                  setSelected(IDENTITY_PACKAGE.id, false);
                }
              }}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Additional Items</h3>
        {RECOMMENDED_OPTIONS.map((option) => (
          <AdditionalItemRow
            key={option.id}
            option={option}
            state={state}
            errors={errors}
            setSelected={setSelected}
            setExtra={setExtra}
          />
        ))}
      </section>
    </div>
  );
}

function AdditionalItemRow({
  option,
  state,
  errors,
  setSelected,
  setExtra,
}: {
  option: Option;
  state: StepProps["state"];
  errors: StepProps["errors"];
  setSelected: StepProps["setSelected"];
  setExtra: StepProps["setExtra"];
}) {
  const checked = Boolean(state.selected[option.id]);
  const filingId = `${option.id}-filing`;
  const speeds = extraFilingSpeeds(option);
  const defaultSpeed = speeds[0]?.id ?? "standard";
  const filingSpeed = state.extras[filingId] || defaultSpeed;
  const selectedSpeed =
    speeds.find((speed) => speed.id === filingSpeed) ?? speeds[0];
  const ourFee = option.extraFiling?.ourFee ?? option.price;

  return (
    <OptionRow
      option={option}
      checked={checked}
      onChange={(value) => {
        setSelected(option.id, value);
        if (value && option.extraFiling && !state.extras[filingId]) {
          setExtra(filingId, defaultSpeed);
        }
      }}
      extra={
        option.extraField || option.extraFiling ? (
          <div className="ml-7 space-y-4">
            {option.extraField ? (
              <TextField
                label={option.extraField.label}
                value={state.extras[option.extraField.key] ?? ""}
                placeholder={option.extraField.placeholder}
                error={errors[`extras.${option.extraField.key}`]}
                onChange={(value) => setExtra(option.extraField!.key, value)}
              />
            ) : null}
            {option.extraFiling && selectedSpeed ? (
              <ExtraBox
                title={option.extraFiling.title}
                description={`${money(ourFee)} — Our fee`}
                footer={
                  <p className="border-t pt-3 text-sm font-medium">
                    Total cost for this filing product:{" "}
                    {money(ourFee + selectedSpeed.price)}
                  </p>
                }
              >
                <RadioGroup
                  className="gap-3"
                  value={filingSpeed}
                  onValueChange={(value) => setExtra(filingId, String(value))}
                >
                  {speeds.map((speed) => (
                    <div key={speed.id} className="flex items-start gap-3">
                      <RadioGroupItem
                        value={speed.id}
                        id={`${option.id}-${speed.id}`}
                        className="mt-1"
                      />
                      <Label
                        htmlFor={`${option.id}-${speed.id}`}
                        className="flex flex-col items-start gap-0.5 font-normal"
                      >
                        <span className="font-medium">
                          {money(speed.price)} — {speed.label}
                        </span>
                        <span className="text-[13px] text-muted-foreground">
                          {speed.days}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </ExtraBox>
            ) : null}
          </div>
        ) : option.note ? (
          <p className="ml-7 text-[13px] text-muted-foreground">{option.note}</p>
        ) : null
      }
    />
  );
}
