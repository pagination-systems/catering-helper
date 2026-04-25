"use client";

import { PackageIcon } from "lucide-react";
import { If } from "@/components/if";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TablePagination } from "../../components/table-pagination";
import type { GetPackagesResponse } from "../schemas/package.schema";
import { RowActions } from "./row-actions";

interface PackageTableProps {
  data: GetPackagesResponse;
}

const bdt = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

export const PackageTable = ({ data }: PackageTableProps) => {
  return (
    <>
      <Table className="border-b">
        <TableHeader>
          <TableRow>
            <TableHead>Package</TableHead>
            <TableHead className="text-right">Price / Meal</TableHead>
            <TableHead className="text-right">Variants / Week</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Updated At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <If
            expression={data.data.length > 0}
            fallback={
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <PackageIcon className="size-5" />
                    No packages found for your current query and filters.
                  </div>
                </TableCell>
              </TableRow>
            }
          >
            {data.data.map((item) => {
              const totalVariants = item.days.reduce((sum, day) => sum + day.variants.length, 0);

              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium text-foreground">{item.name}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{item.description}</div>
                    <div className="text-xs text-muted-foreground">ID: {item.id}</div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{bdt.format(item.pricePerMeal)}</TableCell>
                  <TableCell className="text-right">{totalVariants}</TableCell>
                  <TableCell>
                    <span
                      className={
                        item.status === "Active"
                          ? "inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"
                          : "inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                      }
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {item.updatedAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <RowActions item={item} />
                  </TableCell>
                </TableRow>
              );
            })}
          </If>
        </TableBody>
      </Table>

      <TablePagination pagination={data.meta.pagination} />
    </>
  );
};
