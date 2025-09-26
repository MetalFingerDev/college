import type { Metadata } from "next";
import { ConvexClientProvider } from "../components/providers/ConvexClientProvider";
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
			<html lang='en'>
				<body>
					<ConvexClientProvider>
						<Navbar>{children}</Navbar>
					</ConvexClientProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
