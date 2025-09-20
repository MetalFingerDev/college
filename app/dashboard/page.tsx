import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
	const user = await currentUser();

	if (!user) {
		return <div>Not signed in</div>;
	}

	return (
		<div className='p-8'>
			<h1 className='text-3xl font-bold black mb-4'>Dashboard</h1>
			<div className='bg-gray-800 p-6 rounded-lg'>
				<h2 className='text-xl font-semibold mb-2'>
					Welcome, {user.firstName}!
				</h2>
				<p className='text-gray-200 mb-2'>
					Email: {user.emailAddresses[0]?.emailAddress}
				</p>
				<p className='text-gray-200'>User ID: {user.id}</p>
			</div>
		</div>
	);
}
