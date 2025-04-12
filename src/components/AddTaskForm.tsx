
import React, { useState } from 'react';
import { Task, Priority, useTaskContext } from '../store/TaskContext';
import { generateId } from '../utils/taskUtils';
import { X, Calendar, Clock, Flag, Tag } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type AddTaskFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddTaskForm: React.FC<AddTaskFormProps> = ({ isOpen, onClose }) => {
  const { dispatch, state } = useTaskContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    // Combine date and time
    let finalDueDate = dueDate;
    if (finalDueDate && dueTime) {
      const [hours, minutes] = dueTime.split(':').map(Number);
      finalDueDate = new Date(finalDueDate);
      finalDueDate.setHours(hours, minutes);
    }
    
    const newTask: Task = {
      id: generateId(),
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: finalDueDate,
      completed: false,
      priority,
      categoryId: categoryId || undefined,
      createdAt: new Date(),
    };
    
    dispatch({ type: 'ADD_TASK', payload: newTask });
    
    // Reset form
    setTitle('');
    setDescription('');
    setDueDate(new Date());
    setDueTime('');
    setPriority('medium');
    setCategoryId(undefined);
    
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] border-pastel-pink/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground/90">
            <Heart className="h-5 w-5 text-primary" />
            Add New Task
          </DialogTitle>
          <DialogDescription>
            Create a new task for your to-do list.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
              autoFocus
              className="border-pastel-pink/30 focus-visible:ring-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="border-pastel-pink/30 focus-visible:ring-primary"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal border-pastel-pink/30 ${!dueDate ? 'text-muted-foreground' : ''}`}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time (optional)</Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-left font-normal border-pastel-pink/30"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  <input
                    type="time"
                    id="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    className="focus:outline-none bg-transparent"
                  />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                <SelectTrigger 
                  id="priority" 
                  className="border-pastel-pink/30 focus:ring-primary"
                >
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low" className="flex items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-pastel-mint mr-2"></div>
                      Low
                    </div>
                  </SelectItem>
                  <SelectItem value="medium" className="flex items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-pastel-yellow mr-2"></div>
                      Medium
                    </div>
                  </SelectItem>
                  <SelectItem value="high" className="flex items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-pastel-pink mr-2"></div>
                      High
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category (optional)</Label>
              <Select 
                value={categoryId} 
                onValueChange={setCategoryId}
              >
                <SelectTrigger 
                  id="category" 
                  className="border-pastel-pink/30 focus:ring-primary"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {state.categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={onClose}
              className="border-pastel-pink/30"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90"
            >
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskForm;
