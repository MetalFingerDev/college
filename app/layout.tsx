import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
	title: "MyApp",
	description: "Demo Next.js App",
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider>
			<html lang='en' suppressHydrationWarning>
				<body>
					<ThemeProvider>
						<Navbar />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
