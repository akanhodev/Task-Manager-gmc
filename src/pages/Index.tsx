import { useState, useCallback } from "react";
import { Task, TaskFilter as FilterType } from "@/types/task";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { TaskFilter } from "@/components/TaskFilter";
import { useToast } from "@/hooks/use-toast";
import { CheckSquare } from "lucide-react";

/**
 * Index Page - Main To-Do List Application
 *
 * Features:
 * - Add, edit, and delete tasks with validation
 * - Mark tasks as complete/incomplete
 * - Filter tasks by status (all, active, completed)
 * - Persistent storage using localStorage
 * - Responsive design with smooth animations
 */
const Index = () => {
  // Persist tasks in localStorage
  const [tasks, setTasks] = useLocalStorage<Task[]>("todo-tasks", []);

  // Local state for UI
  const [filter, setFilter] = useState<FilterType>("all");
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const { toast } = useToast();

  /**
   * Generates a unique ID for new tasks
   */
  const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  /**
   * Adds a new task or updates an existing one
   */
  const handleSubmit = useCallback(
    (name: string, description: string) => {
      if (editingTask) {
        // Update existing task
        setTasks((prev) =>
          prev.map((task) =>
            task.id === editingTask.id ? { ...task, name, description } : task
          )
        );
        setEditingTask(undefined);
        toast({
          title: "Task updated",
          description: "Your changes have been saved.",
        });
      } else {
        // Create new task
        const newTask: Task = {
          id: generateId(),
          name,
          description,
          completed: false,
          createdAt: Date.now(),
        };
        setTasks((prev) => [newTask, ...prev]);
        toast({
          title: "Task added",
          description: "Your new task has been created.",
        });
      }
    },
    [editingTask, setTasks, toast]
  );

  /**
   * Toggles the completion status of a task
   */
  const handleToggleComplete = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [setTasks]
  );

  /**
   * Sets a task for editing mode
   */
  const handleEdit = useCallback((task: Task) => {
    setEditingTask(task);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /**
   * Cancels the editing mode
   */
  const handleCancelEdit = useCallback(() => {
    setEditingTask(undefined);
  }, []);

  /**
   * Deletes a task from the list
   */
  const handleDelete = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      // Clear editing if the deleted task was being edited
      if (editingTask?.id === id) {
        setEditingTask(undefined);
      }
      toast({
        title: "Task deleted",
        description: "The task has been removed.",
        variant: "destructive",
      });
    },
    [editingTask, setTasks, toast]
  );

  // Calculate task counts for filters
  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container max-w-2xl py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CheckSquare className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Task Manager
              </h1>
              <p className="text-sm text-muted-foreground">
                {counts.active} active, {counts.completed} fait
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-2xl py-6 space-y-6">
        {/* Task Form Section */}
        <section aria-label="Add or edit task">
          <TaskForm
            editingTask={editingTask}
            onSubmit={handleSubmit}
            onCancel={editingTask ? handleCancelEdit : undefined}
          />
        </section>

        {/* Filter Section */}
        <section
          aria-label="Filter tasks"
          className="flex items-center justify-between gap-4 flex-wrap"
        >
          <TaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />
        </section>

        {/* Task List Section */}
        <section aria-label="Task list">
          <TaskList
            tasks={tasks}
            filter={filter}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="container max-w-2xl py-8 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Task Manager. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
};

export default Index;
