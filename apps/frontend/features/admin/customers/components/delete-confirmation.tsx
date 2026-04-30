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
import { useCustomersStore } from "../store/useStore";

export const DeleteConfirmation = () => {
  const [confirmText, setConfirmText] = useState("");
  const deleteUser = useCustomersStore((state) => state.deleteUser);
  const isDeleteDialogOpen = useCustomersStore((state) => state.isDeleteDialogOpen);
  const selectedDeleteItem = useCustomersStore((state) => state.selectedDeleteItem);
  const setDeleteDialogOpen = useCustomersStore((state) => state.setDeleteDialogOpen);
  const closeDeleteDialog = useCustomersStore((state) => state.closeDeleteDialog);
  const isDeleteEnabled = confirmText === "delete-user";

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

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete customer?</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedDeleteItem
              ? `Are you sure you want to delete ${selectedDeleteItem.name}? This action cannot be undone.`
              : "Are you sure you want to delete this customer? This action cannot be undone."}
          </AlertDialogDescription>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-muted-foreground">
              Type <span className="font-medium text-foreground">delete-customer</span> to confirm.
            </p>
            <Input
              value={confirmText}
              onChange={(event) => setConfirmText(event.target.value)}
              placeholder="delete-customer"
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
