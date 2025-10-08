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
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { useThemeManager } from "@/components/providers/theme-provider";
import { useTheme } from "next-themes";

const Navbar: React.FC = () => {
	// Hooks for theme management
	const { theme: currentTheme, setTheme: setCurrentTheme } = useThemeManager();
	const { setTheme: setMode } = useTheme();

	// Memoized lists for navigation and themes
	const modes = useMemo(
		() => [
			{ icon: Computer, label: "system" },
			{ icon: Sun, label: "light" },
			{ icon: Moon, label: "dark" },
		],
		[]
	);

	const customThemes = useMemo(
		() => [
			{ label: "default", value: "default" },
			{ label: "art-deco", value: "art-deco" },
			{ label: "mono", value: "mono" },
			{ label: "bubblegum", value: "bubblegum" },
		],
		[]
	);

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
				active: pathname.startsWith("/dashboard"),
			},
			{
				icon: Search,
				label: "Search",
				href: "/search",
				active: pathname.startsWith("/search"),
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
								<div className='nav-menu w-40'>
									{/* Mode Switcher */}
									<div className='px-2 py-1.5 text-sm font-semibold'>Mode</div>
									<ul>
										{modes.map((mode) => (
											<li key={mode.label}>
												<NavigationMenuLink asChild>
													<Link
														href='#'
														className='nav-menu-link'
														onClick={() => setMode(mode.label)}>
														<mode.icon size={16} />
														{mode.label}
													</Link>
												</NavigationMenuLink>
											</li>
										))}
									</ul>

									{/* Separator */}
									<div className='my-1 h-px bg-border' />

									{/* Custom Theme Switcher */}
									<div className='px-2 py-1.5 text-sm font-semibold'>Theme</div>
									<ul>
										{customThemes.map((theme) => (
											<li key={theme.value}>
												<NavigationMenuLink asChild>
													<Link
														href='#'
														className={cn(
															"nav-menu-link",
															currentTheme === theme.value &&
																"bg-accent text-accent-foreground"
														)}
														onClick={() =>
															setCurrentTheme(
																theme.value as "default" | "art-deco" | "mono"
															)
														}>
														{theme.label}
													</Link>
												</NavigationMenuLink>
											</li>
										))}
									</ul>
								</div>
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
