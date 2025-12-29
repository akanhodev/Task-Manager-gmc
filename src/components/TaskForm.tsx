import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Task } from '@/types/task';
import { Plus, Save, X } from 'lucide-react';

interface TaskFormProps {
  /** Task to edit (undefined for new task) */
  editingTask?: Task;
  /** Callback when form is submitted successfully */
  onSubmit: (name: string, description: string) => void;
  /** Callback to cancel editing mode */
  onCancel?: () => void;
}

/**
 * TaskForm Component
 * Handles both creating new tasks and editing existing ones
 * Includes validation for required fields
 */
export function TaskForm({ editingTask, onSubmit, onCancel }: TaskFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  // Pre-fill form when editing an existing task
  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      setDescription(editingTask.description);
    } else {
      setName('');
      setDescription('');
    }
    setErrors({});
  }, [editingTask]);

  /**
   * Validates form inputs
   * Returns true if valid, false otherwise
   */
  const validateForm = (): boolean => {
    const newErrors: { name?: string; description?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Task name is required';
    } else if (name.trim().length > 100) {
      newErrors.name = 'Task name must be less than 100 characters';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   * Validates inputs before calling onSubmit
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(name.trim(), description.trim());
      if (!editingTask) {
        setName('');
        setDescription('');
      }
    }
  };

  const isEditing = !!editingTask;

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <div className="rounded-lg border border-border bg-card p-4 shadow-soft transition-shadow hover:shadow-hover">
        <div className="space-y-4">
          {/* Task Name Input */}
          <div className="space-y-2">
            <Input
              placeholder="What needs to be done?"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              className={`text-base font-medium ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              aria-label="Task name"
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-sm text-destructive animate-fade-in">{errors.name}</p>
            )}
          </div>

          {/* Task Description Input */}
          <div className="space-y-2">
            <Textarea
              placeholder="Add a description..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
              }}
              className={`min-h-[80px] resize-none ${errors.description ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              aria-label="Task description"
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p className="text-sm text-destructive animate-fade-in">{errors.description}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2">
            {isEditing && onCancel && (
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            )}
            <Button type="submit" className="gap-2">
              {isEditing ? (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add Task
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
