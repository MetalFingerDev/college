"use client";

import * as React from "react";
import {
	IconChartBar,
	IconDashboard,
	IconFolder,
	IconHelp,
	IconInnerShadowTop,
	IconListDetails,
	IconSearch,
	IconSettings,
	IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import Link from "next/link";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
	user: {
		name: "Prajuwu",
		email: "prajwalpal2022@vitbhopal.ac.in",
		avatar: "/shadcn.jpg",
	},
	// main data
	navMain: [
		{
			title: "Overview",
			url: "#",
			icon: IconDashboard,
		},
		{
			title: "Scedule",
			url: "#",
			icon: IconListDetails,
		},
		{
			title: "Analytics",
			url: "#",
			icon: IconChartBar,
		},
		{
			title: "Files",
			url: "#",
			icon: IconFolder,
		},
		{
			title: "Classes",
			url: "#",
			icon: IconUsers,
		},
	],

	// stuck to bottom
	navSecondary: [
		{
			title: "Settings",
			url: "#",
			icon: IconSettings,
		},
		{
			title: "Get Help",
			url: "#",
			icon: IconHelp,
		},
		{
			title: "Search",
			url: "#",
			icon: IconSearch,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible='offcanvas' {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className='data-[slot=sidebar-menu-button]:!p-1.5'>
							<Link
								href='https://vtop.vitbhopal.ac.in/vtop/open/page'
								target='_blank'
								rel='noopener noreferrer'>
								<IconInnerShadowTop className='!size-5' />
								<span className='text-base font-semibold'>VTOP</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondary} className='mt-auto' />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
