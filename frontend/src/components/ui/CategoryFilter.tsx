import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200",
            selected === category
              ? "bg-gradient-primary text-primary-foreground shadow-card"
              : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
