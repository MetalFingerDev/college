import type { Metadata } from "next";
import { ConvexClientProvider } from "../components/providers/ConvexClientProvider";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";

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
		<ClerkProvider>
			<html lang='en' suppressHydrationWarning>
				<body>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange>
						<ConvexClientProvider>
							<Navbar>{children} </Navbar>
						</ConvexClientProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
