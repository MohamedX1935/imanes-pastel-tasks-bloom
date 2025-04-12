
import React from 'react';
import { Plus, Heart } from 'lucide-react';

type AddTaskButtonProps = {
  onClick: () => void;
};

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="heart-button animate-pulse-soft fixed bottom-6 right-6 z-10 flex items-center justify-center"
      aria-label="Add new task"
    >
      <Heart className="absolute h-6 w-6 fill-white/30" />
      <Plus className="h-6 w-6" />
    </button>
  );
};

export default AddTaskButton;
