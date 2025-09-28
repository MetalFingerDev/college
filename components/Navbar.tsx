/* Navbar */

"use client";

import {
	Home,
	Search,
	Palette,
	Sun,
	Moon,
	Computer,
	LucideLayoutDashboard,
} from "lucide-react";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

interface NavbarProps {
	themes?: Array<{
		icon: React.ElementType;
		label: string;
		value: string;
	}>;
}

const Navbar: React.FC<NavbarProps> = () => {
	// Theme toggle
	const themes = useMemo(
		() => [
			{ icon: Computer, label: "system" },
			{ icon: Sun, label: "light" },
			{ icon: Moon, label: "dark" },
		],
		[]
	);
	const { setTheme } = useTheme();

	// Public routes
	const pathname = usePathname();
	const publicRoutes = useMemo(
		() => [
			{
				icon: Home,
				label: "Home",
				href: "/",
				active: pathname === "/",
			},
		],
		[pathname]
	);

	// Protected routes
	const protectedRoutes = useMemo(
		() => [
			{
				icon: LucideLayoutDashboard,
				label: "Dashboard",
				href: "/dashboard",
				active: pathname === "/dashboard",
			},
			{
				icon: Search,
				label: "Search",
				href: "/search",
				active: pathname === "/search",
			},
		],
		[pathname]
	);

	return (
		<>
			<header>
				{/* Left side navigation */}
				<NavigationMenu>
					<NavigationMenuList>
						{/* Always show public routes */}
						{publicRoutes.map((route) => (
							<NavigationMenuItem key={route.label}>
								<NavigationMenuLink asChild>
									<Link
										href={route.href}
										className={cn(
											"nav-link",
											route.active && "nav-link-active"
										)}>
										<route.icon size={16} />
										{route.label}
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}

						{/* Only show protected routes when signed in */}
						<SignedIn>
							{protectedRoutes.map((route) => (
								<NavigationMenuItem key={route.label}>
									<NavigationMenuLink asChild>
										<Link
											href={route.href}
											className={cn(
												"nav-link",
												route.active && "nav-link-active"
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
				{/* Right side navigation */}
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger className='theme-trigger'>
								<Palette
									size={16}
									className='transition-colors duration-300 group-hover:animate-[rainbow_2s_infinite]'
								/>{" "}
								Theme
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='nav-menu'>
									{themes.map((theme) => (
										<li key={theme.label}>
											<NavigationMenuLink asChild>
												<Link
													href='#'
													className='nav-menu-link'
													onClick={() => setTheme(theme.label)}>
													<theme.icon size={16} />
													{theme.label}
												</Link>
											</NavigationMenuLink>
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<SignedIn>
							<NavigationMenuItem>
								<UserButton />
							</NavigationMenuItem>
						</SignedIn>
						<SignedOut>
							<NavigationMenuItem>
								<NavigationMenuLink>
									<SignInButton mode='modal'>
										<Button className='signin-button'>Sign In</Button>
									</SignInButton>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</SignedOut>
					</NavigationMenuList>
				</NavigationMenu>
			</header>
		</>
	);
};
export default Navbar;
