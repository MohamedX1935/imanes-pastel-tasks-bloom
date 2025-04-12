
import React, { useState } from 'react';
import { useTaskContext } from '../store/TaskContext';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import QuoteCard from '../components/QuoteCard';
import TaskList from '../components/TaskList';
import AddTaskButton from '../components/AddTaskButton';
import AddTaskForm from '../components/AddTaskForm';
import { Toaster } from '@/components/ui/toaster';
import { sortTasks } from '../utils/taskUtils';

const Index = () => {
  const { getTodayTasks, getUpcomingTasks, getCompletedTasks } = useTaskContext();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  
  // Get sorted tasks
  const todayTasks = sortTasks(getTodayTasks(), 'priority');
  const upcomingTasks = sortTasks(getUpcomingTasks(), 'date');
  const completedTasks = sortTasks(getCompletedTasks(), 'date').slice(0, 5); // Show only recent 5
  
  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-md">
        <QuoteCard />
        <ProgressBar />
        
        <TaskList
          title="Today's Tasks"
          icon="today"
          tasks={todayTasks}
          emptyMessage="No tasks for today. Add a new task to get started!"
        />
        
        <TaskList
          title="Upcoming Tasks"
          icon="upcoming"
          tasks={upcomingTasks}
          emptyMessage="No upcoming tasks scheduled."
        />
        
        <TaskList
          title="Completed Tasks"
          icon="completed"
          tasks={completedTasks}
          emptyMessage="No completed tasks yet. Your finished tasks will appear here."
        />
      </div>
      
      <AddTaskButton onClick={() => setIsAddTaskOpen(true)} />
      <AddTaskForm 
        isOpen={isAddTaskOpen} 
        onClose={() => setIsAddTaskOpen(false)} 
      />
      
      <Toaster />
    </div>
  );
};

export default Index;
