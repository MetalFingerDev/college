"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	useTheme,
	type ThemeMode,
} from "@/components/providers/theme-provider";
import { Sun, Moon } from "lucide-react";

export const ThemeSwitcher = () => {
	const {
		mode,
		setMode,
		resolvedMode,
		theme,
		setTheme,
		modeOptions,
		themeOptions,
	} = useTheme();

	const handleModeChange = (newMode: ThemeMode) => {
		setMode(newMode);
	};

	const TriggerIcon = useMemo(() => {
		if (mode === "system") {
			return resolvedMode === "dark" ? Moon : Sun;
		}
		return mode === "dark" ? Moon : Sun;
	}, [mode, resolvedMode]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					size='icon'
					className='flex flex-row items-center gap-2 font-normal relative group'>
					<TriggerIcon className='h-[1.2rem] w-[1.2rem] transition-all duration-300 group-hover:animate-[rainbow_2s_infinite]' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<div className='grid gap-2 p-2 w-40'>
					<div className='px-2 py-1.5 text-sm font-semibold'>Mode</div>
					<ul>
						{modeOptions.map((option) => (
							<li key={option.label}>
								<DropdownMenuItem>
									<button
										className='flex flex-row items-center gap-2 w-full p-2'
										onClick={() => handleModeChange(option.label)}>
										<option.icon size={16} />
										{option.label}
									</button>
								</DropdownMenuItem>
							</li>
						))}
					</ul>

					<div className='my-1 h-px bg-border' />

					<div className='px-2 py-1.5 text-sm font-semibold'>Theme</div>
					<ul>
						{themeOptions.map((option) => (
							<li key={option.value}>
								<DropdownMenuItem>
									<button
										className={cn(
											"flex flex-row items-center gap-2 w-full p-2",
											theme === option.value &&
												"bg-accent text-accent-foreground"
										)}
										onClick={() => setTheme(option.value)}>
										{option.label}
									</button>
								</DropdownMenuItem>
							</li>
						))}
					</ul>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
