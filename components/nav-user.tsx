"use client";

import {
	IconCreditCard,
	IconDotsVertical,
	IconLogout,
	IconNotification,
	IconUserCircle,
} from "@tabler/icons-react";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { ChevronsUpDown } from "lucide-react";

export function NavUser({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
}) {
	const { isMobile } = useSidebar();

	// NEW: control menu open + measure width
	const [menuOpen, setMenuOpen] = React.useState(false);
	const menuContentRef = React.useRef<HTMLDivElement | null>(null);

	React.useLayoutEffect(() => {
		if (menuOpen && menuContentRef.current) {
		}
	}, [menuOpen]);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				{/* control DropdownMenu so we can measure on open */}
				<DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
							<Avatar className='h-8 w-8 rounded-lg grayscale'>
								<AvatarImage src={user.avatar} alt={user.name} />
								<AvatarFallback className='rounded-lg'>CN</AvatarFallback>
							</Avatar>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-medium'>{user.name}</span>
								<span className='text-muted-foreground truncate text-xs'>
									{user.email}
								</span>
							</div>
							<IconDotsVertical className='ml-auto size-4' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						ref={menuContentRef}
						className='w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 rounded-lg' // width fix
						side={isMobile ? "bottom" : "right"}
						align='end'
						sideOffset={4}>
						<DropdownMenuLabel className='p-0 font-normal'>
							<Popover>
								<PopoverTrigger asChild>
									<div
										role='button'
										className='flex items-center gap-2 px-1 py-1.5 text-left text-sm cursor-pointer select-none w-full'>
										<Avatar className='h-8 w-8 rounded-lg'>
											<AvatarImage src={user.avatar} alt={user.name} />
											<AvatarFallback className='rounded-lg'>CN</AvatarFallback>
										</Avatar>
										<div className='grid flex-1 text-left text-sm leading-tight'>
											<span className='truncate font-medium'>{user.name}</span>
											<span className='text-muted-foreground truncate text-xs'>
												{user.email}
											</span>
										</div>
										<ChevronsUpDown className='opacity-50 ml-auto size-4' />
									</div>
								</PopoverTrigger>

								{/* Match shadcn combobox demo: fixed width + p-0. Positioned as a crown above dropdown */}
								<PopoverContent
									className='w-56 p-0'
									side='top'
									align='end'
									sideOffset={2}>
									<Command>
										{/* No CommandInput (no search bar) */}
										<CommandList>
											<CommandEmpty>No profiles found.</CommandEmpty>
											<CommandGroup heading='Profiles'>
												{/* TODO: map real profiles here and handle onSelect to switch profile */}
												<CommandItem disabled>
													<div className='text-sm text-muted-foreground'>
														No additional profiles available.
													</div>
												</CommandItem>
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<IconUserCircle />
								Profile
							</DropdownMenuItem>
							<DropdownMenuItem>
								<IconCreditCard />
								Payments
							</DropdownMenuItem>
							<DropdownMenuItem>
								<IconNotification />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<IconLogout />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
