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
import { interpolate, usePackagesI18n } from "../lib/packages-i18n";
import { usePackagesStore } from "../store/useStore";

export const DeleteConfirmation = () => {
  const [confirmText, setConfirmText] = useState("");
  const i18n = usePackagesI18n();
  const deletePackage = usePackagesStore((state) => state.deletePackage);
  const isDeleteDialogOpen = usePackagesStore((state) => state.isDeleteDialogOpen);
  const selectedDeleteItem = usePackagesStore((state) => state.selectedDeleteItem);
  const setDeleteDialogOpen = usePackagesStore((state) => state.setDeleteDialogOpen);
  const closeDeleteDialog = usePackagesStore((state) => state.closeDeleteDialog);
  const isDeleteEnabled = confirmText === i18n.delete.confirmKeyword;

  useEffect(() => {
    if (!isDeleteDialogOpen) {
      setConfirmText("");
    }
  }, [isDeleteDialogOpen]);

  const onConfirmDelete = () => {
    if (!selectedDeleteItem || !isDeleteEnabled) return;
    deletePackage(selectedDeleteItem.id);
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
              ? interpolate(i18n.delete.confirmMessage, { name: selectedDeleteItem.name })
              : i18n.delete.confirmMessageGeneric}
          </AlertDialogDescription>
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
