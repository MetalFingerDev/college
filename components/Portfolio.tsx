"use client";

interface PortfolioProps {
	user: string;
}

const Portfolio = ({ user }: PortfolioProps) => {
	return (
		<div>
			<h1>{user}&#39;s Portfolio!</h1>
			<p>This is where your portfolio content will go.</p>
		</div>
	);
};

export default Portfolio;
