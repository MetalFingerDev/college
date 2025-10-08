"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";

type Theme = "default" | "art-deco" | "mono" | "bubblegum";

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
	undefined
);

export function useThemeManager() {
	const context = React.useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useThemeManager must be used within a ThemeProvider");
	}
	return context;
}

export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	const [currentTheme, setCurrentTheme] = React.useState<Theme>("default");

	useIsomorphicLayoutEffect(() => {
		// Remove any existing custom theme stylesheets
		document
			.querySelectorAll("link[data-theme-stylesheet]")
			.forEach((el) => el.remove());

		// If the theme is not the default, inject its stylesheet
		if (currentTheme !== "default") {
			const link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = `/themes/${currentTheme}.css`;
			link.setAttribute("data-theme-stylesheet", "true"); // Mark it as a custom theme stylesheet
			document.head.appendChild(link);
		}
	}, [currentTheme]);

	const value = {
		theme: currentTheme,
		setTheme: setCurrentTheme,
	};

	return (
		<NextThemesProvider {...props}>
			<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
		</NextThemesProvider>
	);
}
