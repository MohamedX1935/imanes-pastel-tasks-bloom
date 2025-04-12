
import { Task, Priority, Category } from "../store/TaskContext";

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Format date for display
export const formatDate = (date: Date | undefined): string => {
  if (!date) return 'No date';
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const taskDate = new Date(date);
  taskDate.setHours(0, 0, 0, 0);
  
  if (taskDate.getTime() === today.getTime()) {
    return 'Today';
  } else if (taskDate.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  } else {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: today.getFullYear() !== taskDate.getFullYear() ? 'numeric' : undefined
    }).format(date);
  }
};

// Format time for display
export const formatTime = (date: Date | undefined): string => {
  if (!date) return '';
  
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

// Get priority icon and color
export const getPriorityInfo = (priority: Priority) => {
  switch (priority) {
    case 'low':
      return { 
        icon: 'arrow-down',
        className: 'priority-low'
      };
    case 'medium':
      return { 
        icon: 'minus',
        className: 'priority-medium'
      };
    case 'high':
      return { 
        icon: 'arrow-up',
        className: 'priority-high'
      };
    default:
      return { 
        icon: 'minus',
        className: 'priority-medium'
      };
  }
};

// Sort tasks
export const sortTasks = (tasks: Task[], sortBy: 'priority' | 'date' | 'category' = 'date'): Task[] => {
  return [...tasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityWeight = { low: 0, medium: 1, high: 2 };
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    } else if (sortBy === 'date') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortBy === 'category') {
      if (!a.categoryId) return 1;
      if (!b.categoryId) return -1;
      return a.categoryId.localeCompare(b.categoryId);
    }
    return 0;
  });
};

// Get motivational quotes
export const getMotivationalQuote = (): { quote: string, author: string } => {
  const quotes = [
    { quote: "You are capable of amazing things.", author: "Unknown" },
    { quote: "Every day is a new beginning.", author: "Unknown" },
    { quote: "Be the energy you want to attract.", author: "Unknown" },
    { quote: "Bloom where you are planted.", author: "Unknown" },
    { quote: "She believed she could, so she did.", author: "R.S. Grey" },
    { quote: "Create the life you can't wait to wake up to.", author: "Unknown" },
    { quote: "Your potential is endless.", author: "Unknown" },
    { quote: "Make yourself proud.", author: "Unknown" },
    { quote: "Dream big, sparkle more, shine bright.", author: "Unknown" },
    { quote: "Be a voice, not an echo.", author: "Unknown" },
  ];
  
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

// Get level information
export const getLevelInfo = (level: number, xp: number) => {
  const xpPerLevel = 100;
  const currentLevelXp = xp % xpPerLevel;
  const progress = (currentLevelXp / xpPerLevel) * 100;
  
  return {
    level,
    currentXp: currentLevelXp,
    nextLevelXp: xpPerLevel,
    progress
  };
};

// Get achievement badges
export const getAchievements = (tasks: Task[]): string[] => {
  const achievements: string[] = [];
  
  if (tasks.filter(t => t.completed).length >= 10) {
    achievements.push("10 Tasks Completed");
  }
  
  if (tasks.filter(t => t.completed && t.priority === 'high').length >= 5) {
    achievements.push("5 High Priority Tasks Completed");
  }
  
  const uniqueDays = new Set();
  tasks.filter(t => t.completed && t.completedAt).forEach(task => {
    if (task.completedAt) {
      const date = new Date(task.completedAt);
      uniqueDays.add(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
    }
  });
  
  if (uniqueDays.size >= 3) {
    achievements.push("Active 3+ Days");
  }
  
  return achievements;
};
