"use client";

import { useContext } from "react";
import { ThemeContext } from "../app/dashboard/themes/layout";

export function useThemeContext() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error(
			"useThemeContext must be used within a ThemeContextProvider"
		);
	}
	return context;
}
