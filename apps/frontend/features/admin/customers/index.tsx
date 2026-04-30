"use client";

import { type IUser, USER_ROLE_ENUM } from "@catering/types";
import { If } from "@/components/if";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SectionHeader } from "../components/section-header";
import { CustomerDetails } from "./components/customer-details";
import { CustomerForm } from "./components/customer-form";
import { CustomerTable } from "./components/customer-table";
import { DeleteConfirmation } from "./components/delete-confirmation";
import { TableToolbar } from "./components/table-toolbar";
import type { CreateCustomerValues } from "./schemas/customer.schema";
import { useCustomersStore } from "./store/useStore";

export const Customers = () => {
  const data = useCustomersStore((state) => state.list);
  const addItem = useCustomersStore((state) => state.addItem);
  const updateUser = useCustomersStore((state) => state.updateUser);
  const isCreateSheetOpen = useCustomersStore((state) => state.isCreateSheetOpen);
  const isEditSheetOpen = useCustomersStore((state) => state.isEditSheetOpen);
  const isViewSheetOpen = useCustomersStore((state) => state.isViewSheetOpen);
  const selectedItem = useCustomersStore((state) => state.selectedItem);
  const selectedViewItem = useCustomersStore((state) => state.selectedViewItem);
  const setCreateSheetOpen = useCustomersStore((state) => state.setCreateSheetOpen);
  const setEditSheetOpen = useCustomersStore((state) => state.setEditSheetOpen);
  const setViewSheetOpen = useCustomersStore((state) => state.setViewSheetOpen);
  const closeCreateSheet = useCustomersStore((state) => state.closeCreateSheet);
  const closeEditSheet = useCustomersStore((state) => state.closeEditSheet);
  const closeViewSheet = useCustomersStore((state) => state.closeViewSheet);

  const onSubmitCreateUser = (values: CreateCustomerValues) => {
    const newUser: IUser = {
      id: crypto.randomUUID(),
      name: values.name,
      phone: values.phone,
      role: USER_ROLE_ENUM.CUSTOMER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addItem(newUser);
    closeCreateSheet();
  };

  const onSubmitEditUser = (values: CreateCustomerValues) => {
    if (!selectedItem) return;

    updateUser(selectedItem.id, values);
    closeEditSheet();
  };

  return (
    <section className="space-y-4" aria-labelledby="customers-title">
      <SectionHeader title="Customers" description="Manage customer information and details." />

      <Card>
        <CardHeader className="space-y-3">
          <TableToolbar />
        </CardHeader>

        <CardContent className="space-y-4">
          <CustomerTable data={data} />
        </CardContent>
      </Card>

      <Sheet open={isCreateSheetOpen} onOpenChange={setCreateSheetOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Create Customer</SheetTitle>
            <SheetDescription>Add a new customer to the system.</SheetDescription>
          </SheetHeader>

          <CustomerForm onSubmit={onSubmitCreateUser} submitLabel="Create Customer" />
        </SheetContent>
      </Sheet>

      <Sheet open={isEditSheetOpen} onOpenChange={setEditSheetOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Edit Customer</SheetTitle>
            <SheetDescription>Update customer details and role access.</SheetDescription>
          </SheetHeader>

          <CustomerForm
            onSubmit={onSubmitEditUser}
            initialValues={selectedItem ?? undefined}
            submitLabel="Save Changes"
          />
        </SheetContent>
      </Sheet>

      <Sheet open={isViewSheetOpen} onOpenChange={(open) => (open ? setViewSheetOpen(true) : closeViewSheet())}>
        <SheetContent side="right" className="space-y-6">
          <SheetHeader>
            <SheetTitle>Customer Details</SheetTitle>
            <SheetDescription>Review the selected customer's profile and role access.</SheetDescription>
          </SheetHeader>

          <If
            expression={!!selectedViewItem}
            fallback={<p className="text-sm text-muted-foreground">No customer found.</p>}
          >
            {selectedViewItem && <CustomerDetails user={selectedViewItem} />}
          </If>
        </SheetContent>
      </Sheet>

      <DeleteConfirmation />
    </section>
  );
};
