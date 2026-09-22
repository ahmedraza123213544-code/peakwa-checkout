import {
  FORMATION_TIER,
  IDENTITY_PACKAGE,
  IDENTITY_PACKAGE_ITEMS,
} from "./checkout-config";

export type CheckoutState = {
  company: {
    name: string;
    type: string;
    state: string;
    notifyAttorney: string;
    attorneyEmail: string;
    changingAgent: string;
    hireChangeAgent: string;
    yearsOfService: string;
    formationTier: string;
    filingSpeed: string;
    agentFilingSpeed: string;
    mailDelivery: string;
    mailScan: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  account: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  payment: {
    firstName: string;
    lastName: string;
    cardNumber: string;
    cvv: string;
    expMonth: string;
    expYear: string;
    useOtherAddress: string;
    country: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  extras: Record<string, string>;
  selected: Record<string, boolean>;
};

export const initialState: CheckoutState = {
  company: {
    name: "",
    type: "LLC",
    state: "",
    notifyAttorney: "No",
    attorneyEmail: "",
    changingAgent: "",
    hireChangeAgent: "no",
    yearsOfService: "1",
    formationTier: FORMATION_TIER,
    filingSpeed: "standard",
    agentFilingSpeed: "standard",
    mailDelivery: "",
    mailScan: "free",
  },
  contact: {
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  },
  account: { email: "", password: "", confirmPassword: "" },
  payment: {
    firstName: "",
    lastName: "",
    cardNumber: "",
    cvv: "",
    expMonth: "",
    expYear: "",
    useOtherAddress: "no",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  },
  extras: {},
  selected: {
    [IDENTITY_PACKAGE.id]: true,
    ...Object.fromEntries(
      IDENTITY_PACKAGE_ITEMS.map((option) => [option.id, true]),
    ),
  },
};
