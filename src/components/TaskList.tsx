
import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../store/TaskContext';
import { CalendarDays, ChevronRight, Sparkles, CheckCircle } from 'lucide-react';

type TaskListProps = {
  title: string;
  icon: 'today' | 'upcoming' | 'completed';
  tasks: Task[];
  emptyMessage: string;
};

const TaskList: React.FC<TaskListProps> = ({ title, icon, tasks, emptyMessage }) => {
  const getIcon = () => {
    switch (icon) {
      case 'today':
        return <Sparkles className="h-5 w-5 text-primary" />;
      case 'upcoming':
        return <CalendarDays className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="mb-6">
      <div className="section-title">
        {getIcon()}
        <span className="ml-2">{title}</span>
        {tasks.length > 0 && (
          <span className="ml-2 text-xs font-normal py-0.5 px-1.5 bg-pastel-gray rounded-full">
            {tasks.length}
          </span>
        )}
      </div>
      
      {tasks.length > 0 ? (
        <div>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="task-card flex items-center justify-center py-6 text-muted-foreground">
          <p className="text-sm">{emptyMessage}</p>
        </div>
      )}
      
      {tasks.length > 5 && (
        <button className="flex items-center text-sm text-primary hover:text-primary/80 mt-2 ml-auto">
          <span>Show all</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      )}
    </div>
  );
};

export default TaskList;
