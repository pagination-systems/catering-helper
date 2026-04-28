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
import { Input } from "@/components/ui/input";
import { isOrderLocked } from "../schemas/order.schema";
import { useOrdersStore } from "../store/useStore";

export const DeleteConfirmation = () => {
  const [confirmText, setConfirmText] = useState("");
  const deleteOrder = useOrdersStore((state) => state.deleteOrder);
  const isDeleteDialogOpen = useOrdersStore((state) => state.isDeleteDialogOpen);
  const selectedDeleteItem = useOrdersStore((state) => state.selectedDeleteItem);
  const setDeleteDialogOpen = useOrdersStore((state) => state.setDeleteDialogOpen);
  const closeDeleteDialog = useOrdersStore((state) => state.closeDeleteDialog);
  const isDeleteEnabled = confirmText === "delete-order";
  const isLocked = selectedDeleteItem ? isOrderLocked(selectedDeleteItem.status) : false;

  useEffect(() => {
    if (!isDeleteDialogOpen) {
      setConfirmText("");
    }
  }, [isDeleteDialogOpen]);

  const onConfirmDelete = () => {
    if (!selectedDeleteItem || !isDeleteEnabled || isLocked) return;
    deleteOrder(selectedDeleteItem.id);
    setConfirmText("");
    closeDeleteDialog();
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete order?</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedDeleteItem
              ? `Are you sure you want to delete ${selectedDeleteItem.orderNo}? This action cannot be undone.`
              : "Are you sure you want to delete this order? This action cannot be undone."}
          </AlertDialogDescription>

          {isLocked ? (
            <p className="text-sm text-muted-foreground">Completed and cancelled orders cannot be deleted.</p>
          ) : (
            <div className="mt-2 space-y-2">
              <p className="text-sm text-muted-foreground">
                Type <span className="font-medium text-foreground">delete-order</span> to confirm.
              </p>
              <Input
                value={confirmText}
                onChange={(event) => setConfirmText(event.target.value)}
                placeholder="delete-order"
                autoComplete="off"
              />
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmDelete} disabled={!isDeleteEnabled || isLocked}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
