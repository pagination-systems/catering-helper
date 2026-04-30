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
import { interpolate, useCateringHelperI18n } from "../lib/catering-helper-i18n";
import { useUsersStore } from "../store/useStore";

export const DeleteConfirmation = () => {
  const i18n = useCateringHelperI18n();
  const [confirmText, setConfirmText] = useState("");
  const deleteUser = useUsersStore((state) => state.deleteUser);
  const isDeleteDialogOpen = useUsersStore((state) => state.isDeleteDialogOpen);
  const selectedDeleteItem = useUsersStore((state) => state.selectedDeleteItem);
  const setDeleteDialogOpen = useUsersStore((state) => state.setDeleteDialogOpen);
  const closeDeleteDialog = useUsersStore((state) => state.closeDeleteDialog);
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

  const confirmMessage = selectedDeleteItem
    ? interpolate(i18n.delete.confirmMessage, { name: selectedDeleteItem.name })
    : i18n.delete.confirmMessageGeneric;

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{i18n.delete.title}</AlertDialogTitle>
          <AlertDialogDescription>{confirmMessage}</AlertDialogDescription>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-muted-foreground">
              {i18n.delete.confirmText.split(i18n.delete.confirmKeyword)[0]}
              <span className="font-medium text-foreground">{i18n.delete.confirmKeyword}</span>
              {i18n.delete.confirmText.split(i18n.delete.confirmKeyword)[1]}
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
