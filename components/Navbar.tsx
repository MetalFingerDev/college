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
import {
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
	useUser,
} from "@clerk/nextjs";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Navbar: React.FC = () => {
	// Theme toggle
	const { setTheme } = useTheme();

	// Fetch user's custom themes
	const { user } = useUser();
	const userThemes = useQuery(
		api.themes.getUserThemes,
		user ? { userId: user.id } : "skip"
	);

	// Default themes
	const defaultThemes = useMemo(
		() => [
			{ icon: Computer, label: "system" },
			{ icon: Sun, label: "light" },
			{ icon: Moon, label: "dark" },
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
									{defaultThemes.map((theme) => (
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
									{/* User's custom themes (only when signed in) */}
									<SignedIn>
										{userThemes && userThemes.length > 0 && (
											<>
												<li>
													<hr className='theme-separator' />
												</li>
												{userThemes.map((theme) => (
													<li key={theme._id}>
														<NavigationMenuLink asChild>
															<Link
																href='#'
																className='nav-menu-link custom-theme'
																onClick={() => setTheme(theme.value)}>
																<Palette size={16} />
																{theme.name}
															</Link>
														</NavigationMenuLink>
													</li>
												))}
											</>
										)}
									</SignedIn>
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
