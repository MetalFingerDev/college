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
import { Home, Search } from "lucide-react";

interface NavbarProps {
	children: React.ReactNode;
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

	return (
		<>
			<header className='flex justify-between items-center p-4 gap-4 h-16'>
				{/* Left side navigation */}
				<NavigationMenu>
					<NavigationMenuList>
						<SignedIn>
							{routes.map((route) => (
								<NavigationMenuItem key={route.label}>
									<NavigationMenuLink asChild>
										<Link
											href={route.href}
											className={`flex items-center gap-2 ${
												route.active ? "font-bold" : ""
											}`}>
											<route.icon size={16} />
											{route.label}
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							))}
							<NavigationMenuItem>
								<NavigationMenuTrigger>Theme</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className='grid w-[200px] gap-4'>
										<li>
											<NavigationMenuLink asChild>
												<Link href='#'>System</Link>
											</NavigationMenuLink>
											<NavigationMenuLink asChild>
												<Link href='#'>Sun</Link>
											</NavigationMenuLink>
											<NavigationMenuLink asChild>
												<Link href='#'>Moon</Link>
											</NavigationMenuLink>
										</li>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<UserButton />
							</NavigationMenuItem>
						</SignedIn>

						<SignedOut>
							<NavigationMenuItem>
								<SignInButton mode='modal'>
									<button className='bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer'>
										Sign In
									</button>
								</SignInButton>
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
