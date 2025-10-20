"use client";

import Hero from "@/components/hero";
import Content from "@/components/content";
import { Authenticated, Unauthenticated } from "convex/react";

export default function Home() {
	return (
		<main>
			<Authenticated>
				<Content />
			</Authenticated>

			<Unauthenticated>
				<Hero />
			</Unauthenticated>
		</main>
	);
}
