import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

// Define the card data structure
interface SectionCard {
	title: string;
	description: string;
	badge: string;
	footerTitle: string;
	footerDescription: string;
	route: string;
}

// Memoized array of section cards
const sectionCards: SectionCard[] = [
	{
		title: "Portfolio",
		description: "utility",
		badge: "custom styles",
		footerTitle: "Portfolio generator",
		footerDescription: "fully custom",
		route: "/dashboard/portfolio",
	},
	{
		title: "Themes",
		description: "utility",
		badge: "colors",
		footerTitle: "Custom themes",
		footerDescription: "design",
		route: "/dashboard/themes",
	},
	{
		title: "Whiteboard",
		description: "utility",
		badge: "new feature",
		footerTitle: "New Feature",
		footerDescription: "description",
		route: "/dashboard/whiteboard",
	},
];

export function SectionCards() {
	const router = useRouter();

	return (
		<div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 grid grid-cols-1 gap-4 px-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
			{sectionCards.map((card) => (
				<Card
					key={card.title}
					className='@container/card'
					onClick={() => router.push(card.route)}>
					<CardHeader>
						<CardDescription>{card.description}</CardDescription>
						<CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
							{card.title}
						</CardTitle>
						<CardAction>
							<Badge variant='outline'>{card.badge}</Badge>
						</CardAction>
					</CardHeader>
					<CardFooter className='flex-col items-start gap-1.5 text-sm'>
						<div className='line-clamp-1 flex gap-2 font-medium'>
							{card.footerTitle}
						</div>
						<div className='text-muted-foreground'>
							{card.footerDescription}
						</div>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
