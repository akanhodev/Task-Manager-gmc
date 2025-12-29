import { Task, TaskFilter } from "@/types/task";
import { TaskItem } from "./TaskItem";
import { ClipboardList } from "lucide-react";

interface TaskListProps {
  /** Array of tasks to display */
  tasks: Task[];
  /** Current filter applied to the list */
  filter: TaskFilter;
  /** Callback when a task's completion status changes */
  onToggleComplete: (id: string) => void;
  /** Callback when a task is selected for editing */
  onEdit: (task: Task) => void;
  /** Callback when a task is deleted */
  onDelete: (id: string) => void;
}

/**
 * TaskList Component
 * Renders a filtered list of tasks or an empty state message
 */
export function TaskList({
  tasks,
  filter,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskListProps) {
  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "active":
        return !task.completed;
      case "completed":
        return task.completed;
      default:
        return true;
    }
  });

  // Sort tasks: active first, then by creation date (newest first)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return b.createdAt - a.createdAt;
  });

  // Empty state when no tasks match the filter
  if (sortedTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="rounded-full bg-muted p-4 mb-4">
          <ClipboardList className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-1">
          {filter === "all" && "No tasks yet"}
          {filter === "active" && "No active tasks"}
          {filter === "completed" && "No completed tasks"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {filter === "all" && "Add your first task using the form above"}
          {filter === "active" && "All tasks have been completed!"}
          {filter === "completed" && "You haven't completed any tasks yet"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
