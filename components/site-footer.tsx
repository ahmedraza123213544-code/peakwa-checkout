import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" aria-label="Peakwa Biz Solutions home">
            <Image
              src="/logo.webp"
              alt="Peakwa Biz Solutions"
              width={200}
              height={86}
              className="h-12 w-auto max-w-none mix-blend-multiply"
            />
          </Link>
          <nav className="flex gap-6 text-sm font-medium">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t pt-6 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Peakwa Biz Solutions. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
