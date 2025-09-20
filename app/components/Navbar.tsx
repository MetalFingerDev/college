"use client";

import Link from "next/link";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
	const { isSignedIn, user } = useUser();

	return (
		<nav className='bg-blue-600 text-white p-4 flex items-center justify-between'>
			{/* Logo */}
			<h1 className='text-2xl font-bold'>MyApp</h1>

			{/* Navigation Links */}
			<div className='flex items-center space-x-6'>
				<Link href='/' className='hover:text-gray-200'>
					Home
				</Link>

				{isSignedIn ? (
					<>
						<Link href='/dashboard' className='hover:text-gray-200'>
							Dashboard
						</Link>
						<Link href='/profile' className='hover:text-gray-200'>
							{user.firstName}
						</Link>
						<UserButton afterSignOutUrl='/' />
					</>
				) : (
					<div className='flex items-center space-x-4'>
						<SignInButton mode='modal'>
							<button className='bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100'>
								Sign In
							</button>
						</SignInButton>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
