/* Navbar */

"use client";

// dependencies
import { Home, Search, LucideLayoutDashboard } from "lucide-react";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";

// methods
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

// Types
type IconType = React.ComponentType<{ size?: number; className?: string }>;

interface NavRoute {
	icon: IconType; // Icon component
	label: string; // Display text
	href: string; // Navigation URL
	active?: boolean; // Active state
}

interface NavbarProps {
	publicRoutes?: NavRoute[]; // Routes visible to all
	protectedRoutes?: NavRoute[]; // Routes for authenticated users
}

// Default routes
const DEFAULT_PUBLIC_ROUTES: NavRoute[] = [
	{
		icon: Home,
		label: "Home",
		href: "/",
	},
];

const DEFAULT_PROTECTED_ROUTES: NavRoute[] = [
	{
		icon: LucideLayoutDashboard,
		label: "Dashboard",
		href: "/dashboard",
	},
	{
		icon: Search,
		label: "Search",
		href: "/search",
	},
];

const Navbar: React.FC<NavbarProps> = ({
	publicRoutes = DEFAULT_PUBLIC_ROUTES,
	protectedRoutes = DEFAULT_PROTECTED_ROUTES,
}) => {
	const pathname = usePathname();

	const routes = useMemo(
		() => ({
			public: publicRoutes.map((route) => ({
				...route,
				active: pathname === route.href, // Exact match for public routes
			})),
			protected: protectedRoutes.map((route) => ({
				...route,
				active: pathname.startsWith(route.href), // Partial match for protected routes
			})),
		}),
		[pathname, publicRoutes, protectedRoutes]
	);

	return (
		<header className='flex h-16 items-center justify-between gap-4 p-4 bg-background text-foreground border-b border-border'>
			{/* Left side navigation */}
			<NavigationMenu>
				<NavigationMenuList>
					{/* public routes */}
					{routes.public.map((route) => (
						<NavigationMenuItem key={route.label}>
							<NavigationMenuLink asChild>
								<Link
									href={route.href}
									className={cn(
										"flex flex-row items-center gap-2",
										route.active && "border-b-2 border-primary"
									)}>
									<route.icon size={16} />
									{route.label}
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					))}

					{/* protected routes when signed in */}
					<SignedIn>
						{routes.protected.map((route) => (
							<NavigationMenuItem key={route.label}>
								<NavigationMenuLink asChild>
									<Link
										href={route.href}
										className={cn(
											"flex flex-row items-center gap-2",
											route.active && "border-b-2 border-primary"
										)}>
										<route.icon size={16} />
										{route.label}
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</SignedIn>
				</NavigationMenuList>
			</NavigationMenu>

			{/* Right side actions */}
			<div className='flex items-center gap-4'>
				<ThemeSwitcher />
				<SignedIn>
					<UserButton />
				</SignedIn>
				<SignedOut>
					<SignInButton mode='modal'>
						<Button>Sign In</Button>
					</SignInButton>
				</SignedOut>
			</div>
		</header>
	);
};
export default Navbar;
