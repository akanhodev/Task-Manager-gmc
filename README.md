# To-Do List Application

A simple, beautiful To-Do List application built with React, TypeScript, and Tailwind CSS.

## Features

- **Add Tasks**: Create new tasks with a name and description (both fields validated)
- **Edit Tasks**: Click the edit button to modify existing tasks
- **Delete Tasks**: Remove tasks with a confirmation prompt
- **Complete Tasks**: Mark tasks as done with visual distinction
- **Filter Tasks**: View all, active, or completed tasks
- **Persistent Storage**: Tasks are saved to localStorage and persist between sessions
- **Responsive Design**: Works beautifully on all screen sizes

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **shadcn/ui** - Component library
- **Lucide React** - Icons

## Running Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/
│   ├── TaskForm.tsx      # Form for adding/editing tasks
│   ├── TaskItem.tsx      # Individual task display
│   ├── TaskList.tsx      # Container for tasks
│   ├── TaskFilter.tsx    # Filter buttons component
│   └── ui/               # shadcn/ui components
├── hooks/
│   └── useLocalStorage.ts # Custom hook for localStorage
├── types/
│   └── task.ts           # TypeScript interfaces
└── pages/
    └── Index.tsx         # Main application page
```

## Code Comments

All components include JSDoc comments explaining their purpose and props. Key functions are documented with their intended behavior.

## Additional Considerations

- **Accessibility**: The app includes proper ARIA labels and semantic HTML
- **Animations**: Smooth transitions enhance the user experience
- **Validation**: Form inputs are validated before submission
- **Error Handling**: localStorage operations are wrapped in try-catch blocks
