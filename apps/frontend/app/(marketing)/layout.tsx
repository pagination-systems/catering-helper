import { Footer } from "@/components/layouts/marketing/footer";
import { Navbar } from "@/components/layouts/marketing/navbar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </>
  );
}
