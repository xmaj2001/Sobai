import React, { useState, useMemo } from 'react';
import { Library, Filter, Grid3X3, List } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import BookGrid from '@/components/books/BookGrid';
import CategoryFilter from '@/components/ui/CategoryFilter';
import { mockBooks, categories } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Biblioteca: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredBooks = useMemo(() => {
    if (selectedCategory === 'Todos') return mockBooks;
    return mockBooks.filter(book => book.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-primary shadow-card">
              <Library className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground">Biblioteca</h1>
              <p className="text-sm text-muted-foreground">{filteredBooks.length} livros disponíveis</p>
            </div>
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                viewMode === 'grid'
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              )}
              aria-label="Vista em grelha"
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                viewMode === 'list'
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              )}
              aria-label="Vista em lista"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-card rounded-2xl p-4 border border-border shadow-card animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filtrar por categoria</span>
          </div>
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </section>

        {/* Selection Hint */}
        <section className="bg-accent/50 rounded-xl p-4 border border-accent animate-fade-in">
          <p className="text-sm text-accent-foreground">
            💡 <strong>Dica:</strong> Mantenha <kbd className="px-1.5 py-0.5 rounded bg-card border border-border text-xs">Ctrl</kbd> ou <kbd className="px-1.5 py-0.5 rounded bg-card border border-border text-xs">Shift</kbd> pressionado enquanto clica para selecionar múltiplos livros e usar as ferramentas de IA.
          </p>
        </section>

        {/* Books Grid */}
        <BookGrid books={filteredBooks} />
      </div>
    </MainLayout>
  );
};

export default Biblioteca;
