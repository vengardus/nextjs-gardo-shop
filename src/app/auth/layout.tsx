import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <main className="flex justify-center">
                    <div className="w-full sm:w-[350px] px-10">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}
