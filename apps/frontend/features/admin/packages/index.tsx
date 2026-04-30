"use client";

import { If } from "@/components/if";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useLanguage } from "@/providers/language-provider";
import { SectionHeader } from "../components/section-header";
import { DeleteConfirmation } from "./components/delete-confirmation";
import { PackageDetails } from "./components/package-details";
import { PackageForm } from "./components/package-form";
import { PackageTable } from "./components/package-table";
import { TableToolbar } from "./components/table-toolbar";
import { usePackagesI18n } from "./lib/packages-i18n";
import type { CreatePackageValues, ICateringPackage } from "./schemas/package.schema";
import { usePackagesStore } from "./store/useStore";

export const Packages = () => {
  const i18n = usePackagesI18n();
  const { language } = useLanguage();
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
      <SectionHeader title={i18n.title} description={i18n.description} />

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
            <SheetTitle>{i18n.form.createTitle}</SheetTitle>
            <SheetDescription>{i18n.form.createDescription}</SheetDescription>
          </SheetHeader>

          <PackageForm
            key={`${language}-create`}
            onSubmit={onSubmitCreatePackage}
            submitLabel={i18n.form.submitCreate}
          />
        </SheetContent>
      </Sheet>

      <Sheet open={isEditSheetOpen} onOpenChange={setEditSheetOpen}>
        <SheetContent side="right" className="w-full overflow-hidden sm:!max-w-[880px]">
          <SheetHeader>
            <SheetTitle>{i18n.form.editTitle}</SheetTitle>
            <SheetDescription>{i18n.form.editDescription}</SheetDescription>
          </SheetHeader>

          <PackageForm
            key={`${language}-edit`}
            onSubmit={onSubmitEditPackage}
            initialValues={selectedItem ?? undefined}
            submitLabel={i18n.form.submitSave}
          />
        </SheetContent>
      </Sheet>

      <Sheet open={isViewSheetOpen} onOpenChange={(open) => (open ? setViewSheetOpen(true) : closeViewSheet())}>
        <SheetContent side="right" className="w-full overflow-auto sm:!max-w-[880px]">
          <SheetHeader>
            <SheetTitle>{i18n.details.title}</SheetTitle>
            <SheetDescription>{i18n.details.viewDescription}</SheetDescription>
          </SheetHeader>

          <If
            expression={!!selectedViewItem}
            fallback={<p className="text-sm text-muted-foreground">{i18n.details.noPackage}</p>}
          >
            {selectedViewItem && <PackageDetails item={selectedViewItem} />}
          </If>
        </SheetContent>
      </Sheet>

      <DeleteConfirmation />
    </section>
  );
};
