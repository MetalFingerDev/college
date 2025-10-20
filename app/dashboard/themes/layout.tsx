"use client";

import * as React from "react";

export default function ThemesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='container max-w-5xl py-8 pl-8'>
			<div className='flex flex-col gap-8'>
				{/* Header */}
				<div className='flex flex-col gap-2'>
					<h1 className='text-3xl font-bold tracking-tight'>Appearance</h1>
					<p className='text-muted-foreground'>
						Customize the appearance of the app. Choose between light and dark
						mode, select your preferred theme, or create your own.
					</p>
				</div>

				{children}
			</div>
		</div>
	);
}
