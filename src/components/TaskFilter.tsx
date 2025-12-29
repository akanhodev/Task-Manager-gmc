import { TaskFilter as FilterType } from '@/types/task';
import { Button } from '@/components/ui/button';
import { ListTodo, CheckCircle2, Circle } from 'lucide-react';

interface TaskFilterProps {
  /** Currently active filter */
  currentFilter: FilterType;
  /** Callback when filter changes */
  onFilterChange: (filter: FilterType) => void;
  /** Count of tasks for each filter */
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

/**
 * TaskFilter Component
 * Provides buttons to filter tasks by completion status
 */
export function TaskFilter({ currentFilter, onFilterChange, counts }: TaskFilterProps) {
  const filters: { value: FilterType; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All', icon: <ListTodo className="h-4 w-4" /> },
    { value: 'active', label: 'Active', icon: <Circle className="h-4 w-4" /> },
    { value: 'completed', label: 'Completed', icon: <CheckCircle2 className="h-4 w-4" /> },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filters.map(({ value, label, icon }) => (
        <Button
          key={value}
          variant={currentFilter === value ? 'default' : 'secondary'}
          size="sm"
          onClick={() => onFilterChange(value)}
          className="gap-2 transition-all"
        >
          {icon}
          {label}
          <span
            className={`
              ml-1 rounded-full px-2 py-0.5 text-xs font-medium
              ${currentFilter === value 
                ? 'bg-primary-foreground/20 text-primary-foreground' 
                : 'bg-muted text-muted-foreground'}
            `}
          >
            {counts[value]}
          </span>
        </Button>
      ))}
    </div>
  );
}
