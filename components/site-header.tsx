import { Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" aria-label="Peakwa Biz Solutions home">
          <Image
            src="/logo.webp"
            alt="Peakwa Biz Solutions"
            width={200}
            height={86}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>
        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground sm:text-base">
          <Lock className="size-4 sm:size-5" />
          Secure checkout
        </span>
      </div>
    </header>
  );
}
