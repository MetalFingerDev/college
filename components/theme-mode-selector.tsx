"use client";

import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeModeSelector() {
	const { mode, setMode, modeOptions } = useTheme();

	return (
		<div className='space-y-4'>
			<h3 className='text-lg font-medium'>Mode</h3>
			<div className='grid grid-cols-3 gap-4'>
				{modeOptions.map((option) => {
					const Icon = option.icon;
					return (
						<button
							key={option.label}
							className={cn(
								"flex flex-col items-center justify-center gap-2 p-4 rounded-lg border",
								mode === option.label && "border-primary bg-primary/10"
							)}
							onClick={() => setMode(option.label)}>
							<Icon size={24} />
							<span className='text-sm capitalize'>{option.label}</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}
