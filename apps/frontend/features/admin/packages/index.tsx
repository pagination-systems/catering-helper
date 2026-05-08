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
import { UpdatePackage } from "./components/update-package";
import { useCreatePackage, usePackages } from "./hooks";
import { usePackagesI18n } from "./lib/packages-i18n";
import { usePackagesStore } from "./store/useStore";

interface PackagesProps {
  title?: string;
  description?: string;
  tenantId?: string;
}

export const Packages = ({ title, description, tenantId }: PackagesProps) => {
  const i18n = usePackagesI18n();
  const { language } = useLanguage();
  const { packages, pagination, onSearch, handleFilter, handlePagination } = usePackages(tenantId);
  const isCreateSheetOpen = usePackagesStore((state) => state.isCreateSheetOpen);
  const isEditSheetOpen = usePackagesStore((state) => state.isEditSheetOpen);
  const isViewSheetOpen = usePackagesStore((state) => state.isViewSheetOpen);
  const selectedItem = usePackagesStore((state) => state.selectedItem);
  const selectedViewItem = usePackagesStore((state) => state.selectedViewItem);
  const { createPackage } = useCreatePackage();
  const setCreateSheetOpen = usePackagesStore((state) => state.setCreateSheetOpen);
  const setEditSheetOpen = usePackagesStore((state) => state.setEditSheetOpen);
  const setViewSheetOpen = usePackagesStore((state) => state.setViewSheetOpen);
  const closeCreateSheet = usePackagesStore((state) => state.closeCreateSheet);
  const closeViewSheet = usePackagesStore((state) => state.closeViewSheet);

  return (
    <section className="space-y-4" aria-labelledby="packages-title">
      <If expression={!!title && !!description}>
        <SectionHeader title={i18n.title} description={i18n.description} />
      </If>

      <Card>
        <CardHeader className="space-y-3">
          <TableToolbar
            onSearch={onSearch}
            onFilterChange={(value) => {
              handleFilter({ value });
            }}
          />
        </CardHeader>

        <CardContent className="space-y-4">
          <PackageTable data={packages} pagination={pagination} handlePaginate={handlePagination} />
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
            onSubmit={(values) => createPackage(values, closeCreateSheet)}
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

          {selectedItem && <UpdatePackage selectedItem={selectedItem} />}
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
            {selectedViewItem && <PackageDetails id={selectedViewItem.id} />}
          </If>
        </SheetContent>
      </Sheet>

      <DeleteConfirmation />
    </section>
  );
};
