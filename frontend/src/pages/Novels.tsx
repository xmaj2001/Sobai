import React, { useState, useMemo } from 'react';
import { BookOpen, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import NovelCard from '@/components/novels/NovelCard';
import CategoryFilter from '@/components/ui/CategoryFilter';
import { mockNovels, novelGenres } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Novels: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState('Todos');

  const filteredNovels = useMemo(() => {
    if (selectedGenre === 'Todos') return mockNovels;
    return mockNovels.filter(novel => novel.genre === selectedGenre);
  }, [selectedGenre]);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-primary shadow-card">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground">Novels / Histórias</h1>
              <p className="text-sm text-muted-foreground">{filteredNovels.length} histórias disponíveis</p>
            </div>
          </div>
          
          <Link
            to="/criar"
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200",
              "bg-gradient-primary text-primary-foreground shadow-card hover:shadow-card-hover hover:opacity-90"
            )}
          >
            <Plus className="w-4 h-4" />
            Criar História
          </Link>
        </section>

        {/* Filters */}
        <section className="bg-card rounded-2xl p-4 border border-border shadow-card animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filtrar por género</span>
          </div>
          <CategoryFilter
            categories={novelGenres}
            selected={selectedGenre}
            onSelect={setSelectedGenre}
          />
        </section>

        {/* Novels Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredNovels.map((novel, index) => (
            <NovelCard key={novel.id} novel={novel} index={index} />
          ))}
        </section>
      </div>
    </MainLayout>
  );
};

export default Novels;
