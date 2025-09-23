"use client";
import type { Metadata } from "next";
import "./globals.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";

import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set in environment variables");
}
const convex = new ConvexReactClient(convexUrl);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ConvexProvider client={convex}>
            <Navbar>{children}</Navbar>
          </ConvexProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
