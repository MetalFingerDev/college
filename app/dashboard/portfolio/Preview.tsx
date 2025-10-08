"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
	Mail,
	Phone,
	MapPin,
	Globe,
	Linkedin,
	Github,
	Calendar,
} from "lucide-react";

// Interfaces matching Tools.tsx
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

interface PreviewProps {
	personalInfo?: PersonalInfo;
	experiences?: Experience[];
}

export function Preview({
	personalInfo = {
		fullName: "Your Name",
		email: "your.email@example.com",
		phone: "+1 (555) 123-4567",
		location: "City, State",
		website: "",
		linkedin: "",
		github: "",
		summary: "Professional summary will appear here...",
	},
	experiences = [],
}: PreviewProps) {
	const formatDate = (dateString: string) => {
		if (!dateString) return "";
		const date = new Date(dateString + "-01");
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
		});
	};

	return (
		<div className='bg-white min-h-screen p-8 shadow-lg overflow-auto'>
			{/* Header Section */}
			<div className='text-center mb-8'>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>
					{personalInfo.fullName || "Your Name"}
				</h1>
				<div className='flex justify-center mb-2'>
					<Badge variant='secondary'>Preview</Badge>
				</div>

				<div className='flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-4'>
					{personalInfo.email && (
						<div className='flex items-center gap-1'>
							<Mail className='h-4 w-4' />
							<span>{personalInfo.email}</span>
						</div>
					)}
					{personalInfo.phone && (
						<div className='flex items-center gap-1'>
							<Phone className='h-4 w-4' />
							<span>{personalInfo.phone}</span>
						</div>
					)}
					{personalInfo.location && (
						<div className='flex items-center gap-1'>
							<MapPin className='h-4 w-4' />
							<span>{personalInfo.location}</span>
						</div>
					)}
				</div>

				<div className='flex flex-wrap justify-center gap-4 text-sm text-gray-600'>
					{personalInfo.website && (
						<div className='flex items-center gap-1'>
							<Globe className='h-4 w-4' />
							<a href={personalInfo.website} className='hover:underline'>
								Website
							</a>
						</div>
					)}
					{personalInfo.linkedin && (
						<div className='flex items-center gap-1'>
							<Linkedin className='h-4 w-4' />
							<a href={personalInfo.linkedin} className='hover:underline'>
								LinkedIn
							</a>
						</div>
					)}
					{personalInfo.github && (
						<div className='flex items-center gap-1'>
							<Github className='h-4 w-4' />
							<a href={personalInfo.github} className='hover:underline'>
								GitHub
							</a>
						</div>
					)}
				</div>
			</div>

			{/* Professional Summary */}
			{personalInfo.summary && (
				<div className='mb-8'>
					<h2 className='text-xl font-semibold text-gray-900 mb-3 border-b-2 border-gray-200 pb-1'>
						Professional Summary
					</h2>
					<p className='text-gray-700 leading-relaxed'>
						{personalInfo.summary}
					</p>
				</div>
			)}

			{/* Work Experience */}
			{experiences.length > 0 && (
				<div className='mb-8'>
					<h2 className='text-xl font-semibold text-gray-900 mb-3 border-b-2 border-gray-200 pb-1'>
						Work Experience
					</h2>
					<div className='space-y-6'>
						{experiences.map((exp) => (
							<div key={exp.id} className='space-y-2'>
								<div className='flex justify-between items-start'>
									<div>
										<h3 className='font-semibold text-lg text-gray-900'>
											{exp.jobTitle || "Job Title"}
										</h3>
										<p className='text-gray-700'>
											{exp.company || "Company Name"}
											{exp.location && ` • ${exp.location}`}
										</p>
									</div>
									<div className='text-sm text-gray-600 flex items-center gap-1'>
										<Calendar className='h-4 w-4' />
										{formatDate(exp.startDate)} -{" "}
										{exp.current ? "Present" : formatDate(exp.endDate)}
									</div>
								</div>
								{exp.description && (
									<p className='text-gray-700 leading-relaxed'>
										{exp.description}
									</p>
								)}
							</div>
						))}
					</div>
				</div>
			)}

			{/* Empty State */}
			{(!personalInfo.fullName || personalInfo.fullName === "Your Name") &&
				experiences.length === 0 && (
					<div className='text-center py-12 text-gray-500'>
						<p className='text-lg mb-2'>Resume Preview</p>
						<p className='text-sm'>
							Start filling out the form to see your resume preview here.
						</p>
					</div>
				)}
		</div>
	);
}
