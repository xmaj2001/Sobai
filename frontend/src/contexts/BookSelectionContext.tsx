import React, { createContext, useContext, useState } from 'react';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  cover: string;
  description?: string;
  pages?: number;
}

interface BookSelectionContextType {
  selectedBooks: Book[];
  toggleBookSelection: (book: Book) => void;
  clearSelection: () => void;
  isSelected: (bookId: string) => boolean;
}

const BookSelectionContext = createContext<BookSelectionContextType | undefined>(undefined);

export const BookSelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);

  const toggleBookSelection = (book: Book) => {
    setSelectedBooks(prev => {
      const isAlreadySelected = prev.some(b => b.id === book.id);
      if (isAlreadySelected) {
        return prev.filter(b => b.id !== book.id);
      }
      return [...prev, book];
    });
  };

  const clearSelection = () => setSelectedBooks([]);

  const isSelected = (bookId: string) => selectedBooks.some(b => b.id === bookId);

  return (
    <BookSelectionContext.Provider value={{ selectedBooks, toggleBookSelection, clearSelection, isSelected }}>
      {children}
    </BookSelectionContext.Provider>
  );
};

export const useBookSelection = () => {
  const context = useContext(BookSelectionContext);
  if (!context) {
    throw new Error('useBookSelection must be used within a BookSelectionProvider');
  }
  return context;
};
