import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Star, 
  Download, 
  User, 
  BookOpen,
  List
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { mockNovels } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const mockChapters = [
  { id: 1, title: 'O Início da Jornada', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  { id: 2, title: 'A Descoberta', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...' },
  { id: 3, title: 'O Confronto', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...' },
  { id: 4, title: 'A Revelação', content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse...' },
  { id: 5, title: 'O Clímax', content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa...' },
];

const NovelDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [liked, setLiked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [showChapterList, setShowChapterList] = useState(false);

  const novel = mockNovels.find(n => n.id === id);
  const chapter = mockChapters[currentChapter];

  if (!novel) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-xl font-medium text-foreground mb-2">História não encontrada</h2>
          <Button onClick={() => navigate('/novels')} variant="outline">
            Voltar às Histórias
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        {/* Novel Header */}
        <section className="flex flex-col sm:flex-row gap-6 bg-card rounded-2xl p-6 border border-border shadow-card animate-fade-in">
          <img
            src={novel.cover}
            alt={novel.title}
            className="w-32 h-48 object-cover rounded-xl shadow-card"
          />
          <div className="flex-1">
            <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground mb-2">
              {novel.genre}
            </span>
            <h1 className="font-serif text-2xl font-bold text-foreground mb-2">{novel.title}</h1>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
              <User className="w-3.5 h-3.5" />
              <span>{novel.author}</span>
            </div>
            <p className="text-muted-foreground mb-4">{novel.description}</p>
            
            {/* Stats */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setLiked(!liked)}
                className={cn(
                  "flex items-center gap-1.5 transition-all duration-200",
                  liked ? "text-destructive" : "text-muted-foreground hover:text-destructive"
                )}
              >
                <Heart className={cn("w-5 h-5", liked && "fill-current")} />
                <span className="text-sm font-medium">{novel.likes + (liked ? 1 : 0)}</span>
              </button>
              
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    className="transition-transform duration-200 hover:scale-110"
                  >
                    <Star
                      className={cn(
                        "w-5 h-5",
                        star <= userRating
                          ? "text-yellow-500 fill-current"
                          : "text-muted-foreground"
                      )}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">{novel.rating.toFixed(1)}</span>
              </div>

              <div className="flex items-center gap-1.5 text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">{novel.chapters} capítulos</span>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-wrap gap-3 animate-slide-up">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setShowChapterList(!showChapterList)}
          >
            <List className="w-4 h-4" />
            Lista de Capítulos
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Baixar PDF Completo
          </Button>
        </section>

        {/* Chapter List (Collapsible) */}
        {showChapterList && (
          <section className="bg-card rounded-2xl border border-border shadow-card overflow-hidden animate-scale-in">
            <div className="p-4 border-b border-border">
              <h3 className="font-medium text-foreground">Capítulos</h3>
            </div>
            <div className="divide-y divide-border">
              {mockChapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setCurrentChapter(idx);
                    setShowChapterList(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200",
                    currentChapter === idx
                      ? "bg-primary-light text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <span className="font-medium">
                    Capítulo {ch.id}: {ch.title}
                  </span>
                  {currentChapter === idx && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                      A ler
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Reading Area */}
        <section className="bg-card rounded-2xl border border-border shadow-card overflow-hidden animate-slide-up" style={{ animationDelay: '100ms' }}>
          {/* Chapter Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
            <div>
              <span className="text-sm text-muted-foreground">Capítulo {chapter.id}</span>
              <h2 className="font-serif text-xl font-bold text-foreground">{chapter.title}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 prose prose-sm max-w-none text-foreground min-h-[400px]">
            <p className="whitespace-pre-line leading-relaxed text-lg">
              {chapter.content}
              {'\n\n'}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              {'\n\n'}
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/30">
            <Button
              variant="outline"
              onClick={() => setCurrentChapter(c => Math.max(0, c - 1))}
              disabled={currentChapter === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Capítulo Anterior
            </Button>
            
            <span className="text-sm text-muted-foreground">
              {currentChapter + 1} de {mockChapters.length}
            </span>

            <Button
              variant="outline"
              onClick={() => setCurrentChapter(c => Math.min(mockChapters.length - 1, c + 1))}
              disabled={currentChapter === mockChapters.length - 1}
              className="gap-2"
            >
              Próximo Capítulo
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default NovelDetails;
