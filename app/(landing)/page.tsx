"use client";

import Hero from "@/components/Hero";
import Content from "@/components/Content";
import { Authenticated, Unauthenticated } from "convex/react";

export default function Home() {
	return (
		<>
			<Authenticated>
				<Content />
			</Authenticated>

			<Unauthenticated>
				<Hero />
			</Unauthenticated>
		</>
	);
}
