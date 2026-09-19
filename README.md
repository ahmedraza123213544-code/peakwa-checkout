# Formation checkout UI

Next.js, Tailwind and shadcn/ui.

```bash
npm install
npm run dev
```

## Where to change things

- `lib/checkout-config.ts`: every price, item, tooltip and note. Change the formation tier with `FORMATION_TIER`, the registered agent renewal price in `REGISTERED_AGENT`, and the free-package items in `IDENTITY_OPTIONS`.
- `lib/pricing.ts`: how the order summary and total are built from the selections.
- `lib/checkout-state.ts`: the form fields and their defaults.
- `components/checkout/steps/`: one file per step.
- `app/globals.css`: theme colors (`--primary` is the green).

Add shadcn components with `npx shadcn@latest add <name>`.
