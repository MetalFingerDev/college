"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeModeSelector } from "@/components/theme-mode-selector";
import { ThemeSelector } from "@/components/theme-selector";
import { ColorCustomizer } from "@/components/color-customizer";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/theme-provider";
import { Save, RefreshCcw } from "lucide-react";

export default function ThemesPage() {
	const { reset, save } = useTheme();

	return (
		<div className='space-y-6 ml-4'>
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-xl font-semibold'>Theme Customizer</h2>
					<div className='flex gap-2 mt-2'>
						<Button variant='outline' size='sm' onClick={save}>
							<Save className='h-4 w-4 mr-2' /> Save
						</Button>
						<Button variant='outline' size='sm' onClick={reset}>
							<RefreshCcw className='h-4 w-4 mr-2' /> Reset
						</Button>
					</div>
				</div>
			</div>

			<div className='space-y-6'>
				<ThemeModeSelector />
				<ThemeSelector />

				<Tabs defaultValue='colors'>
					<TabsList>
						<TabsTrigger value='colors'>Colors</TabsTrigger>
						<TabsTrigger value='typography'>Typography</TabsTrigger>
						<TabsTrigger value='other'>Other</TabsTrigger>
					</TabsList>
					<TabsContent value='colors'>
						<ColorCustomizer />
					</TabsContent>
					<TabsContent value='typography'>
						<div>Typography</div>
						<div>Coming soon...</div>
					</TabsContent>
					<TabsContent value='other'>
						<div>Other</div>
						<div>Coming soon...</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
