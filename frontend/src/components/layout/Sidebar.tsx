import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Library, BookOpen, PenTool, User, BookMarked, Bell, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Home, label: 'Início' },
  { path: '/biblioteca', icon: Library, label: 'Biblioteca' },
  { path: '/novels', icon: BookOpen, label: 'Novels / Histórias' },
  { path: '/meus-livros', icon: FolderOpen, label: 'Meus Livros' },
  { path: '/criar', icon: PenTool, label: 'Criar Conteúdo' },
  { path: '/notificacoes', icon: Bell, label: 'Notificações' },
  { path: '/perfil', icon: User, label: 'Perfil' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-sidebar border-r border-sidebar-border overflow-y-auto animate-slide-in-left">
      <nav className="p-4 space-y-2">
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-3 py-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-card">
            <BookMarked className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-foreground text-lg leading-tight">Biblioteca</h1>
            <p className="text-xs text-muted-foreground">Inteligente</p>
          </div>
        </div>

        {/* Navigation Items */}
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                "hover:bg-sidebar-accent hover:shadow-sm",
                isActive && "bg-sidebar-accent shadow-card text-sidebar-primary font-medium"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <item.icon 
                className={cn(
                  "w-5 h-5 transition-all duration-200",
                  isActive ? "text-sidebar-primary" : "text-muted-foreground group-hover:text-sidebar-primary"
                )} 
              />
              <span className={cn(
                "transition-colors duration-200",
                isActive ? "text-sidebar-primary" : "text-sidebar-foreground"
              )}>
                {item.label}
              </span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary animate-scale-in" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border bg-sidebar">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-primary-light">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Explorar IA</p>
            <p className="text-xs text-muted-foreground">Ferramentas inteligentes</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
