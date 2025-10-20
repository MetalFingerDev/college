"use client";

import * as React from "react";
import { usePathname } from "next/navigation"; // Add this import
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
	IconLayoutDashboard, // New icon for layouts
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { NavDashboard } from "@/components/nav-dashboard";
import { NavPortfolio } from "@/components/nav-portfolio";
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname(); // Get current pathname

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
				title: "Schedule",
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

		navDashboard: [
			{
				title: "Dashboard",
				url: "#",
				icon: IconDashboard,
			},
		],

		navPortfolio: [
			{
				title: "Layouts",
				url: "#",
				icon: IconLayoutDashboard,
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
				{/* Render data based on pathname */}
				{pathname === "/" ? <NavMain items={data.navMain} /> : null}
				{pathname === "/dashboard" ? (
					<NavDashboard items={data.navDashboard} />
				) : null}
				{pathname === "/dashboard/portfolio" ? (
					<NavPortfolio items={data.navPortfolio} />
				) : null}
				<NavSecondary items={data.navSecondary} className='mt-auto' />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
