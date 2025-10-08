"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useThemeManager } from "@/components/providers/theme-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxGroup,
	ComboboxItem,
	ComboboxList,
	ComboboxTrigger,
} from "@/components/ui/shadcn-io/combobox";
import { Sun, Moon, Save, RefreshCcw } from "lucide-react";

type ThemeMode = "light" | "dark";
type ThemeName = "default" | "art-deco" | "mono" | "bubblegum";

interface BrandColors {
	primary: string;
	primaryForeground: string;
	secondary: string;
}

interface ThemesProps {
	initialMode?: ThemeMode;
	initialTheme?: ThemeName;
	initialColors?: BrandColors;
	onModeChange?: (mode: ThemeMode) => void;
	onThemeChange?: (theme: ThemeName) => void;
	onColorsChange?: (colors: BrandColors) => void;
}

const themeOptions: { label: string; value: ThemeName }[] = [
	{ label: "Default", value: "default" },
	{ label: "Art Deco", value: "art-deco" },
	{ label: "Mono", value: "mono" },
	{ label: "Bubblegum", value: "bubblegum" },
];

export default function Themes({
	initialMode = "light",
	initialTheme = "default",
	initialColors = {
		primary: "oklch(0.21 0.01 285.93)",
		primaryForeground: "oklch(0.99 0 0)",
		secondary: "#F5F5F5",
	},
	onModeChange,
	onThemeChange,
	onColorsChange,
}: ThemesProps) {
	const { setTheme: setNextTheme, theme: currentTheme } = useTheme();
	const { setTheme: setCustomTheme } = useThemeManager();

	const [mode, setMode] = React.useState<ThemeMode>(initialMode);
	const [theme, setTheme] = React.useState<ThemeName>(initialTheme);
	const [colors, setColors] = React.useState<BrandColors>(initialColors);

	// Handlers
	const handleModeChange = (newMode: ThemeMode) => {
		setNextTheme(newMode);
		onModeChange?.(newMode);
	};

	const handleThemeChange = (newTheme: ThemeName) => {
		setCustomTheme(newTheme);
		onThemeChange?.(newTheme);
	};

	const handleColorChange = (field: keyof BrandColors, value: string) => {
		const updated = { ...colors, [field]: value };
		setColors(updated);
		document.documentElement.style.setProperty(`--${field}`, value);
		onColorsChange?.(updated);
	};

	// const handleSave = () => {
	// 	save theme function (
	// 		JSON.stringify({ mode, theme, colors }, null, 2)
	// 	);
	// };

	const handleReset = () => {
		setMode(initialMode);
		setTheme(initialTheme);
		setColors(initialColors);
	};

	React.useEffect(() => {
		if (currentTheme) {
			setMode(currentTheme as ThemeMode);
		}
	}, [currentTheme]);

	return (
		<div className='space-y-6 ml-4'>
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-xl font-semibold'>Theme Customizer</h2>

					<div className='flex gap-2 mt-2'>
						<Button variant='outline' size='sm'>
							{" "}
							{/*onClick={handleSave}*/}
							<Save className='h-4 w-4 mr-2' /> Save
						</Button>
						<Button variant='outline' size='sm' onClick={handleReset}>
							<RefreshCcw className='h-4 w-4 mr-2' /> Reset
						</Button>
					</div>
				</div>
			</div>
			<div>
				<div className='space-y-2'>
					<div className='font-medium'>Mode</div>
					<div className='flex gap-2'>
						<Button
							variant={mode === "light" ? "default" : "outline"}
							size='sm'
							onClick={() => handleModeChange("light")}>
							<Sun className='h-4 w-4 mr-2' /> Light
						</Button>
						<Button
							variant={mode === "dark" ? "default" : "outline"}
							size='sm'
							onClick={() => handleModeChange("dark")}>
							<Moon className='h-4 w-4 mr-2' /> Dark
						</Button>
					</div>
				</div>
				<div>
					<div>Themes</div>
					<Combobox
						type='theme'
						data={themeOptions}
						value={theme}
						onValueChange={(value: string) =>
							handleThemeChange(value as ThemeName)
						}>
						<ComboboxTrigger />
						<ComboboxContent>
							<ComboboxInput placeholder='Select a theme...' />
							<ComboboxEmpty>No theme found.</ComboboxEmpty>
							<ComboboxList>
								<ComboboxGroup>
									{themeOptions.map((opt) => (
										<ComboboxItem key={opt.value} value={opt.value}>
											{opt.label}
										</ComboboxItem>
									))}
								</ComboboxGroup>
							</ComboboxList>
						</ComboboxContent>
					</Combobox>
				</div>
				<Tabs defaultValue='colors'>
					<TabsList>
						<TabsTrigger value='colors'>Colors</TabsTrigger>
						<TabsTrigger value='typography'>Typography</TabsTrigger>
						<TabsTrigger value='other'>Other</TabsTrigger>
					</TabsList>
					<TabsContent value='colors' className='space-y-4'>
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
									onChange={(e) =>
										handleColorChange("secondary", e.target.value)
									}
								/>
							</div>
						</div>
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
