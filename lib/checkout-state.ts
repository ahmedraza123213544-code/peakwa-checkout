export type CheckoutState = {
  company: {
    name: string;
    type: string;
    state: string;
    notifyAttorney: string;
    changingAgent: string;
    filingSpeed: string;
    mailDelivery: string;
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
  };
  selected: Record<string, boolean>;
};

export const initialState: CheckoutState = {
  company: {
    name: "",
    type: "Limited Liability Company",
    state: "",
    notifyAttorney: "No",
    changingAgent: "",
    filingSpeed: "standard",
    mailDelivery: "our-office",
  },
  contact: {
    firstName: "",
    lastName: "",
    phone: "",
    country: "United States",
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
  },
  selected: {},
};
