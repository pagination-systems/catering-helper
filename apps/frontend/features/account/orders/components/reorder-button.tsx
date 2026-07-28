"use client";

import { Loader2, RotateCcw } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useAccountI18n } from "../../lib/account-i18n";
import { nextDateForDay } from "../lib/order-status";
import type { CustomerOrder } from "../schemas/order.schema";
import { useReorder } from "../hooks/useReorder";

interface ReorderButtonProps {
  order: CustomerOrder;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm";
  className?: string;
}

/** "Reorder" action — confirms, then re-places the same order via the storefront. */
export const ReorderButton = ({ order, variant = "outline", size = "sm", className }: ReorderButtonProps) => {
  const i18n = useAccountI18n().orders;
  const { reorder, isReordering } = useReorder();
  const [open, setOpen] = useState(false);

  // No tenant slug means we can't route the order back to its caterer.
  if (!order.tenantSlug) return null;

  const nextDeliveryLabel = formatDate(new Date(nextDateForDay(order.deliveryDay)), "en-BD", {
    weekday: "long",
    day: "2-digit",
    month: "short",
  });

  const description = i18n.reorderDialog.description
    .replace("{{caterer}}", order.tenantName ?? "this caterer")
    .replace("{{day}}", nextDeliveryLabel);

  const onConfirm = async () => {
    try {
      await reorder(order);
      setOpen(false);
    } catch {
      // Toast is surfaced by the hook; keep the dialog open for a retry.
    }
  };

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        onClick={() => setOpen(true)}
        disabled={isReordering}
      >
        <RotateCcw className="mr-1.5 size-3.5" />
        {i18n.card.reorder}
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{i18n.reorderDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isReordering}>{i18n.reorderDialog.cancel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                onConfirm();
              }}
              disabled={isReordering}
            >
              {isReordering && <Loader2 className="mr-2 size-4 animate-spin" />}
              {isReordering ? i18n.reorderDialog.reordering : i18n.reorderDialog.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
