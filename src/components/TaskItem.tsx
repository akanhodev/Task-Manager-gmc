import { useState } from 'react';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface TaskItemProps {
  /** The task data to display */
  task: Task;
  /** Callback when task completion status changes */
  onToggleComplete: (id: string) => void;
  /** Callback when edit button is clicked */
  onEdit: (task: Task) => void;
  /** Callback when task is deleted */
  onDelete: (id: string) => void;
}

/**
 * TaskItem Component
 * Displays a single task with actions for completing, editing, and deleting
 * Completed tasks are visually distinguished with styling
 */
export function TaskItem({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) {
  const [isChecking, setIsChecking] = useState(false);

  /**
   * Handles the completion toggle with animation
   */
  const handleToggle = () => {
    setIsChecking(true);
    setTimeout(() => {
      onToggleComplete(task.id);
      setIsChecking(false);
    }, 200);
  };

  return (
    <div
      className={`
        group animate-slide-up rounded-lg border border-border bg-card p-4 
        shadow-soft transition-all duration-200 hover:shadow-hover
        ${task.completed ? 'task-completed' : ''}
      `}
    >
      <div className="flex items-start gap-4">
        {/* Completion Checkbox */}
        <div className={`mt-1 ${isChecking ? 'animate-check' : ''}`}>
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggle}
            className="h-5 w-5 rounded-full border-2 data-[state=checked]:bg-success data-[state=checked]:border-success"
            aria-label={`Mark "${task.name}" as ${task.completed ? 'incomplete' : 'complete'}`}
          />
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`
              font-semibold text-foreground transition-all
              ${task.completed ? 'line-through text-muted-foreground' : ''}
            `}
          >
            {task.name}
          </h3>
          <p
            className={`
              mt-1 text-sm text-muted-foreground leading-relaxed
              ${task.completed ? 'line-through' : ''}
            `}
          >
            {task.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Edit Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(task)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary"
            aria-label={`Edit "${task.name}"`}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          {/* Delete Button with Confirmation Dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                aria-label={`Delete "${task.name}"`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="animate-scale-in">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Task</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{task.name}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(task.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
