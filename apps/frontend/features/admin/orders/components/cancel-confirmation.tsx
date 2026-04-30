"use client";

import { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useOrdersI18n } from "../lib/orders-i18n";
import { isOrderLocked } from "../schemas/order.schema";
import { useOrdersStore } from "../store/useStore";

export const CancelConfirmation = () => {
  const [reason, setReason] = useState("");
  const i18n = useOrdersI18n();
  const cancelOrder = useOrdersStore((state) => state.cancelOrder);
  const isCancelDialogOpen = useOrdersStore((state) => state.isCancelDialogOpen);
  const selectedCancelItem = useOrdersStore((state) => state.selectedCancelItem);
  const setCancelDialogOpen = useOrdersStore((state) => state.setCancelDialogOpen);
  const closeCancelDialog = useOrdersStore((state) => state.closeCancelDialog);

  const trimmedReason = reason.trim();
  const isCancelEnabled = trimmedReason.length >= 3;
  const isLocked = selectedCancelItem ? isOrderLocked(selectedCancelItem.status) : false;

  useEffect(() => {
    if (!isCancelDialogOpen) {
      setReason("");
    }
  }, [isCancelDialogOpen]);

  const onConfirmCancel = () => {
    if (!selectedCancelItem || !isCancelEnabled || isLocked) return;

    cancelOrder(selectedCancelItem.id, trimmedReason);
    setReason("");
    closeCancelDialog();
  };

  return (
    <AlertDialog open={isCancelDialogOpen} onOpenChange={setCancelDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{i18n.cancel.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedCancelItem
              ? i18n.cancel.confirmMessage.replace("{{orderNo}}", selectedCancelItem.orderNo)
              : i18n.cancel.confirmMessageGeneric}
          </AlertDialogDescription>

          {isLocked ? (
            <p className="text-sm text-muted-foreground">{i18n.cancel.lockedOrderMessage}</p>
          ) : (
            <div className="mt-2 space-y-2">
              <p className="text-sm text-muted-foreground">{i18n.cancel.reasonPrompt}</p>
              <Textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows={3}
                placeholder={i18n.cancel.reasonExample}
              />
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{i18n.cancel.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmCancel} disabled={!isCancelEnabled || isLocked}>
            {i18n.cancel.confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
