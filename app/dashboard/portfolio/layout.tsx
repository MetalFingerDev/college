"use client";

import * as React from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Preview } from "@/components/preview";

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

// Context for sharing state between components
export const PortfolioContext = React.createContext<{
	personalInfo: PersonalInfo;
	experiences: Experience[];
	handlePersonalInfoChange: (field: keyof PersonalInfo, value: string) => void;
	handleExperiencesChange: (experiences: Experience[]) => void;
}>({
	personalInfo: {
		fullName: "",
		email: "",
		phone: "",
		location: "",
		website: "",
		linkedin: "",
		github: "",
		summary: "",
	},
	experiences: [],
	handlePersonalInfoChange: () => {},
	handleExperiencesChange: () => {},
});

export default function PortfolioLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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

	const handlePersonalInfoChange = React.useCallback(
		(field: keyof PersonalInfo, value: string) => {
			setPersonalInfo((prev) => ({ ...prev, [field]: value }));
		},
		[]
	);

	const handleExperiencesChange = React.useCallback((next: Experience[]) => {
		setExperiences(next);
	}, []);

	const contextValue = React.useMemo(
		() => ({
			personalInfo,
			experiences,
			handlePersonalInfoChange,
			handleExperiencesChange,
		}),
		[
			personalInfo,
			experiences,
			handlePersonalInfoChange,
			handleExperiencesChange,
		]
	);

	return (
		<PortfolioContext.Provider value={contextValue}>
			<ResizablePanelGroup direction='horizontal'>
				<ResizablePanel>
					<main>{children}</main>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel>
					<Preview personalInfo={personalInfo} experiences={experiences} />
				</ResizablePanel>
			</ResizablePanelGroup>
		</PortfolioContext.Provider>
	);
}
