import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function AuthLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  console.log('layout.Session:', session)
  if (session?.user) {
    console.log('Redirect!!!')
    redirect('/')
  }

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
