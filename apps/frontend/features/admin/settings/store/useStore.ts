import { create } from "zustand";
import type { ITenant, UpdateTenantValues } from "../schemas/settings.schema";

type SettingsStoreState = {
  tenant: ITenant;
  updateTenant: (values: UpdateTenantValues) => void;
};

export const useSettingsStore = create<SettingsStoreState>((set) => ({
  tenant: {
    name: "Uttara Catering",
    title: "Premium Menus, Frictionless Customization",
    logoUrl:
      "https://images.unsplash.com/photo-1575395311793-ad870d50fbd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGxvZ298ZW58MHx8MHx8fDA%3D",
    menuUrl: "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22",
    description:
      "Premium corporate catering platform. Healthy, balanced, and perfectly on time for your team's success.",
    deliveryFee: 0,
    lastOrderTime: "18:00",
    contactEmail: "info@uttaracatering.com",
    contactPhone: "+880 1711-000000",
    contactWhatsapp: "+880 1711-000000",
    address: "123 Corporate Area, Gulshan 1, Dhaka 1212, Bangladesh",
    social: {
      facebook: "https://www.facebook.com/uttaracatering",
      instagram: "https://www.instagram.com/uttaracatering",
      youtube: "https://www.youtube.com/@uttaracatering",
    },
  },
  savedAt: null,
  updateTenant: (values) =>
    set({
      tenant: {
        ...values,
        lastOrderTime: values.lastOrderTime ?? "18:00",
        social: {
          ...values.social,
        },
      },
    }),
}));
