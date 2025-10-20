"use client";

import * as React from "react";

export default function Whiteboard({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className='container max-w-5xl py-8 pl-8'>{children}</div>;
}
