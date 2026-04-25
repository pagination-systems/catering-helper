"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { UserForm } from "./components/user-form";
import { CreateUserValues, IUser } from "./schemas/user.schema";
import { SectionHeader } from "../components/section-header";
import { UserTable } from "./components/user-table";
import { TableToolbar } from "./components/table-toolbar";
import { DeleteConfirmation } from "./components/delete-confirmation";
import { useUsersStore } from "./store/useStore";
import { UserDetails } from "./components/user-details";
import { If } from "@/components/if";

export const Users = () => {
  const data = useUsersStore((state) => state.list);
  const addItem = useUsersStore((state) => state.addItem);
  const updateUser = useUsersStore((state) => state.updateUser);
  const isCreateSheetOpen = useUsersStore((state) => state.isCreateSheetOpen);
  const isEditSheetOpen = useUsersStore((state) => state.isEditSheetOpen);
  const isViewSheetOpen = useUsersStore((state) => state.isViewSheetOpen);
  const selectedItem = useUsersStore((state) => state.selectedItem);
  const selectedViewItem = useUsersStore((state) => state.selectedViewItem);
  const setCreateSheetOpen = useUsersStore((state) => state.setCreateSheetOpen);
  const setEditSheetOpen = useUsersStore((state) => state.setEditSheetOpen);
  const setViewSheetOpen = useUsersStore((state) => state.setViewSheetOpen);
  const closeCreateSheet = useUsersStore((state) => state.closeCreateSheet);
  const closeEditSheet = useUsersStore((state) => state.closeEditSheet);
  const closeViewSheet = useUsersStore((state) => state.closeViewSheet);

  const onSubmitCreateUser = (values: CreateUserValues) => {
    const newUser: IUser = {
      id: crypto.randomUUID(),
      name: values.name,
      email: values.email,
      role: values.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addItem(newUser);
    closeCreateSheet();
  };

  const onSubmitEditUser = (values: CreateUserValues) => {
    if (!selectedItem) return;

    updateUser(selectedItem.id, values);
    closeEditSheet();
  };

  const viewDetails = [
    { label: "ID", value: selectedViewItem?.id ?? "-" },
    { label: "Full Name", value: selectedViewItem?.name ?? "-" },
    { label: "Email", value: selectedViewItem?.email ?? "-" },
    { label: "Role", value: selectedViewItem?.role ?? "-" },
    {
      label: "Created At",
      value: selectedViewItem ? selectedViewItem.createdAt.toLocaleString() : "-",
    },
    {
      label: "Updated At",
      value: selectedViewItem ? selectedViewItem.updatedAt.toLocaleString() : "-",
    },
  ] as const;

  return (
    <section className="space-y-4" aria-labelledby="users-title">
      <SectionHeader title="Users" description="Manage roles, permissions, and team access." />

      <Card>
        <CardHeader className="space-y-3">
          <TableToolbar />
        </CardHeader>

        <CardContent className="space-y-4">
          <UserTable data={data} />
        </CardContent>
      </Card>

      <Sheet open={isCreateSheetOpen} onOpenChange={setCreateSheetOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Create User</SheetTitle>
            <SheetDescription>Add a team member and assign role access.</SheetDescription>
          </SheetHeader>

          <UserForm onSubmit={onSubmitCreateUser} submitLabel="Create User" />
        </SheetContent>
      </Sheet>

      <Sheet open={isEditSheetOpen} onOpenChange={setEditSheetOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Edit User</SheetTitle>
            <SheetDescription>Update team member details and role access.</SheetDescription>
          </SheetHeader>

          <UserForm onSubmit={onSubmitEditUser} initialValues={selectedItem ?? undefined} submitLabel="Save Changes" />
        </SheetContent>
      </Sheet>

      <Sheet open={isViewSheetOpen} onOpenChange={(open) => (open ? setViewSheetOpen(true) : closeViewSheet())}>
        <SheetContent side="right" className="space-y-6">
          <SheetHeader>
            <SheetTitle>User Details</SheetTitle>
            <SheetDescription>Review the selected team member's profile and role access.</SheetDescription>
          </SheetHeader>

          <If
            expression={!!selectedViewItem}
            fallback={<p className="text-sm text-muted-foreground">No user found.</p>}
          >
            {selectedViewItem && <UserDetails user={selectedViewItem} />}
          </If>
        </SheetContent>
      </Sheet>

      <DeleteConfirmation />
    </section>
  );
};
