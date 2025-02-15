import type { Metadata } from "next";
import "./globals.css";
import Providers from "../components/Providers";
import TopNav from "@/components/navbar/TopNav";


export const metadata: Metadata = {
  title: "Nextjs tutorial",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Providers>
          <TopNav/>
          <main className="container mx-auto px-3"> {children}</main>
       </Providers>
      </body>
    </html>
  );
}
