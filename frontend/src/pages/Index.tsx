import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, Clock, Sparkles, ArrowRight, Library, PenTool } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import BookCard from '@/components/books/BookCard';
import NovelCard from '@/components/novels/NovelCard';
import StatsCard from '@/components/ui/StatsCard';
import { mockBooks, mockNovels } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Index: React.FC = () => {
  const recentBooks = mockBooks.slice(0, 4);
  const popularNovels = mockNovels.slice(0, 3);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Section */}
        <section className="animate-fade-in">
          <div className="bg-gradient-warm rounded-3xl p-8 border border-border shadow-card overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-primary opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-primary-light">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">Plataforma IA</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                Bem-vindo à Biblioteca Inteligente
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mb-6">
                Explore, aprenda e crie com a ajuda da inteligência artificial. A sua biblioteca digital para o futuro da educação.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/biblioteca"
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200",
                    "bg-gradient-primary text-primary-foreground shadow-card hover:shadow-card-hover hover:opacity-90"
                  )}
                >
                  <Library className="w-4 h-4" />
                  Explorar Biblioteca
                </Link>
                <Link
                  to="/criar"
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200",
                    "bg-secondary text-secondary-foreground hover:bg-accent"
                  )}
                >
                  <PenTool className="w-4 h-4" />
                  Criar Conteúdo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <StatsCard
            icon={BookOpen}
            label="Livros Disponíveis"
            value="1,250"
            trend={{ value: 12, positive: true }}
          />
          <StatsCard
            icon={TrendingUp}
            label="Leituras Este Mês"
            value="342"
            trend={{ value: 8, positive: true }}
          />
          <StatsCard
            icon={Clock}
            label="Horas de Estudo"
            value="86"
          />
          <StatsCard
            icon={Sparkles}
            label="Resumos IA"
            value="127"
            trend={{ value: 24, positive: true }}
          />
        </section>

        {/* Recent Books */}
        <section className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-foreground">Livros Recentes</h2>
            <Link
              to="/biblioteca"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline transition-all"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {recentBooks.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        </section>

        {/* Popular Novels */}
        <section className="animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-foreground">Histórias Populares</h2>
            <Link
              to="/novels"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline transition-all"
            >
              Ver todas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {popularNovels.map((novel, index) => (
              <NovelCard key={novel.id} novel={novel} index={index} />
            ))}
          </div>
        </section>

        {/* AI Features Promo */}
        <section className="animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="bg-card rounded-3xl p-6 border border-border shadow-card">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-floating animate-float">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  Potenciado por Inteligência Artificial
                </h3>
                <p className="text-muted-foreground">
                  Resumos automáticos, respostas às suas perguntas, trabalhos académicos e muito mais. 
                  Selecione livros e deixe a IA ajudar-lhe a aprender.
                </p>
              </div>
              <Link
                to="/biblioteca"
                className={cn(
                  "flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium",
                  "bg-gradient-primary text-primary-foreground shadow-card",
                  "hover:shadow-card-hover hover:opacity-90 transition-all duration-200"
                )}
              >
                Experimentar Agora
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
