"use client";

import { CircleCheck, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HERO, STEPS } from "@/lib/checkout-config";
import { initialState, type CheckoutState } from "@/lib/checkout-state";
import { buildSummary, money } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { OrderSummary } from "./order-summary";
import { AccountStep } from "./steps/account-step";
import { CardProcessingStep } from "./steps/card-processing-step";
import { CompanyStep } from "./steps/company-step";
import { ContactStep } from "./steps/contact-step";
import { IdentityStep } from "./steps/identity-step";
import { PaymentStep } from "./steps/payment-step";
import { ServicesStep } from "./steps/services-step";
import type { Section, StepProps } from "./types";

const STEP_COMPONENTS = {
  company: CompanyStep,
  contact: ContactStep,
  account: AccountStep,
  identity: IdentityStep,
  services: ServicesStep,
  "card-processing": CardProcessingStep,
  payment: PaymentStep,
};

export function Checkout() {
  const [state, setState] = useState<CheckoutState>(initialState);
  const [stepIndex, setStepIndex] = useState(0);
  const [placed, setPlaced] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    tabRefs.current[stepIndex]?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, [stepIndex]);

  const setField = (section: Section, key: string, value: string) =>
    setState((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));

  const setSelected = (id: string, checked: boolean) =>
    setState((prev) => ({
      ...prev,
      selected: { ...prev.selected, [id]: checked },
    }));

  const goTo = (index: number) => {
    setStepIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const step = STEPS[stepIndex];
  const StepComponent = STEP_COMPONENTS[step.id];
  const isLast = stepIndex === STEPS.length - 1;
  const stepProps: StepProps = { state, setField, setSelected };

  const restart = () => {
    setState(initialState);
    setPlaced(false);
    goTo(0);
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
            {HERO.highlights.map((item) => (
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
                {STEPS.map((s, index) => (
                  <button
                    key={s.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => goTo(index)}
                    className={cn(
                      "flex-1 shrink-0 whitespace-nowrap border-r px-4 py-4 text-xs font-bold uppercase tracking-wide transition-colors last:border-r-0",
                      index === stepIndex
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </nav>
              <div className="space-y-6 px-4 py-6 sm:px-8 sm:py-8">
                <h2 className="text-xl font-semibold">{step.label}</h2>
                <StepComponent {...stepProps} />
                <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-between">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                    disabled={stepIndex === 0}
                    onClick={() => goTo(stepIndex - 1)}
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() =>
                      isLast ? setPlaced(true) : goTo(stepIndex + 1)
                    }
                  >
                    {isLast ? "Place order" : "Continue"}
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
