
import React from 'react';
import { useTaskContext } from '../store/TaskContext';
import { 
  Heart, Briefcase, Apple, ShoppingBag, Star, BookOpen, Music, Coffee,
  Home, Plane, PenTool, Camera, Smile, Dog, Cloud, GraduationCap, Utensils
} from 'lucide-react';

type CategoryBadgeProps = {
  categoryId: string | undefined;
  size?: 'sm' | 'md';
};

const iconMap: Record<string, React.ReactNode> = {
  'heart': <Heart className="h-full w-full" />,
  'briefcase': <Briefcase className="h-full w-full" />,
  'apple': <Apple className="h-full w-full" />,
  'shopping-bag': <ShoppingBag className="h-full w-full" />,
  'star': <Star className="h-full w-full" />,
  'book': <BookOpen className="h-full w-full" />,
  'music': <Music className="h-full w-full" />,
  'coffee': <Coffee className="h-full w-full" />,
  'home': <Home className="h-full w-full" />,
  'plane': <Plane className="h-full w-full" />,
  'pen': <PenTool className="h-full w-full" />,
  'camera': <Camera className="h-full w-full" />,
  'smile': <Smile className="h-full w-full" />,
  'dog': <Dog className="h-full w-full" />,
  'cloud': <Cloud className="h-full w-full" />,
  'education': <GraduationCap className="h-full w-full" />,
  'food': <Utensils className="h-full w-full" />,
};

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ categoryId, size = 'md' }) => {
  const { getCategoryById } = useTaskContext();
  
  if (!categoryId) return null;
  
  const category = getCategoryById(categoryId);
  if (!category) return null;
  
  const sizeClasses = size === 'sm' 
    ? 'text-xs py-0.5 px-2 gap-1' 
    : 'text-sm py-1 px-2.5 gap-1.5';
  
  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';
  
  return (
    <div 
      className={`rounded-full flex items-center ${sizeClasses} text-foreground/70 font-medium`}
      style={{ backgroundColor: `${category.color}80` }}
    >
      <div className={`${iconSize} flex-shrink-0`}>
        {iconMap[category.icon] || <Star className="h-full w-full" />}
      </div>
      <span>{category.name}</span>
    </div>
  );
};

export default CategoryBadge;
