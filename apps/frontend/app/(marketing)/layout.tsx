import { MessageCircle } from "lucide-react";

import { Footer } from "@/components/layouts/marketing/footer";
import { Navbar } from "@/components/layouts/marketing/navbar";

const WHATSAPP_NUMBER = "8801700000000";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />

      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl transition-transform hover:scale-110 hover:bg-[#20BF5A] active:scale-95"
      >
        <MessageCircle className="h-6 w-6 text-white" aria-hidden="true" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </>
  );
}
