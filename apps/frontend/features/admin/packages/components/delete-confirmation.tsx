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
import { usePackagesStore } from "../store/useStore";

export const DeleteConfirmation = () => {
  const [confirmText, setConfirmText] = useState("");
  const deletePackage = usePackagesStore((state) => state.deletePackage);
  const isDeleteDialogOpen = usePackagesStore((state) => state.isDeleteDialogOpen);
  const selectedDeleteItem = usePackagesStore((state) => state.selectedDeleteItem);
  const setDeleteDialogOpen = usePackagesStore((state) => state.setDeleteDialogOpen);
  const closeDeleteDialog = usePackagesStore((state) => state.closeDeleteDialog);
  const isDeleteEnabled = confirmText === "delete-package";

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
          <AlertDialogTitle>Delete package?</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedDeleteItem
              ? `Are you sure you want to delete ${selectedDeleteItem.name}? This action cannot be undone.`
              : "Are you sure you want to delete this package? This action cannot be undone."}
          </AlertDialogDescription>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-muted-foreground">
              Type <span className="font-medium text-foreground">delete-package</span> to confirm.
            </p>
            <Input
              value={confirmText}
              onChange={(event) => setConfirmText(event.target.value)}
              placeholder="delete-package"
              autoComplete="off"
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmDelete} disabled={!isDeleteEnabled}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
