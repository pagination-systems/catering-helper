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
import { isOrderLocked } from "../schemas/order.schema";
import { useOrdersStore } from "../store/useStore";

export const CancelConfirmation = () => {
  const [reason, setReason] = useState("");
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
          <AlertDialogTitle>Mark order as cancelled?</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedCancelItem
              ? `This will change ${selectedCancelItem.orderNo} status to Cancelled.`
              : "This will change the selected order status to Cancelled."}
          </AlertDialogDescription>

          {isLocked ? (
            <p className="text-sm text-muted-foreground">This order is already locked and cannot be changed.</p>
          ) : (
            <div className="mt-2 space-y-2">
              <p className="text-sm text-muted-foreground">Please provide a reason for cancellation.</p>
              <Textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows={3}
                placeholder="Example: Client requested cancellation"
              />
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmCancel} disabled={!isCancelEnabled || isLocked}>
            Yes, cancel order
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
