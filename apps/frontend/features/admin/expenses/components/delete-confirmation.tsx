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
import { interpolate, useExpensesI18n } from "../lib/expenses-i18n";
import { useExpensesStore } from "../store/useStore";

export const DeleteConfirmation = () => {
  const [confirmText, setConfirmText] = useState("");
  const i18n = useExpensesI18n();
  const deleteExpense = useExpensesStore((state) => state.deleteExpense);
  const isDeleteDialogOpen = useExpensesStore((state) => state.isDeleteDialogOpen);
  const selectedDeleteItem = useExpensesStore((state) => state.selectedDeleteItem);
  const setDeleteDialogOpen = useExpensesStore((state) => state.setDeleteDialogOpen);
  const closeDeleteDialog = useExpensesStore((state) => state.closeDeleteDialog);
  const isDeleteEnabled = confirmText === i18n.delete.confirmKeyword;

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
          <AlertDialogTitle>{i18n.delete.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedDeleteItem
              ? interpolate(i18n.delete.confirmMessage, { label: selectedDeleteItem.label })
              : i18n.delete.confirmMessageGeneric}
          </AlertDialogDescription>

          <div className="mt-2 space-y-2">
            <p className="text-sm text-muted-foreground">{i18n.delete.confirmText}</p>
            <Input
              value={confirmText}
              onChange={(event) => setConfirmText(event.target.value)}
              placeholder={i18n.delete.confirmKeyword}
              autoComplete="off"
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{i18n.delete.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmDelete} disabled={!isDeleteEnabled}>
            {i18n.delete.confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
