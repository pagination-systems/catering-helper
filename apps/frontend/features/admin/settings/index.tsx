"use client";

import { SectionHeader } from "../components/section-header";
import { SettingsForm } from "./components/settings-form";
import { useSettingsI18n } from "./lib/settings-i18n";
import type { UpdateTenantValues } from "./schemas/settings.schema";
import { useSettingsStore } from "./store/useStore";

export const Settings = () => {
  const i18n = useSettingsI18n();
  const tenant = useSettingsStore((state) => state.tenant);
  const updateTenant = useSettingsStore((state) => state.updateTenant);

  const onSubmit = (values: UpdateTenantValues) => {
    updateTenant(values);
  };

  return (
    <section className="space-y-4" aria-labelledby="settings-title">
      <SectionHeader title={i18n.title} description={i18n.description} />

      <SettingsForm initialValues={tenant} onSubmit={onSubmit} submitLabel={i18n.form.submitLabel} />
    </section>
  );
};
