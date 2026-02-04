import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, BookOpen, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Novel {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  chapters: number;
  likes: number;
  rating: number;
  genre: string;
}

interface NovelCardProps {
  novel: Novel;
  index?: number;
}

const NovelCard: React.FC<NovelCardProps> = ({ novel, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/novel/${novel.id}`)}
      className={cn(
        "group relative bg-card rounded-2xl overflow-hidden cursor-pointer",
        "transition-all duration-300 ease-out",
        "hover:shadow-card-hover hover:-translate-y-1",
        "animate-slide-up"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Cover Image */}
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <img
          src={novel.cover}
          alt={`Capa de ${novel.title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
        
        {/* Genre Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-full bg-card/90 backdrop-blur-sm text-foreground">
          {novel.genre}
        </span>

        {/* Stats Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-4 text-card">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 fill-current text-destructive" />
              <span className="text-sm font-medium">{novel.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current text-yellow-500" />
              <span className="text-sm font-medium">{novel.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">{novel.chapters} caps</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif font-bold text-foreground text-lg leading-tight mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {novel.title}
        </h3>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
          <User className="w-3.5 h-3.5" />
          <span>{novel.author}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{novel.description}</p>
      </div>
    </article>
  );
};

export default NovelCard;
