import React from "react";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
			{children}
		</main>
	);
}
