import React, { useState } from "react";

const layouts = [
	{
		id: "classic",
		name: "Classic Layout",
		description:
			"A simple and professional layout with a focus on readability.",
	},
	{
		id: "modern",
		name: "Modern Layout",
		description: "A visually appealing layout with a two-column design.",
	},
	{
		id: "creative",
		name: "Creative Layout",
		description: "A bold and colorful layout for creative professionals.",
	},
	{
		id: "functional",
		name: "Functional Layout",
		description:
			"Highlights skills over experience, ideal for fresh graduates.",
	},
	{
		id: "executive",
		name: "Executive Layout",
		description:
			"Tailored for senior professionals with detailed achievements.",
	},
	{
		id: "minimalist",
		name: "Minimalist Layout",
		description: "A clean and straightforward design with ample white space.",
	},
];

const LayoutSelector = ({
	onSelect,
}: {
	onSelect: (layoutId: string) => void;
}) => {
	const [selectedLayout, setSelectedLayout] = useState<string>("");

	const handleSelect = (layoutId: string) => {
		setSelectedLayout(layoutId);
		onSelect(layoutId);
	};

	return (
		<div style={{ padding: "20px" }}>
			<h2>Select a Resume Layout</h2>
			<div
				style={{
					display: "grid",
					gap: "20px",
					gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
				}}>
				{layouts.map((layout) => (
					<div
						key={layout.id}
						onClick={() => handleSelect(layout.id)}
						style={{
							border:
								selectedLayout === layout.id
									? "2px solid #007BFF"
									: "1px solid #ccc",
							borderRadius: "8px",
							padding: "15px",
							cursor: "pointer",
							textAlign: "center",
						}}>
						<h3>{layout.name}</h3>
						<p style={{ fontSize: "14px", color: "#555" }}>
							{layout.description}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default LayoutSelector;
