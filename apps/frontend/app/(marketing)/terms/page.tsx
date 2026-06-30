import type { Metadata } from "next";
import { Terms } from "@/features/marketing/terms";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Catering Helper.",
};

export default function TermsOfServiceRoute() {
  return <Terms />;
}
