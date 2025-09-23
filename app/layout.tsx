import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Navbar from "@/components/Navbar";

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
			<html lang='en'>
				<body>
					<Navbar>
						{children}
    				</Navbar>
				</body>
			</html>
		</ClerkProvider>
	);
}