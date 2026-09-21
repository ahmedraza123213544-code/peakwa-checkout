import type { StepId } from "./checkout-config";
import type { CheckoutState } from "./checkout-state";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function required(value: string, label: string) {
  return value.trim() ? "" : `${label} is required`;
}

export const PASSWORD_RULES = [
  { label: "Password is required", test: (p: string) => p.length > 0 },
  { label: "Password must be at least 8 characters", test: (p: string) => p.length >= 8 },
  {
    label: "Password must contain at least one lowercase letter",
    test: (p: string) => /[a-z]/.test(p),
  },
  {
    label: "Password must contain at least one capital letter",
    test: (p: string) => /[A-Z]/.test(p),
  },
  {
    label: "Password must contain at least one number",
    test: (p: string) => /\d/.test(p),
  },
  {
    label: "Password must contain at least one special character",
    test: (p: string) => /[^A-Za-z0-9]/.test(p),
  },
];

export function validateStep(
  stepId: StepId,
  state: CheckoutState,
): Record<string, string> {
  const errors: Record<string, string> = {};
  const add = (key: string, message: string) => {
    if (message) errors[key] = message;
  };

  if (stepId === "company") {
    add("company.name", required(state.company.name, "Company name"));
    add("company.state", required(state.company.state, "State of formation"));
    add(
      "company.changingAgent",
      required(state.company.changingAgent, "Changing registered agent"),
    );
    add(
      "company.mailDelivery",
      required(state.company.mailDelivery, "Mail delivery"),
    );
    if (state.company.notifyAttorney === "Yes") {
      add(
        "company.attorneyEmail",
        required(state.company.attorneyEmail, "Attorney email"),
      );
      if (
        state.company.attorneyEmail &&
        !EMAIL.test(state.company.attorneyEmail)
      ) {
        errors["company.attorneyEmail"] = "Enter a valid email";
      }
    }
  }

  if (stepId === "contact") {
    add("contact.firstName", required(state.contact.firstName, "First name"));
    add("contact.lastName", required(state.contact.lastName, "Last name"));
    add("contact.phone", required(state.contact.phone, "Phone number"));
    add("contact.country", required(state.contact.country, "Country"));
    add("contact.address", required(state.contact.address, "Address"));
    add("contact.city", required(state.contact.city, "City"));
    add("contact.state", required(state.contact.state, "State / Province"));
    add("contact.zip", required(state.contact.zip, "Zip / Postal"));
  }

  if (stepId === "account") {
    add("account.email", required(state.account.email, "Email"));
    if (state.account.email && !EMAIL.test(state.account.email)) {
      errors["account.email"] = "Enter a valid email";
    }
    const failed = PASSWORD_RULES.find((rule) => !rule.test(state.account.password));
    if (failed) errors["account.password"] = failed.label;
    if (state.account.password !== state.account.confirmPassword) {
      errors["account.confirmPassword"] = "Passwords must match";
    }
  }

  if (stepId === "recommended") {
    for (const option of [
      { selected: "dba-trade-name", key: "dba-name", label: "Trade name" },
      {
        selected: "business-license-research",
        key: "license-activity",
        label: "Business activity",
      },
    ]) {
      if (!state.selected[option.selected]) continue;
      add(
        `extras.${option.key}`,
        required(state.extras[option.key] ?? "", option.label),
      );
    }
  }

  if (stepId === "payment") {
    add("payment.firstName", required(state.payment.firstName, "First name on card"));
    add("payment.lastName", required(state.payment.lastName, "Last name on card"));
    add("payment.cardNumber", required(state.payment.cardNumber, "Card number"));
    add("payment.cvv", required(state.payment.cvv, "CVV / CVC"));
    add("payment.expMonth", required(state.payment.expMonth, "Exp. month"));
    add("payment.expYear", required(state.payment.expYear, "Exp. year"));
    if (state.payment.useOtherAddress === "yes") {
      add("payment.country", required(state.payment.country, "Country"));
      add("payment.address", required(state.payment.address, "Address"));
      add("payment.city", required(state.payment.city, "City"));
      add("payment.state", required(state.payment.state, "State / Province"));
      add("payment.zip", required(state.payment.zip, "Zip / Postal"));
    }
  }

  return errors;
}
