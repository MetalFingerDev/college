"use client";

import { useTheme } from "@/components/providers/theme-provider";
import type { ThemeVariant } from "@/components/providers/theme-provider";
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

export function ThemeSelector() {
	const { theme, setTheme, themeOptions } = useTheme();

	return (
		<div className='space-y-4'>
			<h3 className='text-lg font-medium'>Theme</h3>
			<Combobox
				type='theme'
				data={themeOptions}
				value={theme}
				onValueChange={(value: string) => setTheme(value as ThemeVariant)}>
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
	);
}
