"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export const Collapsible = CollapsiblePrimitive.Root;

export const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>(function CollapsibleTrigger({ className, children, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex w-full items-center justify-between gap-3 rounded-t-xl px-3 py-2 text-left text-sm font-semibold text-foreground outline-none transition-colors hover:bg-muted/60 data-[state=open]:bg-muted/60",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
    </CollapsiblePrimitive.Trigger>
  );
});

CollapsibleTrigger.displayName = CollapsiblePrimitive.Trigger.displayName;

export const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(function CollapsibleContent({ className, children, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2",
        className,
      )}
      {...props}
    >
      <div>{children}</div>
    </CollapsiblePrimitive.Content>
  );
});

CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;
