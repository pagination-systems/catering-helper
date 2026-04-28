"use client";

import { If } from "@/components/if";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SectionHeader } from "../components/section-header";
import { DeleteConfirmation } from "./components/delete-confirmation";
import { PackageDetails } from "./components/package-details";
import { PackageForm } from "./components/package-form";
import { PackageTable } from "./components/package-table";
import { TableToolbar } from "./components/table-toolbar";
import type { CreatePackageValues, ICateringPackage } from "./schemas/package.schema";
import { usePackagesStore } from "./store/useStore";

export const Packages = () => {
  const data = usePackagesStore((state) => state.list);
  const addItem = usePackagesStore((state) => state.addItem);
  const updatePackage = usePackagesStore((state) => state.updatePackage);
  const isCreateSheetOpen = usePackagesStore((state) => state.isCreateSheetOpen);
  const isEditSheetOpen = usePackagesStore((state) => state.isEditSheetOpen);
  const isViewSheetOpen = usePackagesStore((state) => state.isViewSheetOpen);
  const selectedItem = usePackagesStore((state) => state.selectedItem);
  const selectedViewItem = usePackagesStore((state) => state.selectedViewItem);
  const setCreateSheetOpen = usePackagesStore((state) => state.setCreateSheetOpen);
  const setEditSheetOpen = usePackagesStore((state) => state.setEditSheetOpen);
  const setViewSheetOpen = usePackagesStore((state) => state.setViewSheetOpen);
  const closeCreateSheet = usePackagesStore((state) => state.closeCreateSheet);
  const closeEditSheet = usePackagesStore((state) => state.closeEditSheet);
  const closeViewSheet = usePackagesStore((state) => state.closeViewSheet);

  const onSubmitCreatePackage = (values: CreatePackageValues) => {
    const createdAt = new Date();
    const normalizedDays = values.days.map((day) => ({
      day: day.day,
      variants: day.variants.map((variant) => ({
        id: variant.id ?? crypto.randomUUID(),
        name: variant.name,
        note: variant.note,
        items: variant.items,
      })),
    }));

    const newPackage: ICateringPackage = {
      id: crypto.randomUUID(),
      name: values.name,
      description: values.description,
      pricePerMeal: values.pricePerMeal,
      status: values.status,
      days: normalizedDays,
      createdAt,
      updatedAt: createdAt,
    };

    addItem(newPackage);
    closeCreateSheet();
  };

  const onSubmitEditPackage = (values: CreatePackageValues) => {
    if (!selectedItem) return;

    updatePackage(selectedItem.id, values);
    closeEditSheet();
  };

  return (
    <section className="space-y-4" aria-labelledby="packages-title">
      <SectionHeader title="Packages" description="Manage package pricing, day plans, variants, and food items." />

      <Card>
        <CardHeader className="space-y-3">
          <TableToolbar />
        </CardHeader>

        <CardContent className="space-y-4">
          <PackageTable data={data} />
        </CardContent>
      </Card>

      <Sheet open={isCreateSheetOpen} onOpenChange={setCreateSheetOpen}>
        <SheetContent side="right" className="w-full overflow-hidden sm:!max-w-[880px]">
          <SheetHeader>
            <SheetTitle>Create Package</SheetTitle>
            <SheetDescription>Create a package and configure variants for each day of the week.</SheetDescription>
          </SheetHeader>

          <PackageForm onSubmit={onSubmitCreatePackage} submitLabel="Create Package" />
        </SheetContent>
      </Sheet>

      <Sheet open={isEditSheetOpen} onOpenChange={setEditSheetOpen}>
        <SheetContent side="right" className="w-full overflow-hidden sm:!max-w-[880px]">
          <SheetHeader>
            <SheetTitle>Edit Package</SheetTitle>
            <SheetDescription>Update package details, day plans, variants, and food items.</SheetDescription>
          </SheetHeader>

          <PackageForm
            onSubmit={onSubmitEditPackage}
            initialValues={selectedItem ?? undefined}
            submitLabel="Save Changes"
          />
        </SheetContent>
      </Sheet>

      <Sheet open={isViewSheetOpen} onOpenChange={(open) => (open ? setViewSheetOpen(true) : closeViewSheet())}>
        <SheetContent side="right" className="w-full overflow-auto sm:!max-w-[880px]">
          <SheetHeader>
            <SheetTitle>Package Details</SheetTitle>
            <SheetDescription>Review this package, its day plans, and all configured variants.</SheetDescription>
          </SheetHeader>

          <If
            expression={!!selectedViewItem}
            fallback={<p className="text-sm text-muted-foreground">No package found.</p>}
          >
            {selectedViewItem && <PackageDetails item={selectedViewItem} />}
          </If>
        </SheetContent>
      </Sheet>

      <DeleteConfirmation />
    </section>
  );
};
