"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface NavRoute {
	label: string;
	href: string;
	active: boolean;
	requiresAuth?: boolean;
}

export default function Navbar() {
	const pathname = usePathname();
	const { isSignedIn, user } = useUser();

	// Define navigation routes similar to your sidebar pattern
	const routes = useMemo(() => {
		const baseRoutes: NavRoute[] = [
			{
				label: "Home",
				href: "/",
				active: pathname === "/",
				requiresAuth: false,
			},
		];

		// Add authenticated routes
		if (isSignedIn) {
			baseRoutes.push(
				{
					label: "Dashboard",
					href: "/dashboard",
					active: pathname === "/dashboard",
					requiresAuth: true,
				},
				{
					label: user?.firstName || "Profile",
					href: "/profile",
					active: pathname === "/profile",
					requiresAuth: true,
				}
			);
		}

		return baseRoutes;
	}, [pathname, isSignedIn, user?.firstName]);

	return (
		<nav className='flex items-center justify-between'>
			{/* Logo */}
			<h1 className='text-2xl font-bold'>MyApp</h1>

			{/* Navigation Menu */}
			<div className='flex items-center space-x-6'>
				<NavigationMenu>
					<NavigationMenuList>
						{routes.map((route) => (
							<NavigationMenuItem key={route.label}>
								{/* Simple link item */}
								<NavigationMenuLink asChild>
									<Link
										href={route.href}
										className={`px-3 py-2 ${route.active ? "border-b-2" : ""}`}>
										{route.label}
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>

				{/* Right side items */}
				<div className='flex items-center space-x-4'>
					{isSignedIn ? (
						<UserButton afterSignOutUrl='/' />
					) : (
						<SignInButton mode='modal'>
							<Button>Sign In</Button>
						</SignInButton>
					)}
					<ThemeToggle />
				</div>
			</div>
		</nav>
	);
}
