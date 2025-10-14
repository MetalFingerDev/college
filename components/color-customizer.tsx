"use client";

import { useThemeContext } from "@/hooks/use-theme-context";

export function ColorCustomizer() {
	const { colors, handleColorChange } = useThemeContext();

	return (
		<div className='space-y-4'>
			<div className='font-medium'>Brand Colors</div>
			<div className='space-y-3'>
				<div className='flex items-center gap-4'>
					<label className='min-w-24'>Primary</label>
					<input
						type='text'
						className='flex-1 px-3 py-2 rounded-md border'
						value={colors.primary}
						onChange={(e) => handleColorChange("primary", e.target.value)}
					/>
				</div>
				<div className='flex items-center gap-4'>
					<label className='min-w-24'>Primary Foreground</label>
					<input
						type='text'
						className='flex-1 px-3 py-2 rounded-md border'
						value={colors.primaryForeground}
						onChange={(e) =>
							handleColorChange("primaryForeground", e.target.value)
						}
					/>
				</div>
				<div className='flex items-center gap-4'>
					<label className='min-w-24'>Secondary</label>
					<input
						type='text'
						className='flex-1 px-3 py-2 rounded-md border'
						value={colors.secondary}
						onChange={(e) => handleColorChange("secondary", e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
}
