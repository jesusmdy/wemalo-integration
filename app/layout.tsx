import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Container from "@/components/container";
import AuthLayout from "@/components/auth";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wemalo Like App",
  description: "A simple application to mimic the behavior of Wemalo app made by Jesusmdy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white`}>
        <Container>
          <AuthLayout>
            {children}
          </AuthLayout>
        </Container>
      </body>
    </html>
  );
}
