import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  BarChart3, 
  Trash2, 
  Eye,
  Download,
  Heart,
  MoreVertical,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface UserBook {
  id: string;
  title: string;
  cover: string;
  category: string;
  publishedAt: string;
  status: 'published' | 'draft';
  views: number;
  downloads: number;
  likes: number;
}

const MeusLivros: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  const books: UserBook[] = [
    {
      id: '1',
      title: 'Fundamentos de Inteligência Artificial',
      cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=600&fit=crop',
      category: 'Tecnologia',
      publishedAt: '2024-01-15',
      status: 'published',
      views: 1250,
      downloads: 340,
      likes: 89,
    },
    {
      id: '2',
      title: 'Programação em Python',
      cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop',
      category: 'Tecnologia',
      publishedAt: '2024-02-20',
      status: 'published',
      views: 890,
      downloads: 220,
      likes: 56,
    },
    {
      id: '3',
      title: 'Guia de Machine Learning',
      cover: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=600&fit=crop',
      category: 'Tecnologia',
      publishedAt: '2024-03-10',
      status: 'draft',
      views: 0,
      downloads: 0,
      likes: 0,
    },
  ];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || book.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalViews = books.reduce((sum, book) => sum + book.views, 0);
  const totalDownloads = books.reduce((sum, book) => sum + book.downloads, 0);
  const totalLikes = books.reduce((sum, book) => sum + book.likes, 0);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              Meus Livros
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie os livros que publicou na plataforma
            </p>
          </div>
          
          <Link to="/registar-livro">
            <Button className="bg-gradient-primary hover:opacity-90 shadow-floating gap-2">
              <Plus className="w-4 h-4" />
              Novo Livro
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 animate-slide-up">
          <div className="bg-card rounded-2xl p-4 border border-border shadow-card text-center">
            <Eye className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{totalViews.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Visualizações</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border shadow-card text-center">
            <Download className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{totalDownloads.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Downloads</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border shadow-card text-center">
            <Heart className="w-6 h-6 text-rose-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{totalLikes.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Likes</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Pesquisar livros..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            {(['all', 'published', 'draft'] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(f)}
                className={cn(
                  filter === f && 'bg-gradient-primary hover:opacity-90'
                )}
              >
                {f === 'all' ? 'Todos' : f === 'published' ? 'Publicados' : 'Rascunhos'}
              </Button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-card rounded-2xl border border-border shadow-card overflow-hidden group transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            >
              {/* Cover */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <span className={cn(
                    "px-2.5 py-1 text-xs font-medium rounded-full",
                    book.status === 'published' 
                      ? "bg-success/90 text-white" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {book.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-xs text-primary font-medium mb-1">{book.category}</p>
                <h3 className="font-serif font-bold text-foreground line-clamp-2 mb-3">
                  {book.title}
                </h3>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {book.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {book.downloads}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {book.likes}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link to={`/editar-livro/${book.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <Edit className="w-4 h-4" />
                      Editar
                    </Button>
                  </Link>
                  <Link to={`/estatisticas-livro/${book.id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/livro/${book.id}`} className="gap-2">
                          <Eye className="w-4 h-4" />
                          Ver Livro
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12 bg-card rounded-2xl border border-border">
            <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-1">
              Nenhum livro encontrado
            </p>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 'Tente outra pesquisa' : 'Comece por adicionar o seu primeiro livro'}
            </p>
            <Link to="/registar-livro">
              <Button className="bg-gradient-primary hover:opacity-90 gap-2">
                <Plus className="w-4 h-4" />
                Adicionar Livro
              </Button>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MeusLivros;
