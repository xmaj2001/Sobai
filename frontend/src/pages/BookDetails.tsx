import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Download, 
  Eye, 
  Sparkles,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { mockBooks } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const BookDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [question, setQuestion] = useState('');

  const book = mockBooks.find(b => b.id === id);
  const totalPages = book?.pages || 100;
  const pagesPerView = 10;
  const totalViewPages = Math.ceil(totalPages / pagesPerView);

  if (!book) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-xl font-medium text-foreground mb-2">Livro não encontrado</h2>
          <Button onClick={() => navigate('/biblioteca')} variant="outline">
            Voltar à Biblioteca
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Mock extracted text content
  const mockContent = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos 
    qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
  `;

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

        {/* Book Header */}
        <section className="flex flex-col sm:flex-row gap-6 bg-card rounded-2xl p-6 border border-border shadow-card animate-fade-in">
          <img
            src={book.cover}
            alt={book.title}
            className="w-32 h-44 object-cover rounded-xl shadow-card"
          />
          <div className="flex-1">
            <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground mb-2">
              {book.category}
            </span>
            <h1 className="font-serif text-2xl font-bold text-foreground mb-2">{book.title}</h1>
            <p className="text-muted-foreground mb-4">{book.author}</p>
            <p className="text-sm text-muted-foreground">{book.pages} páginas</p>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-wrap gap-3 animate-slide-up">
          <Button variant="outline" className="gap-2">
            <Eye className="w-4 h-4" />
            Ver PDF Original
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Baixar PDF
          </Button>
          <Button className="gap-2 bg-gradient-primary hover:opacity-90">
            <Sparkles className="w-4 h-4" />
            Resumir Página
          </Button>
          <Button variant="secondary" className="gap-2">
            <FileText className="w-4 h-4" />
            Resumir Livro
          </Button>
          <Button variant="secondary" className="gap-2">
            <Download className="w-4 h-4" />
            Baixar Resumo
          </Button>
        </section>

        {/* Content Area */}
        <section className="bg-card rounded-2xl border border-border shadow-card overflow-hidden animate-slide-up" style={{ animationDelay: '100ms' }}>
          {/* Page Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">
                Página {(currentPage - 1) * pagesPerView + 1} - {Math.min(currentPage * pagesPerView, totalPages)}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              de {totalPages} páginas
            </span>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 prose prose-sm max-w-none text-foreground">
            <p className="whitespace-pre-line leading-relaxed">{mockContent}</p>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/30">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalViewPages) }, (_, i) => {
                const page = currentPage <= 3 
                  ? i + 1 
                  : currentPage >= totalViewPages - 2 
                    ? totalViewPages - 4 + i 
                    : currentPage - 2 + i;
                if (page < 1 || page > totalViewPages) return null;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200",
                      currentPage === page
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.min(totalViewPages, p + 1))}
              disabled={currentPage === totalViewPages}
              className="gap-2"
            >
              Próxima
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </section>

        {/* AI Question Section */}
        <section className="bg-card rounded-2xl p-6 border border-border shadow-card animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-foreground">Perguntar à IA sobre este livro</h3>
          </div>
          <div className="space-y-3">
            <Textarea
              placeholder="Escreva a sua pergunta sobre o conteúdo deste livro..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-24 resize-none"
            />
            <Button className="gap-2 bg-gradient-primary hover:opacity-90" disabled={!question.trim()}>
              <Sparkles className="w-4 h-4" />
              Enviar Pergunta
            </Button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default BookDetails;
