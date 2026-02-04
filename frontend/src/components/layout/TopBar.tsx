import React, { useState } from 'react';
import { Search, Sun, Moon, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const TopBar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 animate-slide-down">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left: Logo for mobile */}
        <div className="flex items-center gap-4 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">BI</span>
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-xl mx-auto px-4 lg:ml-64">
          <div 
            className={cn(
              "relative flex items-center transition-all duration-300",
              searchFocused && "transform scale-[1.02]"
            )}
          >
            <Search className={cn(
              "absolute left-4 w-5 h-5 transition-colors duration-200",
              searchFocused ? "text-primary" : "text-muted-foreground"
            )} />
            <input
              type="text"
              placeholder="Pesquisar livros, autores, histórias..."
              className={cn(
                "w-full pl-12 pr-4 py-2.5 rounded-xl border-2 bg-secondary/50 transition-all duration-300",
                "placeholder:text-muted-foreground text-foreground",
                "focus:outline-none focus:bg-card",
                searchFocused 
                  ? "border-primary shadow-card-hover" 
                  : "border-transparent hover:border-border"
              )}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2.5 rounded-xl transition-all duration-300 group",
              "hover:bg-accent hover:shadow-sm",
              "active:scale-95"
            )}
            aria-label="Alternar tema"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
            ) : (
              <Sun className="w-5 h-5 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
            )}
          </button>

          {/* Notifications */}
          <button 
            className={cn(
              "relative p-2.5 rounded-xl transition-all duration-300 group",
              "hover:bg-accent hover:shadow-sm",
              "active:scale-95"
            )}
            aria-label="Notificações"
          >
            <Bell className="w-5 h-5 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
          </button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={cn(
                "flex items-center gap-2 p-1.5 pr-3 rounded-xl transition-all duration-300",
                "hover:bg-accent hover:shadow-sm",
                "active:scale-[0.98]"
              )}>
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-medium text-sm">JP</span>
                </div>
                <span className="hidden sm:block text-sm font-medium text-foreground">João Paulo</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 animate-scale-in">
              <DropdownMenuItem className="gap-3 cursor-pointer" asChild>
                <a href="/perfil">
                  <User className="w-4 h-4" />
                  <span>Meu Perfil</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 cursor-pointer" asChild>
                <a href="/editar-perfil">
                  <Settings className="w-4 h-4" />
                  <span>Definições</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-3 cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="w-4 h-4" />
                <span>Terminar Sessão</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
