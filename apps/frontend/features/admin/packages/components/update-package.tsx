import { If } from "@/components/if";
import { useLanguage } from "@/providers/language-provider";
import { Loader } from "../../components/loader";
import { usePackage, useUpdatePackage } from "../hooks";
import { usePackagesI18n } from "../lib/packages-i18n";
import type { IPackage } from "../schemas/package.schema";
import { usePackagesStore } from "../store/useStore";
import { PackageForm } from "./package-form";

interface UpdatePackageProps {
  selectedItem: IPackage;
}

export const UpdatePackage = ({ selectedItem }: UpdatePackageProps) => {
  const i18n = usePackagesI18n();
  const { language } = useLanguage();
  const closeEditSheet = usePackagesStore((state) => state.closeEditSheet);
  const { package: item, isGettingPackage } = usePackage(selectedItem.id);
  const { updatePackage } = useUpdatePackage();

  return (
    <If expression={!isGettingPackage} fallback={<Loader />}>
      <PackageForm
        key={`${language}-edit`}
        onSubmit={(values) => {
          if (!selectedItem.id) return;
          updatePackage({ id: selectedItem.id, payload: values }, closeEditSheet);
        }}
        initialValues={item}
        submitLabel={i18n.form.submitSave}
      />
    </If>
  );
};
