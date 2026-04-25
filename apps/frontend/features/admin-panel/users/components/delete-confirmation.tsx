"use client";

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
import { useUsersStore } from "../store/useStore";

export const DeleteConfirmation = () => {
  const deleteUser = useUsersStore((state) => state.deleteUser);
  const isDeleteDialogOpen = useUsersStore((state) => state.isDeleteDialogOpen);
  const selectedDeleteItem = useUsersStore((state) => state.selectedDeleteItem);
  const setDeleteDialogOpen = useUsersStore((state) => state.setDeleteDialogOpen);
  const closeDeleteDialog = useUsersStore((state) => state.closeDeleteDialog);

  const onConfirmDelete = () => {
    if (!selectedDeleteItem) return;
    deleteUser(selectedDeleteItem.id);
    closeDeleteDialog();
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete user?</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedDeleteItem
              ? `Are you sure you want to delete ${selectedDeleteItem.name}? This action cannot be undone.`
              : "Are you sure you want to delete this user? This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
