import type { Metadata } from "next";
import { CateringDirectory } from "@/features/caterings";

export const metadata: Metadata = {
  title: "Order Meals",
  description: "Browse catering services, compare packages, and order meals for your team.",
};

export default function ClientDirectoryRoute() {
  return <CateringDirectory />;
}
