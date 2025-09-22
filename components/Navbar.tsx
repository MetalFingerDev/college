"use client";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Search, Palette, Sun, Moon, Computer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
	children: React.ReactNode;
	themes?: Array<{
		icon: React.ElementType;
		label: string;
		value: string;
	}>;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
	const pathname = usePathname();

	const routes = useMemo(
		() => [
			{
				icon: Home,
				label: "Home",
				href: "/",
				active: pathname === "/",
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

	const themes = useMemo(
		() => [
			{ icon: Computer, label: "System" },
			{ icon: Sun, label: "Light" },
			{ icon: Moon, label: "Dark" },
		],
		[]
	);

	return (
		<>
			<header className='flex h-16 items-center justify-between gap-4 p-4'>
				{/* Left side navigation */}
				<NavigationMenu>
					<NavigationMenuList>
						<SignedIn>
							{routes.map((route) => (
								<NavigationMenuItem key={route.label}>
									<NavigationMenuLink asChild>
										<Link
											href={route.href}
											className={`flex flex-row items-center gap-2 ${
												route.active ? "border-b-2" : ""
											}`}>
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
							<NavigationMenuTrigger className='flex flex-row items-center gap-2 font-normal group'>
								<Palette
									size={16}
									className='transition-colors duration-300 group-hover:animate-[rainbow_2s_infinite]'
								/>{" "}
								Theme
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='grid w-auto gap-2 p-2'>
									{themes.map((theme) => (
										<li key={theme.label}>
											<NavigationMenuLink asChild>
												<Link
													href='#'
													className='flex flex-row items-center gap-2 p-2 hover:bg-gray-100 rounded'>
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
										<Button className='bg-purple-700 text-white border-b-2 shadow-2xl'>
											Sign In
										</Button>
									</SignInButton>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</SignedOut>
					</NavigationMenuList>
				</NavigationMenu>
			</header>
			<main>{children}</main>
		</>
	);
};
export default Navbar;
