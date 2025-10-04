"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import * as React from "react";
import Link from "next/link";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const items = [
	{ href: "/dashboard", label: "Dashboard" },
	{ href: "/dashboard/portfolio", label: "Portfolio" },
	{ href: "/dashboard/themes", label: "Themes" },
];

export function SiteHeader() {
	return (
		<header className='flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
			<div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
				<SidebarTrigger className='-ml-1' />
				<Separator
					orientation='vertical'
					className='mx-2 data-[orientation=vertical]:h-4'
				/>

				{/**/}
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href={items[0].href}>{items[0].label}</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
					</BreadcrumbList>
				</Breadcrumb>
				{/**/}

				<div className='ml-auto flex items-center gap-2'>
					<Button variant='ghost' asChild size='sm' className='hidden sm:flex'>
						<a
							href='https://github.com/MetalFingerDev/college.git'
							rel='noopener noreferrer'
							target='_blank'
							className='dark:text-foreground'>
							GitHub
						</a>
					</Button>
				</div>
			</div>
		</header>
	);
}
