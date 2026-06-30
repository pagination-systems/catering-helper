import type { Metadata } from "next";
import { Contact } from "@/features/marketing/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Catering Helper team. We're here to help your catering business grow.",
};

export default function ContactUsRoute() {
  return <Contact />;
}
