
import React from 'react';
import { useTaskContext } from '../store/TaskContext';
import { CheckCircle2, Trophy } from 'lucide-react';

const ProgressBar: React.FC = () => {
  const { getTaskCompletionPercentage, getTodayTasks } = useTaskContext();
  const completionPercentage = getTaskCompletionPercentage();
  const todayTasksCount = getTodayTasks().length;
  
  return (
    <div className="mb-5 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">Today's Progress</h3>
        </div>
        <span className="text-sm font-medium">
          {Math.round(completionPercentage)}%
        </span>
      </div>
      
      <div className="h-3 w-full bg-pastel-lavender/30 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      
      {completionPercentage === 100 && todayTasksCount > 0 && (
        <div className="mt-2 flex items-center gap-2 text-sm text-primary animate-bounce-soft">
          <Trophy className="h-4 w-4" />
          <span className="font-medium">All tasks completed! Great job!</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
