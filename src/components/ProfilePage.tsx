
import React from 'react';
import { useTaskContext } from '../store/TaskContext';
import { getLevelInfo, getAchievements } from '../utils/taskUtils';
import { 
  Sparkles, Trophy, CheckCircle2, Calendar, Star, BarChart, Flame
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ProfilePage: React.FC = () => {
  const { state, getTodayTasks, getCompletedTasks } = useTaskContext();
  const { level, currentXp, nextLevelXp, progress } = getLevelInfo(state.level, state.userXp);
  const achievements = getAchievements(state.tasks);
  const completedTasks = getCompletedTasks();
  
  const stats = [
    { 
      label: 'Tasks Completed', 
      value: completedTasks.length,
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />
    },
    { 
      label: 'Current Streak', 
      value: '3 days',
      icon: <Flame className="h-5 w-5 text-orange-500" />
    },
    { 
      label: 'Tasks Created', 
      value: state.tasks.length,
      icon: <Star className="h-5 w-5 text-yellow-500" />
    },
    { 
      label: 'Categories', 
      value: state.categories.length,
      icon: <BarChart className="h-5 w-5 text-blue-500" />
    }
  ];
  
  const highPriorityCompleted = completedTasks.filter(task => task.priority === 'high').length;
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-md animate-fade-in">
      {/* Level Card */}
      <div className="bg-gradient-to-r from-pastel-lavender to-pastel-pink rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Your Level
          </h2>
          <div className="bg-white/30 backdrop-blur-sm rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold">
            {level}
          </div>
        </div>
        
        <Progress value={progress} className="h-3 mb-2" />
        
        <div className="flex justify-between text-xs text-foreground/80">
          <span>{currentXp} XP</span>
          <span>{nextLevelXp} XP</span>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-pastel-pink/20">
            <div className="flex items-center gap-2 mb-2">
              {stat.icon}
              <span className="text-sm font-medium">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      
      {/* Achievements */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-pastel-pink/20 mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Achievements
        </h2>
        
        {achievements.length > 0 ? (
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 animate-pulse-soft">
                <div className="h-10 w-10 rounded-full bg-pastel-yellow flex items-center justify-center">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-medium">{achievement}</h3>
                  <p className="text-xs text-foreground/70">Well done!</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p className="text-sm">Complete tasks to earn achievements!</p>
          </div>
        )}
      </div>
      
      {/* Task Stats */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-pastel-pink/20">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-blue-500" />
          Task Statistics
        </h2>
        
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-pastel-lavender/30 p-3 rounded-lg">
              <p className="font-medium">High Priority</p>
              <p className="text-xl font-bold">{highPriorityCompleted}</p>
            </div>
            <div className="bg-pastel-mint/30 p-3 rounded-lg">
              <p className="font-medium">Today's Tasks</p>
              <p className="text-xl font-bold">{getTodayTasks().length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
