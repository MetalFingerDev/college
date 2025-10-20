"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { useTheme as useNextTheme } from "next-themes";

// Types
export type ThemeMode = "light" | "dark" | "system";
export type ThemeVariant = "default" | "art-deco" | "mono" | "bubblegum";

export interface BrandColors {
	primary: string;
	primaryForeground: string;
	secondary: string;
}

export interface ModeOption {
	icon: React.ComponentType<{ size?: number; className?: string }>;
	label: ThemeMode;
}

export interface ThemeOption {
	label: string;
	value: ThemeVariant;
}

export interface ThemeContextType {
	// Mode (light/dark/system)
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
	resolvedMode: "light" | "dark";

	// Theme variant
	theme: ThemeVariant;
	setTheme: (theme: ThemeVariant) => void;

	// Colors
	colors: BrandColors;
	setColors: (field: keyof BrandColors, value: string) => void;

	// Theme Options (for UI)
	modeOptions: ModeOption[];
	themeOptions: ThemeOption[];

	// Staging state
	stagedMode: ThemeMode;
	stagedTheme: ThemeVariant;
	stagedColors: BrandColors;
	setStagedMode: (mode: ThemeMode) => void;
	setStagedTheme: (theme: ThemeVariant) => void;
	setStagedColors: (field: keyof BrandColors, value: string) => void;

	// Actions
	reset: () => void;
	save: () => void;
}

const initialColors: BrandColors = {
	primary: "oklch(0.21 0.01 285.93)",
	primaryForeground: "oklch(0.99 0 0)",
	secondary: "#F5F5F5",
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(
	undefined
);

export function useTheme() {
	const context = React.useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}

import { Sun, Moon, Computer } from "lucide-react";

export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	// Get next-themes controls
	const { theme: nextTheme, setTheme: setNextTheme } = useNextTheme();

	// Mode state
	const [mode, setMode] = React.useState<ThemeMode>(() => {
		// Try to get saved mode from localStorage first
		const saved = localStorage.getItem("themeSettings");
		if (saved) {
			const settings = JSON.parse(saved);
			return settings.mode;
		}
		return "system";
	});

	// Staged mode state
	const [stagedMode, setStagedMode] = React.useState<ThemeMode>(mode);

	const [resolvedMode, setResolvedMode] = React.useState<"light" | "dark">(
		window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
	);

	// Theme variant state
	const [theme, setTheme] = React.useState<ThemeVariant>("default");

	// Staged theme state
	const [stagedTheme, setStagedTheme] = React.useState<ThemeVariant>(theme);

	// Colors state
	const [colors, setColors] = React.useState<BrandColors>(initialColors);

	// Staged colors state
	const [stagedColors, setStagedColors] = React.useState<BrandColors>(colors);

	// Theme options
	const modeOptions = React.useMemo(
		() => [
			{ icon: Computer, label: "system" as ThemeMode },
			{ icon: Sun, label: "light" as ThemeMode },
			{ icon: Moon, label: "dark" as ThemeMode },
		],
		[]
	);

	const themeOptions = React.useMemo(
		() => [
			{ label: "Default", value: "default" as ThemeVariant },
			{ label: "Art Deco", value: "art-deco" as ThemeVariant },
			{ label: "Mono", value: "mono" as ThemeVariant },
			{ label: "Bubblegum", value: "bubblegum" as ThemeVariant },
		],
		[]
	);

	// Handle theme stylesheet injection
	useIsomorphicLayoutEffect(() => {
		document
			.querySelectorAll("link[data-theme-stylesheet]")
			.forEach((link) => link.remove());

		if (theme !== "default") {
			const link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = `/themes/${theme}.css`;
			link.setAttribute("data-theme-stylesheet", "true");
			document.head.appendChild(link);
		}
	}, [theme]);

	// Handle color updates
	const handleColorChange = React.useCallback(
		(field: keyof BrandColors, value: string) => {
			setColors((prev) => ({ ...prev, [field]: value }));
			document.documentElement.style.setProperty(`--${field}`, value);
		},
		[]
	);

	// Handle reset
	const handleReset = React.useCallback(() => {
		setStagedMode(mode);
		setStagedTheme(theme);
		setStagedColors(colors);
	}, [mode, theme, colors]);

	// Handle save (apply staged changes)
	const handleSave = React.useCallback(() => {
		setMode(stagedMode);
		setTheme(stagedTheme);
		setColors(stagedColors);

		// Save to localStorage
		const themeSettings = {
			mode: stagedMode,
			theme: stagedTheme,
			colors: stagedColors,
		};
		localStorage.setItem("themeSettings", JSON.stringify(themeSettings));
	}, [stagedMode, stagedTheme, stagedColors]);

	// Load saved settings
	React.useEffect(() => {
		const saved = localStorage.getItem("themeSettings");
		if (saved) {
			const settings = JSON.parse(saved);
			setMode(settings.mode);
			setTheme(settings.theme);
			setColors(settings.colors);
		}
	}, []);

	// Update resolved mode based on system preference
	React.useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const updateResolvedMode = () => {
			if (mode === "system") {
				setResolvedMode(mediaQuery.matches ? "dark" : "light");
			} else {
				setResolvedMode(mode as "light" | "dark");
			}
		};

		updateResolvedMode();
		mediaQuery.addEventListener("change", updateResolvedMode);
		return () => mediaQuery.removeEventListener("change", updateResolvedMode);
	}, [mode]);

	// Sync with next-themes
	React.useEffect(() => {
		if (nextTheme && nextTheme !== mode) {
			setNextTheme(mode);
		}
	}, [mode, nextTheme, setNextTheme]);

	const value = React.useMemo(
		() => ({
			// Current states
			mode,
			theme,
			colors,
			resolvedMode,
			// State setters
			setMode,
			setTheme,
			setColors: handleColorChange,
			// Staged states
			stagedMode,
			stagedTheme,
			stagedColors,
			// Staged setters
			setStagedMode,
			setStagedTheme,
			setStagedColors: handleColorChange,
			// Options
			modeOptions,
			themeOptions,
			// Actions
			reset: handleReset,
			save: handleSave,
		}),
		[
			mode,
			theme,
			colors,
			resolvedMode,
			handleColorChange,
			stagedMode,
			stagedTheme,
			stagedColors,
			modeOptions,
			themeOptions,
			handleReset,
			handleSave,
		]
	);

	return (
		<NextThemesProvider
			attribute='class'
			defaultTheme='system'
			enableSystem
			disableTransitionOnChange
			forcedTheme={mode}
			{...props}>
			<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
		</NextThemesProvider>
	);
}
