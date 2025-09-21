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

interface NavbarProps {
	children: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
	const pathname = usePathname();

	const routes = useMemo(
		() => [
			{
				label: "Home",
				href: "/",
				activate: pathname !== "/search",
			},
			{ label: "Search", href: "/search", activate: pathname === "/search" },
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
							<NavigationMenuItem>
								<NavigationMenuTrigger>Menu</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className='grid w-[200px] gap-4'>
										<li>
											<NavigationMenuLink asChild>
												<Link href='#'>Components</Link>
											</NavigationMenuLink>
											<NavigationMenuLink asChild>
												<Link href='#'>Documentation</Link>
											</NavigationMenuLink>
											<NavigationMenuLink asChild>
												<Link href='#'>Blocks</Link>
											</NavigationMenuLink>
										</li>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</SignedIn>
					</NavigationMenuList>
				</NavigationMenu>

				{/* Right side navigation */}
				<NavigationMenu>
					<NavigationMenuList>
						<SignedIn>
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
