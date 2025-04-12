
import React from 'react';
import { useTaskContext } from '../store/TaskContext';
import { Task } from '../store/TaskContext';
import { formatDate, formatTime, getPriorityInfo } from '../utils/taskUtils';
import { Check, Trash2, Clock, ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';
import CategoryBadge from './CategoryBadge';

type TaskItemProps = {
  task: Task;
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { dispatch } = useTaskContext();
  
  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (task.completed) {
      dispatch({ type: 'UNCOMPLETE_TASK', payload: task.id });
    } else {
      dispatch({ type: 'COMPLETE_TASK', payload: task.id });
    }
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'DELETE_TASK', payload: task.id });
  };
  
  const getPriorityIcon = () => {
    switch (task.priority) {
      case 'high':
        return <ArrowUp className="w-3 h-3" />;
      case 'medium':
        return <ArrowRight className="w-3 h-3" />;
      case 'low':
        return <ArrowDown className="w-3 h-3" />;
    }
  };
  
  const { className: priorityClass } = getPriorityInfo(task.priority);
  
  return (
    <div className={`task-card mb-3 animate-slide-up ${task.completed ? 'opacity-70' : ''}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={handleComplete}
          className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border ${
            task.completed 
              ? 'bg-primary border-primary text-white' 
              : 'border-gray-300 hover:border-primary'
          }`}
        >
          {task.completed && <Check className="w-3 h-3" />}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-medium text-base ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            
            <button 
              onClick={handleDelete}
              className="text-gray-400 hover:text-rose-500 p-1 -mt-1 -mr-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          {task.description && (
            <p className="text-sm text-gray-600 mt-1 mb-2">{task.description}</p>
          )}
          
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{formatDate(task.dueDate)}</span>
                {formatTime(task.dueDate) && (
                  <span className="ml-1">{formatTime(task.dueDate)}</span>
                )}
              </div>
            )}
            
            <div className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${priorityClass}`}>
              {getPriorityIcon()}
              <span className="capitalize">{task.priority}</span>
            </div>
            
            {task.categoryId && <CategoryBadge categoryId={task.categoryId} size="sm" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
