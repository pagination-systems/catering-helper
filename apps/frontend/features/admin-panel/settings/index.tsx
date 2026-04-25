"use client";

import { SectionHeader } from "../components/section-header";
import { SettingsForm } from "./components/settings-form";
import type { UpdateTenantValues } from "./schemas/settings.schema";
import { useSettingsStore } from "./store/useStore";

export const Settings = () => {
  const tenant = useSettingsStore((state) => state.tenant);
  const updateTenant = useSettingsStore((state) => state.updateTenant);

  const onSubmit = (values: UpdateTenantValues) => {
    updateTenant(values);
  };

  return (
    <section className="space-y-4" aria-labelledby="settings-title">
      <SectionHeader title="Settings" description="Update tenant profile, contact details, and social links." />

      <SettingsForm initialValues={tenant} onSubmit={onSubmit} submitLabel="Save Settings" />
    </section>
  );
};
