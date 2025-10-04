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

export function SectionCards() {
	const router = useRouter();

	return (
		<div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 grid grid-cols-1 gap-4 px-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
			<Card
				className='@container/card'
				onClick={() => router.push("/dashboard/portfolio")}>
				<CardHeader>
					<CardDescription>utility</CardDescription>
					<CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
						Portfolio
					</CardTitle>
					<CardAction>
						<Badge variant='outline'>custom styles</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className='flex-col items-start gap-1.5 text-sm'>
					<div className='line-clamp-1 flex gap-2 font-medium'>
						Portfolio generator
					</div>
					<div className='text-muted-foreground'>fully custom</div>
				</CardFooter>
			</Card>

			<Card
				className='@container/card'
				onClick={() => router.push("/dashboard/themes")}>
				<CardHeader>
					<CardDescription>utility</CardDescription>
					<CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
						Themes
					</CardTitle>
					<CardAction>
						<Badge variant='outline'>colors</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className='flex-col items-start gap-1.5 text-sm'>
					<div className='line-clamp-1 flex gap-2 font-medium'>
						Custom themes
					</div>
					<div className='text-muted-foreground'>design</div>
				</CardFooter>
			</Card>
		</div>
	);
}
