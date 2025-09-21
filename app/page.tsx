import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function BackgroundGradientAnimationDemo() {
	return (
		<main>
			<BackgroundGradientAnimation containerClassName='overflow-hidden'>
				<div className='absolute z-50 inset-0 flex items-center justify-center font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl'>
					<h1 className='bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20'>
						hello, world!
					</h1>
				</div>
			</BackgroundGradientAnimation>
		</main>
	);
}
