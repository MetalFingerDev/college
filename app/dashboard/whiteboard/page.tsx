"use client";

import * as React from "react";
import { Whiteboard } from "@/components/white-board";

export default function WhiteboardPage() {
	return (
		<div className='flex h-full w-full flex-col gap-4 p-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Whiteboard</h1>
			</div>
			<Whiteboard />
		</div>
	);
}
