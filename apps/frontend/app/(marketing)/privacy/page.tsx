import type { Metadata } from "next";
import { Privacy } from "@/features/marketing/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Catering Helper collects, uses, and protects your information.",
};

export default function PrivacyPolicyRoute() {
  return <Privacy />;
}
