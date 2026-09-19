import {
  CARD_PROCESSING_OPTION,
  FILING_SPEEDS,
  FORMATION_TIER,
  FORMATION_TIERS,
  FORMATION_TIP,
  IDENTITY_OPTIONS,
  REGISTERED_AGENT,
  REGISTERED_AGENT_TIP,
  SERVICE_OPTIONS,
  type Option,
} from "./checkout-config";
import type { CheckoutState } from "./checkout-state";

export type SummaryLine = {
  id: string;
  label: string;
  amount: number;
  note?: string;
  tip?: string;
};

export const money = (amount: number) => `$${amount.toFixed(2)}`;

function optionLines(
  options: Option[],
  selected: Record<string, boolean>,
): SummaryLine[] {
  return options
    .filter((option) => selected[option.id])
    .map((option) => ({
      id: option.id,
      label: option.label,
      amount: option.price,
      note: option.note,
      tip: option.tip,
    }));
}

export function buildSummary(state: CheckoutState) {
  const tier = FORMATION_TIERS[FORMATION_TIER];
  const speed = FILING_SPEEDS.find((s) => s.id === state.company.filingSpeed);

  const lines: SummaryLine[] = [
    {
      id: "registered-agent",
      label: "Registered Agent Subscription, year 1",
      amount: REGISTERED_AGENT.firstYearPrice,
      note: `Free the first year, then ${money(REGISTERED_AGENT.renewalPrice)}/yr.`,
      tip: REGISTERED_AGENT_TIP,
    },
    {
      id: "formation",
      label: `Business Formation Service (${tier.label})`,
      amount: tier.price,
      tip: FORMATION_TIP,
    },
  ];

  if (speed && speed.price > 0) {
    lines.push({
      id: "filing-speed",
      label: `${speed.label.split(" (")[0]} filing speed`,
      amount: speed.price,
      tip: "How fast the state processes your filing.",
    });
  }

  lines.push(
    ...optionLines(IDENTITY_OPTIONS, state.selected),
    ...optionLines(SERVICE_OPTIONS, state.selected),
    ...optionLines([CARD_PROCESSING_OPTION], state.selected),
  );

  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  return { lines, total };
}
