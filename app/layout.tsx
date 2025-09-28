import React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ClerkProvider, ClerkLoaded } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import Navbar from "@/components/Navbar";
import "../styles/globals.css";

export const metadata: Metadata = {
	title: "college",
	description: "kaal age",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body>
				<ClerkProvider>
					<ClerkLoaded>
						<ConvexClientProvider>
							<ThemeProvider
								attribute='class'
								defaultTheme='system'
								enableSystem
								disableTransitionOnChange>
								<Navbar />
								{children}
							</ThemeProvider>
						</ConvexClientProvider>
					</ClerkLoaded>
				</ClerkProvider>
			</body>
		</html>
	);
}
