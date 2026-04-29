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
import { useExpensesStore } from "../store/useStore";

export const DeleteConfirmation = () => {
  const [confirmText, setConfirmText] = useState("");
  const deleteExpense = useExpensesStore((state) => state.deleteExpense);
  const isDeleteDialogOpen = useExpensesStore((state) => state.isDeleteDialogOpen);
  const selectedDeleteItem = useExpensesStore((state) => state.selectedDeleteItem);
  const setDeleteDialogOpen = useExpensesStore((state) => state.setDeleteDialogOpen);
  const closeDeleteDialog = useExpensesStore((state) => state.closeDeleteDialog);
  const isDeleteEnabled = confirmText === "delete-expense";

  useEffect(() => {
    if (!isDeleteDialogOpen) {
      setConfirmText("");
    }
  }, [isDeleteDialogOpen]);

  const onConfirmDelete = () => {
    if (!selectedDeleteItem || !isDeleteEnabled) return;
    deleteExpense(selectedDeleteItem.id);
    setConfirmText("");
    closeDeleteDialog();
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete expense?</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedDeleteItem
              ? `Are you sure you want to delete ${selectedDeleteItem.label}? This action cannot be undone.`
              : "Are you sure you want to delete this expense? This action cannot be undone."}
          </AlertDialogDescription>

          <div className="mt-2 space-y-2">
            <p className="text-sm text-muted-foreground">
              Type <span className="font-medium text-foreground">delete-expense</span> to confirm.
            </p>
            <Input
              value={confirmText}
              onChange={(event) => setConfirmText(event.target.value)}
              placeholder="delete-expense"
              autoComplete="off"
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmDelete} disabled={!isDeleteEnabled}>
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
