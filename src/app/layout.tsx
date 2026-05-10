import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PostProvider } from "@/context/PostContext";
import MainLayout from "@/components/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "discoarchive",
  description: "A gallery-style archive for our Discord memories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-discord-dark text-discord-text">
        <PostProvider>
          <MainLayout>{children}</MainLayout>
        </PostProvider>
      </body>
    </html>
  );
}
