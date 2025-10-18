import React from "react";
import type { Metadata } from "next";
import { ClerkProvider, ClerkLoaded } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import Navbar from "@/components/nav-bar";
import "../styles/globals.css";
import "../styles/default.css";

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
							<ThemeProvider>
								<Navbar />
								<SidebarProvider
									style={
										{
											"--sidebar-width": "calc(var(--spacing) * 72)",
											"--header-height": "calc(var(--spacing) * 12)",
										} as React.CSSProperties
									}>
									<AppSidebar variant='inset' />
									<SidebarInset>
										<SiteHeader />
										<div className='flex flex-1 flex-col'>
											<div className='@container/main flex flex-1 flex-col gap-2'>
												{children}
											</div>
										</div>
									</SidebarInset>
								</SidebarProvider>
							</ThemeProvider>
						</ConvexClientProvider>
					</ClerkLoaded>
				</ClerkProvider>
			</body>
		</html>
	);
}
