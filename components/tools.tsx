"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Calendar, Mail } from "lucide-react";

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

interface ToolsProps {
	personalInfo: PersonalInfo;
	experiences: Experience[];
	onPersonalInfoChange: (field: keyof PersonalInfo, value: string) => void;
	onExperiencesChange: (next: Experience[]) => void;
}

export function Tools({
	personalInfo,
	experiences,
	onPersonalInfoChange,
	onExperiencesChange,
}: ToolsProps) {
	// Experience handlers operate on parent state
	const addExperience = () => {
		const newExp: Experience = {
			id: Date.now().toString(),
			jobTitle: "",
			company: "",
			location: "",
			startDate: "",
			endDate: "",
			current: false,
			description: "",
		};
		onExperiencesChange([...(experiences || []), newExp]);
	};

	const updateExperience = (
		id: string,
		field: keyof Experience,
		value: string | boolean
	) => {
		onExperiencesChange(
			(experiences || []).map((exp) =>
				exp.id === id ? { ...exp, [field]: value as string } : exp
			)
		);
	};

	const removeExperience = (id: string) => {
		onExperiencesChange((experiences || []).filter((exp) => exp.id !== id));
	};

	return (
		<div className='space-y-6 p-6'>
			<div className='flex items-center justify-between'>
				<h2 className='text-2xl font-bold'>Resume Builder</h2>
				<Button>Generate Resume</Button>
			</div>

			<Tabs defaultValue='personal' className='space-y-4'>
				<TabsList className='grid w-full grid-cols-5'>
					<TabsTrigger value='personal'>Personal</TabsTrigger>
					<TabsTrigger value='experience'>Experience</TabsTrigger>
				</TabsList>

				{/* Personal Information Tab */}
				<TabsContent value='personal'>
					<Card>
						<CardHeader>
							<CardTitle className='flex items-center gap-2'>
								<Mail className='h-5 w-5' />
								Personal Information
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='fullName'>Full Name</Label>
									<Input
										id='fullName'
										value={personalInfo.fullName}
										onChange={(e) =>
											onPersonalInfoChange("fullName", e.target.value)
										}
										placeholder='John Doe'
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='email'>Email</Label>
									<Input
										id='email'
										type='email'
										value={personalInfo.email}
										onChange={(e) =>
											onPersonalInfoChange("email", e.target.value)
										}
										placeholder='john@example.com'
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='phone'>Phone</Label>
									<Input
										id='phone'
										value={personalInfo.phone}
										onChange={(e) =>
											onPersonalInfoChange("phone", e.target.value)
										}
										placeholder='+1 (555) 123-4567'
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='location'>Location</Label>
									<Input
										id='location'
										value={personalInfo.location}
										onChange={(e) =>
											onPersonalInfoChange("location", e.target.value)
										}
										placeholder='San Francisco, CA'
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='website'>Website</Label>
									<Input
										id='website'
										value={personalInfo.website}
										onChange={(e) =>
											onPersonalInfoChange("website", e.target.value)
										}
										placeholder='https://johndoe.com'
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='linkedin'>LinkedIn</Label>
									<Input
										id='linkedin'
										value={personalInfo.linkedin}
										onChange={(e) =>
											onPersonalInfoChange("linkedin", e.target.value)
										}
										placeholder='https://linkedin.com/in/johndoe'
									/>
								</div>
								<div className='space-y-2 md:col-span-2'>
									<Label htmlFor='github'>GitHub</Label>
									<Input
										id='github'
										value={personalInfo.github}
										onChange={(e) =>
											onPersonalInfoChange("github", e.target.value)
										}
										placeholder='https://github.com/johndoe'
									/>
								</div>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='summary'>Professional Summary</Label>
								<Textarea
									id='summary'
									value={personalInfo.summary}
									onChange={(e) =>
										onPersonalInfoChange("summary", e.target.value)
									}
									placeholder='Brief description of your professional background and career objectives...'
									rows={4}
								/>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Experience Tab */}
				<TabsContent value='experience'>
					<Card>
						<CardHeader>
							<CardTitle className='flex items-center justify-between'>
								<div className='flex items-center gap-2'>
									<Calendar className='h-5 w-5' />
									Work Experience
								</div>
								<Button onClick={addExperience} size='sm'>
									<Plus className='h-4 w-4 mr-2' />
									Add Experience
								</Button>
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-6'>
							{experiences.map((exp, index) => (
								<div key={exp.id} className='space-y-4 p-4 border rounded-lg'>
									<div className='flex items-center justify-between'>
										<h4 className='font-medium'>Experience {index + 1}</h4>
										<Button
											variant='ghost'
											size='sm'
											onClick={() => removeExperience(exp.id)}>
											<Trash2 className='h-4 w-4' />
										</Button>
									</div>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<div className='space-y-2'>
											<Label>Job Title</Label>
											<Input
												value={exp.jobTitle}
												onChange={(e) =>
													updateExperience(exp.id, "jobTitle", e.target.value)
												}
												placeholder='Software Engineer'
											/>
										</div>
										<div className='space-y-2'>
											<Label>Company</Label>
											<Input
												value={exp.company}
												onChange={(e) =>
													updateExperience(exp.id, "company", e.target.value)
												}
												placeholder='Tech Corp'
											/>
										</div>
										<div className='space-y-2'>
											<Label>Location</Label>
											<Input
												value={exp.location}
												onChange={(e) =>
													updateExperience(exp.id, "location", e.target.value)
												}
												placeholder='San Francisco, CA'
											/>
										</div>
										<div className='space-y-2'>
											<Label>Start Date</Label>
											<Input
												type='month'
												value={exp.startDate}
												onChange={(e) =>
													updateExperience(exp.id, "startDate", e.target.value)
												}
											/>
										</div>
										<div className='space-y-2'>
											<Label>End Date</Label>
											<Input
												type='month'
												value={exp.endDate}
												onChange={(e) =>
													updateExperience(exp.id, "endDate", e.target.value)
												}
												disabled={exp.current}
											/>
										</div>
										<div className='space-y-2'>
											<Label className='flex items-center gap-2'>
												<input
													type='checkbox'
													checked={exp.current}
													onChange={(e) =>
														updateExperience(
															exp.id,
															"current",
															e.target.checked
														)
													}
												/>
												Current Position
											</Label>
										</div>
									</div>
									<div className='space-y-2'>
										<Label>Job Description</Label>
										<Textarea
											value={exp.description}
											onChange={(e) =>
												updateExperience(exp.id, "description", e.target.value)
											}
											placeholder='Describe your responsibilities and achievements...'
											rows={3}
										/>
									</div>
								</div>
							))}
							{experiences.length === 0 && (
								<div className='text-center py-8 text-muted-foreground'>
									No work experience added yet. Click &quot;Add Experience&quot;
									to get started.
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
