
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define types
export type Priority = 'low' | 'medium' | 'high';

export type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  priority: Priority;
  categoryId?: string;
  createdAt: Date;
  completedAt?: Date;
  reminderTime?: Date;
};

type TaskState = {
  tasks: Task[];
  categories: Category[];
  userXp: number;
  level: number;
};

type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'UNCOMPLETE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'UPDATE_CATEGORY'; payload: Category }
  | { type: 'ADD_XP'; payload: number };

type TaskContextType = {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
  getTodayTasks: () => Task[];
  getUpcomingTasks: () => Task[];
  getCompletedTasks: () => Task[];
  getCategoryById: (id: string) => Category | undefined;
  getTaskCompletionPercentage: () => number;
};

// Sample data
const defaultCategories: Category[] = [
  { id: '1', name: 'Personal', color: '#FFDEE2', icon: 'heart' },
  { id: '2', name: 'Work', color: '#D3E4FD', icon: 'briefcase' },
  { id: '3', name: 'Health', color: '#F2FCE2', icon: 'apple' },
  { id: '4', name: 'Shopping', color: '#FDE1D3', icon: 'shopping-bag' },
];

// Helper function to generate a sample task for today
const generateSampleTask = (id: string, title: string, priority: Priority, categoryId: string): Task => {
  return {
    id,
    title,
    description: '',
    completed: false,
    priority,
    categoryId,
    createdAt: new Date(),
    dueDate: new Date(),
  };
};

// Initial state with sample data
const initialState: TaskState = {
  tasks: [
    generateSampleTask('1', 'Complete Imane\'s Task app', 'high', '2'),
    generateSampleTask('2', 'Go for a walk', 'medium', '3'),
    generateSampleTask('3', 'Buy flowers', 'low', '4'),
    generateSampleTask('4', 'Call mom', 'medium', '1'),
    generateSampleTask('5', 'Write in journal', 'low', '1'),
  ],
  categories: defaultCategories,
  userXp: 120,
  level: 2,
};

// Create context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Reducer function
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'COMPLETE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: true, completedAt: new Date() }
            : task
        ),
        userXp: state.userXp + 10,
      };
    case 'UNCOMPLETE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: false, completedAt: undefined }
            : task
        ),
        userXp: Math.max(0, state.userXp - 10),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(cat => cat.id !== action.payload),
        tasks: state.tasks.map(task =>
          task.categoryId === action.payload
            ? { ...task, categoryId: undefined }
            : task
        ),
      };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(cat =>
          cat.id === action.payload.id ? action.payload : cat
        ),
      };
    case 'ADD_XP':
      const newXp = state.userXp + action.payload;
      const xpPerLevel = 100;
      const newLevel = Math.floor(newXp / xpPerLevel) + 1;
      
      return {
        ...state,
        userXp: newXp,
        level: newLevel,
      };
    default:
      return state;
  }
};

// Provider component
export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const getTodayTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return state.tasks.filter(task => {
      if (!task.dueDate || task.completed) return false;
      
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      
      return taskDate.getTime() === today.getTime();
    });
  };

  const getUpcomingTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return state.tasks.filter(task => {
      if (!task.dueDate || task.completed) return false;
      
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      
      return taskDate.getTime() > today.getTime();
    });
  };

  const getCompletedTasks = () => {
    return state.tasks.filter(task => task.completed);
  };

  const getCategoryById = (id: string) => {
    return state.categories.find(cat => cat.id === id);
  };

  const getTaskCompletionPercentage = () => {
    const todayTasks = getTodayTasks();
    const completedToday = state.tasks.filter(task => {
      if (!task.dueDate || !task.completed || !task.completedAt) return false;
      
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const completedDate = new Date(task.completedAt);
      completedDate.setHours(0, 0, 0, 0);
      
      return taskDate.getTime() === today.getTime() && completedDate.getTime() === today.getTime();
    });
    
    if (todayTasks.length === 0) return 0;
    return (completedToday.length / (todayTasks.length + completedToday.length)) * 100;
  };

  return (
    <TaskContext.Provider
      value={{
        state,
        dispatch,
        getTodayTasks,
        getUpcomingTasks,
        getCompletedTasks,
        getCategoryById,
        getTaskCompletionPercentage
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook for using the task context
export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
