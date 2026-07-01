"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { If } from "@/components/if";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/providers/language-provider";
import { Loader } from "../../components/loader";
import { SectionHeader } from "../../components/section-header";
import { usePackage, useUpdatePackage } from "../hooks";
import { usePackagesI18n } from "../lib/packages-i18n";
import { PackageForm } from "./package-form";

interface EditPackageProps {
  tenantId: string;
  packageId: string;
}

export const EditPackage = ({ tenantId, packageId }: EditPackageProps) => {
  const i18n = usePackagesI18n();
  const { language } = useLanguage();
  const router = useRouter();
  const listHref = `/admin/tenants/${tenantId}/packages`;
  const { package: item, isGettingPackage } = usePackage(packageId);
  const { updatePackage } = useUpdatePackage();

  return (
    <section className="space-y-4" aria-labelledby="edit-package-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionHeader
          title={i18n.form.editTitle}
          description={i18n.form.editPageDescription}
          titleId="edit-package-title"
        />
        <Button variant="outline" size="sm" asChild>
          <Link href={listHref}>
            <ArrowLeftIcon className="size-4" />
            {i18n.form.backToPackages}
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <If expression={!isGettingPackage} fallback={<Loader />}>
            <If
              expression={!!item}
              fallback={<p className="text-sm text-muted-foreground">{i18n.form.packageNotFound}</p>}
            >
              <PackageForm
                key={`${language}-edit-${packageId}`}
                initialValues={item}
                submitLabel={i18n.form.submitSave}
                onSubmit={(values) => {
                  updatePackage({ id: packageId, payload: values }, () => router.push(listHref));
                }}
              />
            </If>
          </If>
        </CardContent>
      </Card>
    </section>
  );
};
