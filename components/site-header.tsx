"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function SiteHeader() {
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);

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
						{segments.map((segment, index) => {
							const href = `/${segments.slice(0, index + 1).join("/")}`;
							const isLast = index === segments.length - 1;
							return (
								<React.Fragment key={href}>
									<BreadcrumbItem>
										{isLast ? (
											<BreadcrumbPage>
												{segment.charAt(0).toUpperCase() + segment.slice(1)}
											</BreadcrumbPage>
										) : (
											<BreadcrumbLink asChild>
												<Link href={href}>
													{segment.charAt(0).toUpperCase() + segment.slice(1)}
												</Link>
											</BreadcrumbLink>
										)}
									</BreadcrumbItem>
									{!isLast && <BreadcrumbSeparator />}
								</React.Fragment>
							);
						})}
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
