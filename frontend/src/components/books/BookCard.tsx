import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Book, useBookSelection } from '@/contexts/BookSelectionContext';

interface BookCardProps {
  book: Book;
  index?: number;
}

const BookCard: React.FC<BookCardProps> = ({ book, index = 0 }) => {
  const navigate = useNavigate();
  const { toggleBookSelection, isSelected } = useBookSelection();
  const selected = isSelected(book.id);

  const handleClick = (e: React.MouseEvent) => {
    if (e.shiftKey || e.ctrlKey || e.metaKey) {
      toggleBookSelection(book);
    } else {
      navigate(`/livro/${book.id}`);
    }
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookSelection(book);
  };

  return (
    <article
      onClick={handleClick}
      className={cn(
        "group relative bg-card rounded-2xl overflow-hidden cursor-pointer",
        "transition-all duration-300 ease-out",
        "hover:shadow-card-hover hover:-translate-y-1",
        "animate-slide-up",
        selected && "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-card-hover"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Selection Checkbox */}
      <button
        onClick={handleSelect}
        className={cn(
          "absolute top-3 left-3 z-10 w-7 h-7 rounded-lg transition-all duration-200",
          "flex items-center justify-center",
          selected 
            ? "bg-primary text-primary-foreground shadow-md" 
            : "bg-card/90 backdrop-blur-sm text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground"
        )}
      >
        <Check className={cn("w-4 h-4", !selected && "opacity-0 group-hover:opacity-50")} />
      </button>

      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={book.cover}
          alt={`Capa de ${book.title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Action */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="p-2 rounded-lg bg-primary text-primary-foreground shadow-floating">
            <BookOpen className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground mb-2">
          {book.category}
        </span>
        <h3 className="font-serif font-bold text-foreground text-lg leading-tight mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        {book.pages && (
          <p className="text-xs text-muted-foreground mt-2">{book.pages} páginas</p>
        )}
      </div>
    </article>
  );
};

export default BookCard;
