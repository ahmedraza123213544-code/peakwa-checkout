"use client";

import { CircleCheck, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HERO, visibleSteps, type StepId } from "@/lib/checkout-config";
import { initialState, type CheckoutState } from "@/lib/checkout-state";
import { buildSummary, money } from "@/lib/pricing";
import { validateStep } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { InfoTip } from "./info-tip";
import { OrderSummary } from "./order-summary";
import { AccountStep } from "./steps/account-step";
import { CompanyStep } from "./steps/company-step";
import { ContactStep } from "./steps/contact-step";
import { FilingStep } from "./steps/filing-step";
import { IdentityStep } from "./steps/identity-step";
import { PaymentStep } from "./steps/payment-step";
import { RecommendedStep } from "./steps/recommended-step";
import type { Section, StepProps } from "./types";

const STEP_COMPONENTS = {
  company: CompanyStep,
  filing: FilingStep,
  contact: ContactStep,
  account: AccountStep,
  identity: IdentityStep,
  recommended: RecommendedStep,
  payment: PaymentStep,
};

export function Checkout() {
  const [state, setState] = useState<CheckoutState>(initialState);
  const [stepId, setStepId] = useState<StepId>("company");
  const [placed, setPlaced] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const hireUs = state.company.hireChangeAgent === "yes";
  const steps = visibleSteps(hireUs);
  const stepIndex = Math.max(
    0,
    steps.findIndex((item) => item.id === stepId),
  );
  const step = steps[stepIndex] ?? steps[0];

  useEffect(() => {
    if (!steps.some((item) => item.id === stepId)) {
      setStepId("company");
    }
  }, [steps, stepId]);

  useEffect(() => {
    tabRefs.current[stepIndex]?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, [stepIndex]);

  const setField = (section: Section, key: string, value: string) => {
    setState((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`${section}.${key}`];
      return next;
    });
  };

  const setSelected = (id: string, checked: boolean) =>
    setState((prev) => ({
      ...prev,
      selected: { ...prev.selected, [id]: checked },
    }));

  const setExtra = (key: string, value: string) =>
    setState((prev) => ({
      ...prev,
      extras: { ...prev.extras, [key]: value },
    }));

  const goTo = (id: StepId) => {
    setErrors({});
    setStepId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const StepComponent = STEP_COMPONENTS[step.id];
  const isLast = stepIndex === steps.length - 1;
  const stepProps: StepProps = {
    state,
    errors,
    setField,
    setSelected,
    setExtra,
  };

  const continueOn = () => {
    const nextErrors = validateStep(step.id, state);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    if (isLast) {
      setPlaced(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    goTo(steps[stepIndex + 1]!.id);
  };

  const restart = () => {
    setState(initialState);
    setErrors({});
    setPlaced(false);
    goTo("company");
  };

  return (
    <>
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            <ShieldCheck className="size-3.5" />
            {HERO.eyebrow}
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            {HERO.title} <span className="text-primary">{HERO.accent}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {HERO.subtitle}
          </p>
          <ul className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-2.5 text-sm font-medium text-foreground/80">
            {[`${steps.length} simple steps`, ...HERO.highlights].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CircleCheck className="size-[18px] text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        {placed ? (
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle>Order received</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your order total is {money(buildSummary(state).total)}.
              </p>
              <Button onClick={restart}>Start over</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1fr_360px] xl:items-start">
            <Card className="gap-0 overflow-hidden p-0">
              <nav className="flex overflow-x-auto border-b [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {steps.map((item, index) => (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => goTo(item.id)}
                    className={cn(
                      "flex-1 shrink-0 whitespace-nowrap border-r px-4 py-4 text-xs font-bold uppercase tracking-wide transition-colors last:border-r-0",
                      index === stepIndex
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
              <div className="space-y-6 px-4 py-6 sm:px-8 sm:py-8">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                  {step.label}
                  {"tip" in step && step.tip ? (
                    <InfoTip title={step.title} text={step.tip} />
                  ) : null}
                </h2>
                <StepComponent {...stepProps} />
                <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-between">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                    disabled={stepIndex === 0}
                    onClick={() => goTo(steps[stepIndex - 1]!.id)}
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={continueOn}
                  >
                    {isLast ? "Submit Order" : "Continue"}
                  </Button>
                </div>
              </div>
            </Card>

            <OrderSummary state={state} className="xl:sticky xl:top-6" />
          </div>
        )}
      </main>
    </>
  );
}
