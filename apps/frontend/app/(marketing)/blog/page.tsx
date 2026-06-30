import type { Metadata } from "next";
import { Blog } from "@/features/marketing/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips, guides, and stories to help you run a smarter catering business in Bangladesh.",
};

export default function BlogRoute() {
  return <Blog />;
}
