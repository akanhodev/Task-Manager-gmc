/**
 * Task interface representing a single to-do item
 * @property id - Unique identifier for the task
 * @property name - Title/name of the task
 * @property description - Detailed description of the task
 * @property completed - Whether the task has been marked as done
 * @property createdAt - Timestamp when the task was created
 */
export interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

/**
 * Filter options for displaying tasks
 */
export type TaskFilter = 'all' | 'active' | 'completed';
