# Formation checkout UI

Next.js, Tailwind and shadcn/ui.

```bash
npm install
npm run dev
```

## Where to change things

- `lib/checkout-config.ts`: prices, packages, filing speeds, mail scanning, identity package, and recommended extras.
- `lib/pricing.ts`: how the order summary updates when options change.
- `lib/pricing.ts`: how the order summary and total are built from the selections.
- `lib/checkout-state.ts`: the form fields and their defaults.
- `components/checkout/steps/`: one file per step.
- `app/globals.css`: theme colors (`--primary` is the green).

Add shadcn components with `npx shadcn@latest add <name>`.
