"use client";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
// Ensure that api.tasks.get exists in your convex api definition

export default function Dashboard() {
  const tasks = useQuery(api.tasks.get);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {tasks?.map((task) => (
        <div key={task._id}>{task.text}</div>
      ))}
    </main>
  );
}
