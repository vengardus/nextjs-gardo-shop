import type { Metadata } from "next";
import "@/app/globals.css";
import { Footer, Sidebar, TopMenu } from "@/components";

export const metadata: Metadata = {
  title: {
    template: '%s - Gardo | Shop',
    default: 'Home - Gardo | Shop'
  },
  description: "Tienda virtual de productos",
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-slat1e-700 min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className="px-0 sm:px-7 mt-24 sm:mt-20 py-2 sm:py-0 z-40">
        {children}
      </div>
      <Footer />
    </main>
  );
}
