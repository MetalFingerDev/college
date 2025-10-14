"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

import { type Icon } from "@tabler/icons-react";

export function NavPortfolio({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: Icon;
	}[];
}) {
	return (
		<Accordion type='single' collapsible className='w-full'>
			{items.map((item) => (
				<AccordionItem key={item.title} value={item.title}>
					<AccordionTrigger className='px-4 py-2'>
						<div className='flex items-center gap-2'>
							{item.icon && <item.icon />}
							<span>{item.title}</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<p>Thumbnails</p>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
