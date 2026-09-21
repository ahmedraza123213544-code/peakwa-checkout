"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function InfoTip({
  title,
  text,
  className,
}: {
  title?: string;
  text: string;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger
        nativeButton
        type="button"
        aria-label={title ? `More info about ${title}` : "More info"}
        className={cn(
          "inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-zinc-600 p-0 !text-[10px] font-bold leading-none text-white outline-none hover:bg-zinc-800 focus-visible:ring-3 focus-visible:ring-ring/50",
          className,
        )}
        onClick={(event) => event.stopPropagation()}
      >
        ?
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          {title ? (
            <DialogTitle className="pr-8 text-lg font-semibold">
              {title}
            </DialogTitle>
          ) : null}
          <DialogDescription className="whitespace-pre-line text-[15px] leading-relaxed text-foreground/80">
            {text}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
