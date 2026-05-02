"use client";

import { useMemo } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SectionHeader } from "../components/section-header";
import { CustomerLedgerTable } from "./components/customer-ledger-table";
import { PaymentForm } from "./components/payment-form";
import { TableToolbar } from "./components/table-toolbar";
import { useCustomerLedgerI18n } from "./lib/customer-ledger-i18n";
import type { UpdateLedgerPaymentValues } from "./schemas/customer-ledger.schema";
import { useCustomerLedgerStore } from "./store/useStore";

const buildPagination = (totalDocs: number) => ({
  totalDocs,
  limit: 10,
  hasPrevPage: false,
  hasNextPage: false,
  page: 1,
  totalPages: Math.max(1, Math.ceil(totalDocs / 10)),
  prevPage: null,
  nextPage: null,
  pagingCounter: 1,
});

export const CustomerLedger = () => {
  const i18n = useCustomerLedgerI18n();
  const data = useCustomerLedgerStore((state) => state.list);
  const query = useCustomerLedgerStore((state) => state.query);
  const isEditSheetOpen = useCustomerLedgerStore((state) => state.isEditSheetOpen);
  const selectedItem = useCustomerLedgerStore((state) => state.selectedItem);
  const setEditSheetOpen = useCustomerLedgerStore((state) => state.setEditSheetOpen);
  const closeEditSheet = useCustomerLedgerStore((state) => state.closeEditSheet);
  const updatePaidAmount = useCustomerLedgerStore((state) => state.updatePaidAmount);

  const filteredCustomers = useMemo(() => {
    const queryText = query.trim().toLowerCase();

    return data.data.filter((entry) => {
      if (!queryText) return true;

      const searchable = [entry.customerName, entry.customerPhone].join(" ").toLowerCase();

      return searchable.includes(queryText);
    });
  }, [data.data, query]);

  const filteredData = useMemo(
    () => ({
      data: filteredCustomers,
      meta: {
        pagination: buildPagination(filteredCustomers.length),
      },
    }),
    [filteredCustomers],
  );

  const onSubmitPayment = (values: UpdateLedgerPaymentValues) => {
    if (!selectedItem) return;

    updatePaidAmount(selectedItem.id, values);
    closeEditSheet();
  };

  return (
    <section className="space-y-4" aria-labelledby="customer-ledger-title">
      <SectionHeader title={i18n.title} description={i18n.description} />

      <Card>
        <CardHeader className="space-y-3">
          <TableToolbar filteredCustomers={filteredCustomers} />
        </CardHeader>

        <CardContent className="space-y-4">
          <CustomerLedgerTable data={filteredData} />
        </CardContent>
      </Card>

      <Sheet open={isEditSheetOpen} onOpenChange={setEditSheetOpen}>
        <SheetContent side="right" className="w-full sm:!max-w-[520px]">
          <SheetHeader>
            <SheetTitle>{i18n.sheet.title}</SheetTitle>
            <SheetDescription>{i18n.sheet.description}</SheetDescription>
          </SheetHeader>

          <PaymentForm
            onSubmit={onSubmitPayment}
            maxDueAmount={selectedItem?.dueAmount ?? 0}
            customerName={selectedItem?.customerName ?? i18n.placeholders.unknownCustomer}
            customerPhone={selectedItem?.customerPhone ?? i18n.placeholders.noPhone}
          />
        </SheetContent>
      </Sheet>
    </section>
  );
};
