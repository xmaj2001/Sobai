import React from 'react';
import { Link } from 'react-router-dom';
import {
  User, 
  BookOpen, 
  Heart, 
  Star, 
  Clock, 
  Settings, 
  Edit, 
  Mail, 
  Calendar 
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import StatsCard from '@/components/ui/StatsCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Perfil: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <section className="bg-card rounded-2xl border border-border shadow-card overflow-hidden animate-fade-in">
          {/* Cover */}
          <div className="h-32 bg-gradient-primary relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-8 w-24 h-24 rounded-full bg-primary-foreground/20 blur-2xl" />
              <div className="absolute bottom-4 right-12 w-32 h-32 rounded-full bg-primary-foreground/20 blur-3xl" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 mb-4">
              <div className="w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center border-4 border-card shadow-floating">
                <span className="text-3xl font-bold text-primary-foreground">JP</span>
              </div>
              <div className="flex-1">
                <h1 className="font-serif text-2xl font-bold text-foreground">João Paulo Silva</h1>
                <p className="text-muted-foreground">Leitor ávido e escritor amador</p>
              </div>
              <Link to="/editar-perfil">
                <Button variant="outline" className="gap-2 self-start">
                  <Edit className="w-4 h-4" />
                  Editar Perfil
                </Button>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                <span>joao.silva@email.com</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Membro desde Janeiro 2024</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up">
          <StatsCard
            icon={BookOpen}
            label="Livros Lidos"
            value="47"
          />
          <StatsCard
            icon={Heart}
            label="Histórias Favoritas"
            value="23"
          />
          <StatsCard
            icon={Star}
            label="Avaliações"
            value="156"
          />
          <StatsCard
            icon={Clock}
            label="Horas de Leitura"
            value="234"
          />
        </section>

        {/* Reading Activity */}
        <section className="bg-card rounded-2xl p-6 border border-border shadow-card animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h2 className="font-serif text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Atividade de Leitura
          </h2>
          
          <div className="space-y-4">
            {[
              { title: 'Fundamentos de Inteligência Artificial', progress: 75, date: 'Hoje' },
              { title: 'História de Portugal', progress: 100, date: 'Ontem' },
              { title: 'Matemática Avançada', progress: 45, date: 'Há 2 dias' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{item.title}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          item.progress === 100 ? "bg-success" : "bg-gradient-primary"
                        )}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {item.progress}%
                    </span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{item.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Settings Quick Access */}
        <section className="bg-card rounded-2xl p-6 border border-border shadow-card animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h2 className="font-serif text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Definições Rápidas
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: 'Notificações', description: 'Gerir alertas e emails' },
              { label: 'Privacidade', description: 'Controlar visibilidade do perfil' },
              { label: 'Preferências de Leitura', description: 'Tamanho de fonte, tema' },
              { label: 'Conta', description: 'Password e segurança' },
            ].map((item, idx) => (
              <button
                key={idx}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-xl text-left transition-all duration-200",
                  "bg-muted/30 hover:bg-accent hover:shadow-sm"
                )}
              >
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Perfil;
