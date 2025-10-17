"use client";

import {
	ThemeMode,
	ThemeVariant,
	useTheme,
} from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Palette, RefreshCcw, Save, Sparkles, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function ThemesPage() {
	const {
		// Current states
		mode,
		theme,
		colors,
		// State setters
		setMode,
		setTheme,
		setColors,
		// Actions
		reset,
		save,
		// Options
		modeOptions,
		themeOptions,
	} = useTheme();

	// Mode switching
	const handleModeChange = (newMode: ThemeMode) => {
		setMode(newMode);
	};

	// Theme switching
	const handleThemeChange = (newTheme: ThemeVariant) => {
		setTheme(newTheme);
	};

	// Color changing
	const handleColorChange = (colorKey: keyof BrandColors, value: string) => {
		setColors(colorKey, value);
	};

	return (
		<div className='space-y-8'>
			{/* Theme Preview Hero */}
			<Card className='relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-background'>
				<div className='absolute inset-0 bg-grid-white/10' />
				<div className='relative p-6 sm:p-8 md:p-10'>
					<div className='mx-auto max-w-5xl space-y-4'>
						<div className='space-y-2'>
							<h2 className='text-2xl font-bold'>Current Theme Preview</h2>
							<p className='text-muted-foreground'>
								See how your theme looks in real-time
							</p>
						</div>

						{/* Preview Elements */}
						<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
							<Card className='p-4'>
								<h3 className='font-semibold'>Primary Button</h3>
								<div className='mt-2'>
									<Button>Click me</Button>
								</div>
							</Card>
							<Card className='p-4'>
								<h3 className='font-semibold'>Typography</h3>
								<div className='mt-2 space-y-1'>
									<p className='text-xl font-bold'>Heading</p>
									<p className='text-muted-foreground'>Regular text</p>
								</div>
							</Card>
							<Card className='p-4'>
								<h3 className='font-semibold'>Colors</h3>
								<div className='mt-2 flex gap-2'>
									<div className='h-6 w-6 rounded-full bg-primary' />
									<div className='h-6 w-6 rounded-full bg-secondary' />
									<div className='h-6 w-6 rounded-full bg-accent' />
								</div>
							</Card>
						</div>
					</div>
				</div>
			</Card>

			{/* Theme Options */}
			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{/* Quick Actions */}
				<Card className='p-6'>
					<div className='flex items-center gap-2'>
						<Sparkles className='h-5 w-5 text-primary' />
						<h3 className='font-semibold'>Quick Actions</h3>
					</div>
					<div className='mt-4 space-y-4'>
						{/* Mode Switcher */}
						<div className='space-y-2'>
							<label className='text-sm font-medium'>Mode</label>
							<div className='grid grid-cols-3 gap-2'>
								{modeOptions.map((option) => (
									<Button
										key={option.label}
										size='sm'
										variant={mode === option.label ? "default" : "outline"}
										onClick={() => handleModeChange(option.label)}
										className='capitalize'>
										{option.label}
									</Button>
								))}
							</div>
						</div>

						<Separator />

						{/* Theme Actions */}
						<Button
							className='w-full justify-start'
							variant='outline'
							onClick={save}>
							<Save className='mr-2 h-4 w-4' />
							Save Changes
						</Button>
						<Button
							className='w-full justify-start'
							variant='outline'
							onClick={reset}>
							<RefreshCcw className='mr-2 h-4 w-4' />
							Reset to Default
						</Button>
					</div>
				</Card>

				{/* Color Palette */}
				<Card className='p-6'>
					<div className='flex items-center gap-2'>
						<Palette className='h-5 w-5 text-primary' />
						<h3 className='font-semibold'>Color Palette</h3>
					</div>
					<ScrollArea className='mt-4 h-[120px]'>
						<div className='grid grid-cols-2 gap-2'>
							{themeOptions.map((option) => (
								<Button
									key={option.value}
									variant='outline'
									onClick={() => handleThemeChange(option.value)}
									className={cn(
										"h-8 w-full capitalize",
										theme === option.value && "border-2 border-primary"
									)}>
									{option.label}
								</Button>
							))}
						</div>
					</ScrollArea>
				</Card>

				{/* Typography - Coming Soon */}
				<Card className='p-6'>
					<div className='flex items-center gap-2'>
						<Type className='h-5 w-5 text-primary' />
						<h3 className='font-semibold'>Typography</h3>
					</div>
					<div className='mt-4 space-y-1'>
						<p className='text-sm text-muted-foreground'>
							Typography customization coming soon...
						</p>
					</div>
				</Card>
			</div>

			{/* TODO: Theme Change Logic
			 * 1. Implement color palette selection
			 * 2. Add font family switching
			 * 3. Add font scale adjustment
			 * 4. Add theme export/import
			 * 5. Add custom color picker
			 */}
		</div>
	);
}
