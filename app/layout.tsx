import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
	title: "MyApp",
	description: "Demo Next.js App",
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body>
					<Navbar />
					<main>{children}</main>
				</body>
			</html>
		</ClerkProvider>
	);
}
