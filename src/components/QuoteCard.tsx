
import React, { useState, useEffect } from 'react';
import { getMotivationalQuote } from '../utils/taskUtils';
import { Quote } from 'lucide-react';

const pastelBgs = [
  'bg-pastel-pink',
  'bg-pastel-lavender',
  'bg-pastel-mint',
  'bg-pastel-yellow',
  'bg-pastel-peach',
  'bg-pastel-blue'
];

const QuoteCard: React.FC = () => {
  const [quote, setQuote] = useState(getMotivationalQuote());
  const [bgClass, setBgClass] = useState(pastelBgs[0]);
  
  // Change the quote every day
  useEffect(() => {
    const checkForNewQuote = () => {
      const randomBgIndex = Math.floor(Math.random() * pastelBgs.length);
      setBgClass(pastelBgs[randomBgIndex]);
      setQuote(getMotivationalQuote());
    };
    
    // Check initially
    checkForNewQuote();
    
    // Set up daily check
    const interval = setInterval(checkForNewQuote, 24 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`${bgClass} p-4 rounded-2xl mb-6 shadow-sm animate-fade-in`}>
      <div className="flex items-start gap-3">
        <Quote className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
        <div>
          <p className="text-sm font-medium italic mb-1">{quote.quote}</p>
          <p className="text-xs text-foreground/70">— {quote.author}</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
