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
import { useOrdersI18n } from "../lib/orders-i18n";
import { isOrderLocked } from "../schemas/order.schema";
import { useOrdersStore } from "../store/useStore";

export const DeleteConfirmation = () => {
  const [confirmText, setConfirmText] = useState("");
  const i18n = useOrdersI18n();
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
          <AlertDialogTitle>{i18n.delete.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedDeleteItem
              ? i18n.delete.confirmMessage.replace("{{orderNo}}", selectedDeleteItem.orderNo)
              : i18n.delete.confirmMessageGeneric}
          </AlertDialogDescription>

          {isLocked ? (
            <p className="text-sm text-muted-foreground">Completed and cancelled orders cannot be deleted.</p>
          ) : (
            <div className="mt-2 space-y-2">
              <p className="text-sm text-muted-foreground">{i18n.delete.confirmText}</p>
              <Input
                value={confirmText}
                onChange={(event) => setConfirmText(event.target.value)}
                placeholder={i18n.delete.confirmKeyword}
                autoComplete="off"
              />
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{i18n.delete.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmDelete} disabled={!isDeleteEnabled || isLocked}>
            {i18n.delete.confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
