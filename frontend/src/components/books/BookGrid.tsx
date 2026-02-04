import React from 'react';
import BookCard from './BookCard';
import { Book } from '@/contexts/BookSelectionContext';

interface BookGridProps {
  books: Book[];
  title?: string;
}

const BookGrid: React.FC<BookGridProps> = ({ books, title }) => {
  return (
    <section className="animate-fade-in">
      {title && (
        <h2 className="font-serif text-2xl font-bold text-foreground mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {books.map((book, index) => (
          <BookCard key={book.id} book={book} index={index} />
        ))}
      </div>
    </section>
  );
};

export default BookGrid;
