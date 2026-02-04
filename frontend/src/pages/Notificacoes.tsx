import React, { useState } from 'react';
import { 
  Bell, 
  BookOpen, 
  Heart, 
  MessageSquare, 
  Star, 
  Download,
  Check,
  CheckCheck,
  Trash2,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'download' | 'rating' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

const Notificacoes: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      title: 'Novo like',
      message: 'Maria Santos gostou do seu livro "Fundamentos de IA"',
      time: 'Há 5 minutos',
      read: false,
      link: '/meus-livros',
    },
    {
      id: '2',
      type: 'comment',
      title: 'Novo comentário',
      message: 'João Ferreira comentou: "Excelente conteúdo, muito útil!"',
      time: 'Há 1 hora',
      read: false,
      link: '/livro/1',
    },
    {
      id: '3',
      type: 'download',
      title: 'Download concluído',
      message: '15 pessoas baixaram o seu livro hoje',
      time: 'Há 2 horas',
      read: false,
      link: '/estatisticas-livro/1',
    },
    {
      id: '4',
      type: 'rating',
      title: 'Nova avaliação',
      message: 'O seu livro recebeu uma avaliação de 5 estrelas',
      time: 'Há 3 horas',
      read: true,
      link: '/meus-livros',
    },
    {
      id: '5',
      type: 'system',
      title: 'Atualização da plataforma',
      message: 'Novas funcionalidades de IA disponíveis. Confira!',
      time: 'Há 1 dia',
      read: true,
    },
    {
      id: '6',
      type: 'like',
      title: 'Novos likes',
      message: 'A sua história "O Último Guardião" recebeu 10 novos likes',
      time: 'Há 2 dias',
      read: true,
      link: '/novel/1',
    },
  ]);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return Heart;
      case 'comment':
        return MessageSquare;
      case 'download':
        return Download;
      case 'rating':
        return Star;
      case 'system':
        return Bell;
      default:
        return Bell;
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return 'text-rose-500 bg-rose-500/10';
      case 'comment':
        return 'text-blue-500 bg-blue-500/10';
      case 'download':
        return 'text-green-500 bg-green-500/10';
      case 'rating':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'system':
        return 'text-primary bg-primary-light';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground flex items-center gap-3">
              <Bell className="w-6 h-6 text-primary" />
              Notificações
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 text-sm font-medium rounded-full bg-primary text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </h1>
            <p className="text-muted-foreground mt-1">
              Mantenha-se atualizado com as novidades
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" className="gap-2" onClick={markAllAsRead}>
                <CheckCheck className="w-4 h-4" />
                Marcar todas como lidas
              </Button>
            )}
            <Link to="/definicoes-notificacoes">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden animate-slide-up">
          {notifications.length > 0 ? (
            <div className="divide-y divide-border">
              {notifications.map((notification, idx) => {
                const Icon = getIcon(notification.type);
                const NotificationContent = (
                  <div
                    className={cn(
                      "flex items-start gap-4 p-4 transition-colors",
                      !notification.read && "bg-primary/5",
                      notification.link && "hover:bg-accent cursor-pointer"
                    )}
                    onClick={() => notification.link && markAsRead(notification.id)}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                      getIconColor(notification.type)
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className={cn(
                            "font-medium text-foreground",
                            !notification.read && "font-semibold"
                          )}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );

                return notification.link ? (
                  <Link key={notification.id} to={notification.link}>
                    {NotificationContent}
                  </Link>
                ) : (
                  <div key={notification.id}>{NotificationContent}</div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Bell className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground mb-1">
                Sem notificações
              </p>
              <p className="text-muted-foreground">
                Quando houver novidades, aparecerão aqui
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Notificacoes;
