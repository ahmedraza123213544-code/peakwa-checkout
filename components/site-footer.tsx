import Image from "next/image";

const LINKS = ["Terms", "Privacy", "Contact"];

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Image
            src="/logo.webp"
            alt="Peakwa Biz Solutions"
            width={200}
            height={86}
            className="h-12 w-auto max-w-none mix-blend-multiply"
          />
          <nav className="flex gap-6 text-sm font-medium">
            {LINKS.map((link) => (
              <a key={link} href="#" className="text-muted-foreground hover:text-foreground">
                {link}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t pt-6 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Peakwa Biz Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
