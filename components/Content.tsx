"use client";

import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";

const Content = () => {
	const { isSignedIn, user } = useUser();
	const tasks = useQuery(api.tasks.get);
	const createTask = useMutation(api.tasks.create);
	const toggleTask = useMutation(api.tasks.toggle);
	const deleteTask = useMutation(api.tasks.deleteTask);
	const [newTask, setNewTask] = useState("");

	const handleAddTask = async (e: React.FormEvent) => {
		e.preventDefault();
		if (newTask.trim()) {
			await createTask({ text: newTask.trim() });
			setNewTask("");
		}
	};

	const handleToggle = (
		taskId: import("@/convex/_generated/dataModel").Id<"tasks">
	) => {
		toggleTask({ id: taskId });
	};

	const handleDelete = (
		e: React.MouseEvent,
		taskId: import("@/convex/_generated/dataModel").Id<"tasks">
	) => {
		e.stopPropagation();
		deleteTask({ id: taskId });
	};

	if (isSignedIn) {
		return (
			<div className='max-w-4xl mx-auto p-6'>
				<div className='space-y-6'>
					<div>
						<h1 className='text-3xl font-bold text-foreground'>
							Hello {user.firstName}!
						</h1>
					</div>

					<div className='space-y-4'>
						<h2 className='text-2xl font-semibold text-foreground'>My Tasks</h2>

						{/* Add new task form */}
						<form onSubmit={handleAddTask} className='space-y-3'>
							<div className='flex gap-3'>
								<input
									type='text'
									value={newTask}
									onChange={(e) => setNewTask(e.target.value)}
									placeholder='Add a new task...'
									className='flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
								/>
								<button
									type='submit'
									className='px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium'>
									Add Task
								</button>
							</div>
						</form>

						{/* Tasks list */}
						<div className='mt-6'>
							{tasks === undefined ? (
								<div className='text-center py-8 text-muted-foreground'>
									Loading tasks...
								</div>
							) : tasks.length === 0 ? (
								<div className='text-center py-8 text-muted-foreground'>
									No tasks found. Add your first task above!
								</div>
							) : (
								<div className='space-y-3'>
									{tasks.map((task) => (
										<div
											key={task._id}
											className='group p-4 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer'
											onClick={() => handleToggle(task._id)}>
											<div className='flex justify-between items-start gap-3'>
												<div className='flex-1 min-w-0'>
													<p
														className={`text-card-foreground transition-all ${
															task.isCompleted
																? "line-through text-muted-foreground"
																: ""
														}`}>
														{task.text}
													</p>
													<span
														className={`text-sm inline-flex items-center gap-1 mt-2 ${
															task.isCompleted
																? "text-green-600 dark:text-green-400"
																: "text-muted-foreground"
														}`}>
														{task.isCompleted ? "✓ Completed" : "○ Pending"}
													</span>
												</div>
												<button
													onClick={(e) => handleDelete(e, task._id)}
													className='opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-sm bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-md'
													title='Delete task'>
													🗑️
												</button>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return null;
};

export default Content;
