import type { Metadata } from "next";
import "@/app/globals.css";
import { TopMenu } from "@/components/ui/top-menu/TopMenu";
import { Sidebar } from "@/components/ui/sidebar/Sidebar";
import { Footer } from "@/components/ui/footer/Footer";


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
        // <html lang="en">
        //     <body className={inter.className}>
                <main className="bg-slat1e-700 min-h-screen">
                    <TopMenu />
                    <Sidebar />
                    <div className="px-0 sm:px-7 mt-24 sm:mt-20 py-2 sm:py-0 z-40">
                        {children}
                    </div>
                    <Footer />
                </main>
        //     </body>
        // </html>
    );
}
