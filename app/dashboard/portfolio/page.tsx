"use client";

import * as React from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Preview } from "./Preview";
import { Tools } from "./Tools";

interface PersonalInfo {
	fullName: string;
	email: string;
	phone: string;
	location: string;
	website: string;
	linkedin: string;
	github: string;
	summary: string;
}

interface Experience {
	id: string;
	jobTitle: string;
	company: string;
	location: string;
	startDate: string;
	endDate: string;
	current: boolean;
	description: string;
}

export default function PortfolioPage() {
	const [personalInfo, setPersonalInfo] = React.useState<PersonalInfo>({
		fullName: "",
		email: "",
		phone: "",
		location: "",
		website: "",
		linkedin: "",
		github: "",
		summary: "",
	});

	const [experiences, setExperiences] = React.useState<Experience[]>([]);

	const handlePersonalInfoChange = (
		field: keyof PersonalInfo,
		value: string
	) => {
		setPersonalInfo((prev) => ({ ...prev, [field]: value }));
	};

	const handleExperiencesChange = (next: Experience[]) => {
		setExperiences(next);
	};

	return (
		<ResizablePanelGroup direction='horizontal'>
			<ResizablePanel>
				<Tools
					personalInfo={personalInfo}
					onPersonalInfoChange={handlePersonalInfoChange}
					experiences={experiences}
					onExperiencesChange={handleExperiencesChange}
				/>
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel>
				<Preview personalInfo={personalInfo} experiences={experiences} />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
