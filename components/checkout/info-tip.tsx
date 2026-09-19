import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function InfoTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        aria-label="More info"
        className="inline-flex size-[18px] shrink-0 cursor-help items-center justify-center align-middle rounded-full bg-muted-foreground/70 text-[11px] font-bold text-background outline-none hover:bg-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        !
      </TooltipTrigger>
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  );
}
