"use client";

import * as React from "react";
import { Tools } from "@/components/tools";
import { PortfolioContext } from "@/app/dashboard/portfolio/layout";

export default function PortfolioPage() {
	const {
		personalInfo,
		experiences,
		handlePersonalInfoChange,
		handleExperiencesChange,
	} = React.useContext(PortfolioContext);

	return (
		<Tools
			personalInfo={personalInfo}
			onPersonalInfoChange={handlePersonalInfoChange}
			experiences={experiences}
			onExperiencesChange={handleExperiencesChange}
		/>
	);
}
