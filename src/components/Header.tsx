
import React from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../store/TaskContext';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  const { state } = useTaskContext();
  
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-pastel-pink/20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Heart className="text-primary w-6 h-6 fill-primary" />
          <h1 className="text-xl font-semibold text-foreground">Imane's Tasks</h1>
        </Link>
        
        <Link to="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-pastel-lavender/40 hover:bg-pastel-lavender/60 transition-colors">
          <div className="text-xs font-medium text-secondary-foreground">
            Level {state.level}
          </div>
          <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
            {state.level}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
