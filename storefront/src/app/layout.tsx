import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialProofPopup from "@/components/SocialProofPopup";
import AIChatbot from "@/components/AIChatbot";
import ProfileCompletionModal from "@/components/ProfileCompletionModal";
import AnnouncementBar from "@/components/AnnouncementBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import BottomNav from "@/components/BottomNav";
import CookieConsent from "@/components/CookieConsent";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Vyaparpe Demo - Premium Storefront",
  description: "VyapaarPe Customer Storefront - E-commerce built for speed and beauty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <AnnouncementBar />
              {children}
            </main>
            <Footer />
            <BottomNav />
            <SocialProofPopup />
            <AIChatbot />
            <ProfileCompletionModal />
            <CookieConsent />
          </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
