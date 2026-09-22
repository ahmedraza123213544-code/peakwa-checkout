import {
  CHANGE_AGENT_FILING,
  CHANGE_AGENT_TIP,
  FILING_SPEEDS,
  FILING_TIP,
  FORMATION_TIER,
  FORMATION_TIERS,
  IDENTITY_OPTIONS,
  IDENTITY_PACKAGE,
  IDENTITY_PACKAGE_ITEMS,
  MAIL_SCAN_TIERS,
  MAIL_SCAN_TIP,
  REGISTERED_AGENT,
  RECOMMENDED_OPTIONS,
  RENEWAL_FILINGS_TIP,
  SERVICE_YEARS,
  type FormationTierId,
  type Option,
} from "./checkout-config";
import type { CheckoutState } from "./checkout-state";

export type SummaryLine = {
  id: string;
  label: string;
  amount: number;
  note?: string;
  tip?: string;
  children?: SummaryLine[];
};

export const money = (amount: number) => `$${amount.toFixed(2)}`;

function lineTotal(line: SummaryLine): number {
  const childTotal = (line.children ?? []).reduce(
    (sum, child) => sum + lineTotal(child),
    0,
  );
  return line.amount + childTotal;
}

export function getFormationTier(state: CheckoutState) {
  const id = state.company.formationTier as FormationTierId;
  return FORMATION_TIERS[id] ?? FORMATION_TIERS[FORMATION_TIER];
}

export function getServiceYears(state: CheckoutState) {
  return (
    SERVICE_YEARS.find((item) => item.id === state.company.yearsOfService) ??
    SERVICE_YEARS[0]
  );
}

export function changeAgentFeeWaived(state: CheckoutState) {
  return getServiceYears(state).years > 1;
}

export function changeAgentTotal(state: CheckoutState) {
  const speed =
    CHANGE_AGENT_FILING.speeds.find(
      (item) => item.id === state.company.agentFilingSpeed,
    ) ?? CHANGE_AGENT_FILING.speeds[0];
  const ourFee = changeAgentFeeWaived(state) ? 0 : CHANGE_AGENT_FILING.ourFee;
  return { speed, ourFee, total: ourFee + speed.stateFee };
}

export function buildSummary(state: CheckoutState) {
  const tier = getFormationTier(state);
  const years = getServiceYears(state);
  const speed = FILING_SPEEDS.find((s) => s.id === state.company.filingSpeed);
  const prepaidRenewals = Math.max(0, years.years - 1);
  const raAmount =
    REGISTERED_AGENT.firstYearPrice +
    prepaidRenewals * REGISTERED_AGENT.renewalPrice;

  const lines: SummaryLine[] = [
    {
      id: "registered-agent",
      label:
        years.years === 1
          ? "1 Year of Registered Agent Service"
          : `${years.years} Years of Registered Agent Service`,
      amount: raAmount,
    },
    {
      id: "formation",
      label: `Business Formation Service (${tier.label})`,
      amount: tier.price,
      children: tier.includes.map((item) => ({
        id: `formation-${item.id}`,
        label: item.label,
        amount: 0,
      })),
    },
  ];

  if (speed && speed.price > 0) {
    lines.push({
      id: "filing-speed",
      label: `${speed.label} filing`,
      amount: speed.price,
      note: speed.days,
      tip: FILING_TIP,
    });
  }

  if (
    state.company.changingAgent === "Yes" &&
    state.company.hireChangeAgent === "yes"
  ) {
    const agent = changeAgentTotal(state);
    lines.push({
      id: "change-agent-filing",
      label: "Change Registered Agent Filing",
      amount: agent.total,
      note: agent.ourFee
        ? `${money(agent.ourFee)} our fee + ${money(agent.speed.stateFee)} state fee`
        : `Change of agent fee waived. ${money(agent.speed.stateFee)} state fee.`,
      tip: CHANGE_AGENT_TIP,
    });
  }

  if (state.selected[IDENTITY_PACKAGE.id]) {
    lines.push({
      id: IDENTITY_PACKAGE.id,
      label: IDENTITY_PACKAGE.label,
      amount: 0,
      tip: IDENTITY_PACKAGE.tip,
      children: IDENTITY_PACKAGE_ITEMS.map((option) => ({
        id: option.id,
        label: option.label,
        amount: option.price,
        note: option.note,
        tip: option.tip,
      })),
    });
    for (const option of IDENTITY_OPTIONS) {
      if (IDENTITY_PACKAGE_ITEMS.some((item) => item.id === option.id)) continue;
      if (!state.selected[option.id]) continue;
      lines.push({
        id: option.id,
        label: option.label,
        amount: option.price,
        note: option.note,
        tip: option.tip,
      });
    }
  } else {
    for (const option of IDENTITY_OPTIONS) {
      if (!state.selected[option.id]) continue;
      lines.push({
        id: option.id,
        label: option.label,
        amount: option.price,
        note: option.note,
        tip: option.tip,
      });
    }
  }

  lines.push({
    id: "renewal-filings",
    label: "Renewal Filings",
    amount: 0,
    tip: RENEWAL_FILINGS_TIP,
  });

  if (state.company.mailDelivery === "our-office") {
    const scan =
      MAIL_SCAN_TIERS.find((item) => item.id === state.company.mailScan) ??
      MAIL_SCAN_TIERS[0];
    lines.push({
      id: "mail-scanning",
      label: "Mail Scanning Service",
      amount: scan.price,
      note: scan.price ? `${money(scan.price)}/year` : "Free tier - 3 documents/year",
      tip: MAIL_SCAN_TIP,
    });
  }

  for (const option of RECOMMENDED_OPTIONS) {
    if (!state.selected[option.id]) continue;

    const extraSpeedId = state.extras[`${option.id}-filing`];
    const extraSpeed = extraFilingSpeed(option, extraSpeedId);
    const extraAmount = extraFilingAmount(option, extraSpeedId);

    lines.push({
      id: option.id,
      label: option.label,
      amount: option.price + extraAmount,
      note: extraSpeed && extraSpeed.price > 0 ? extraSpeed.label : option.note,
      tip: option.tip,
    });

    if (option.related) {
      lines.push({
        id: option.related.id,
        label: option.related.label,
        amount: option.related.price,
        tip: option.related.tip,
      });
    }
  }

  const total = lines.reduce((sum, line) => sum + lineTotal(line), 0);
  return { lines, total };
}

export function extraFilingSpeeds(option: Option) {
  return option.extraFiling?.speeds ?? FILING_SPEEDS;
}

export function extraFilingSpeed(option: Option, speedId?: string) {
  if (!option.extraFiling) return undefined;
  const speeds = extraFilingSpeeds(option);
  return speeds.find((item) => item.id === speedId) ?? speeds[0];
}

export function extraFilingAmount(option: Option, speedId?: string) {
  if (!option.extraFiling || option.extraFiling.stateFeeIncluded) return 0;
  return extraFilingSpeed(option, speedId)?.price ?? 0;
}

export function optionAmount(option: Option, extras: Record<string, string>) {
  return option.price + extraFilingAmount(option, extras[`${option.id}-filing`]);
}
