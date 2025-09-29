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
		e.stopPropagation(); // Prevent the click from bubbling up to parent
		deleteTask({ id: taskId });
	};

	if (isSignedIn) {
		return (
			<div>
				<h1>Hello {user.firstName}!</h1>

				<div className='mt-6'>
					<h2 className='text-xl font-semibold mb-4'>My Tasks</h2>

					{/* Add new task form */}
					<form onSubmit={handleAddTask} className='mb-4'>
						<div className='flex gap-2'>
							<input
								type='text'
								value={newTask}
								onChange={(e) => setNewTask(e.target.value)}
								placeholder='Add a new task...'
								className='flex-1 p-2 border rounded'
							/>
							<button type='submit' className='px-4 py-2 border rounded'>
								Add Task
							</button>
						</div>
					</form>

					{tasks === undefined ? (
						<div>Loading tasks...</div>
					) : tasks.length === 0 ? (
						<div>No tasks found. Add your first task above!</div>
					) : (
						<div className='space-y-2'>
							{tasks.map((task) => (
								<div
									key={task._id}
									className='p-3 border rounded-lg'
									onClick={() => handleToggle(task._id)}>
									<div className='flex justify-between items-center'>
										<p
											className={task.isCompleted ? "line-through" : ""}
											style={{ cursor: "pointer" }}>
											{task.text}
										</p>
										<button
											onClick={(e) => handleDelete(e, task._id)}
											className='px-2 py-1 text-sm border rounded'
											title='Delete task'>
											🗑️
										</button>
									</div>
									<span className='text-sm'>
										{task.isCompleted ? "✓ Completed" : "○ Pending"}
									</span>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		);
	}
};

export default Content;
