export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/10 via-primary/5 to-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
