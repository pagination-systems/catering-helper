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
import { interpolate, useCustomersI18n } from "../lib/customers-i18n";
import { useCustomersStore } from "../store/useStore";

export const DeleteConfirmation = () => {
  const [confirmText, setConfirmText] = useState("");
  const i18n = useCustomersI18n();
  const deleteUser = useCustomersStore((state) => state.deleteUser);
  const isDeleteDialogOpen = useCustomersStore((state) => state.isDeleteDialogOpen);
  const selectedDeleteItem = useCustomersStore((state) => state.selectedDeleteItem);
  const setDeleteDialogOpen = useCustomersStore((state) => state.setDeleteDialogOpen);
  const closeDeleteDialog = useCustomersStore((state) => state.closeDeleteDialog);
  const isDeleteEnabled = confirmText === i18n.delete.confirmKeyword;

  useEffect(() => {
    if (!isDeleteDialogOpen) {
      setConfirmText("");
    }
  }, [isDeleteDialogOpen]);

  const onConfirmDelete = () => {
    if (!selectedDeleteItem || !isDeleteEnabled) return;
    deleteUser(selectedDeleteItem.id);
    setConfirmText("");
    closeDeleteDialog();
  };

  const [confirmPrefix, confirmSuffix] = i18n.delete.confirmText.split(i18n.delete.confirmKeyword);

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{i18n.delete.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedDeleteItem
              ? interpolate(i18n.delete.confirmMessage, { name: selectedDeleteItem.name })
              : i18n.delete.confirmMessageGeneric}
          </AlertDialogDescription>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-muted-foreground">
              {confirmPrefix}
              <span className="font-medium text-foreground">{i18n.delete.confirmKeyword}</span>
              {confirmSuffix}
            </p>
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
