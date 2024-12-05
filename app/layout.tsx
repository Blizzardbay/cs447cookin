import type { Metadata } from "next";
import {inter} from '@/app/fonts/fonts';
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="max-h-screen max-w-screen">
      <body
        className={`${inter.className} antialiased`}
      >
        <Providers>
          <Toaster position="bottom-right"/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
