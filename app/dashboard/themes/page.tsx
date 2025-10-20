"use client";

import {
	ThemeMode,
	ThemeVariant,
	useTheme,
} from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefreshCcw, Save, Sparkles, Type } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemesPage() {
	const {
		// Current states
		mode,
		theme,
		// Staged states
		stagedMode,
		stagedTheme,
		// Stage setters
		setStagedMode,
		setStagedTheme,
		// Actions
		reset,
		save,
		// Options
		modeOptions,
		themeOptions,
	} = useTheme();

	// Mode switching (staging only)
	const handleModeChange = (newMode: ThemeMode) => {
		setStagedMode(newMode);
	};

	// Theme switching (staging only)
	const handleThemeChange = (newTheme: ThemeVariant) => {
		setStagedTheme(newTheme);
	};

	return (
		<div className='space-y-8'>
			{/* Theme Preview Hero */}
			<div
				className={cn(
					"preview-container",
					`theme-${stagedTheme}`,
					`mode-${stagedMode}`
				)}>
				<Card className='relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-background'>
					<div className='absolute inset-0 bg-grid-white/10' />
					<div className='relative p-6 sm:p-8 md:p-10'>
						<div className='mx-auto max-w-5xl space-y-4'>
							<div className='flex items-center justify-between'>
								<div className='space-y-1'>
									<h2 className='text-2xl font-bold'>Theme Preview</h2>
									<p className='text-sm text-muted-foreground'>
										Changes will only affect this preview until you save
									</p>
								</div>
								<div className='flex items-center gap-2'>
									<Button variant='outline' size='sm' onClick={reset}>
										<RefreshCcw className='h-4 w-4 mr-2' />
										Reset
									</Button>
									<Button size='sm' onClick={save}>
										<Save className='h-4 w-4 mr-2' />
										Apply Theme
									</Button>
								</div>
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
									<div className='mt-2 space-y-2'>
										<div className='grid grid-cols-3 gap-2'>
											<div className='space-y-1.5'>
												<div className='h-6 w-6 rounded-full bg-primary' />
												<p className='text-xs text-muted-foreground'>Primary</p>
											</div>
											<div className='space-y-1.5'>
												<div className='h-6 w-6 rounded-full bg-secondary' />
												<p className='text-xs text-muted-foreground'>
													Secondary
												</p>
											</div>
											<div className='space-y-1.5'>
												<div className='h-6 w-6 rounded-full bg-accent' />
												<p className='text-xs text-muted-foreground'>Accent</p>
											</div>
										</div>
									</div>
								</Card>
							</div>
						</div>
					</div>
				</Card>
			</div>

			{/* Theme Options */}
			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{/* Quick Actions */}
				<Card className='p-6'>
					<div className='flex items-center gap-2'>
						<Sparkles className='h-5 w-5 text-primary' />
						<h3 className='font-semibold'>Theme Settings</h3>
					</div>
					<div className='mt-4 space-y-4'>
						{/* Mode Switcher */}
						<div className='space-y-2'>
							<div className='flex items-center justify-between'>
								<label className='text-sm font-medium'>Mode</label>
								<span className='text-xs text-muted-foreground'>
									Current: {mode}
								</span>
							</div>
							<div className='grid grid-cols-3 gap-2'>
								{modeOptions.map((option) => (
									<Button
										key={option.label}
										size='sm'
										variant={
											stagedMode === option.label ? "default" : "outline"
										}
										onClick={() => handleModeChange(option.label)}
										className='capitalize'>
										{option.label}
									</Button>
								))}
							</div>
						</div>

						<div className='space-y-2'>
							<div className='flex items-center justify-between'>
								<label className='text-sm font-medium'>Theme</label>
								<span className='text-xs text-muted-foreground'>
									Current: {theme}
								</span>
							</div>
							<ScrollArea className='h-[120px]'>
								<div className='grid grid-cols-2 gap-2'>
									{themeOptions.map((option) => (
										<Button
											key={option.value}
											variant='outline'
											onClick={() => handleThemeChange(option.value)}
											className={cn(
												"h-8 w-full capitalize",
												stagedTheme === option.value &&
													"border-2 border-primary"
											)}>
											{option.label}
										</Button>
									))}
								</div>
							</ScrollArea>
						</div>
					</div>
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
