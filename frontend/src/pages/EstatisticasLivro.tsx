import React, { useState } from 'react';
import { 
  BarChart3, 
  Eye, 
  Download, 
  Heart, 
  FileText,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/ui/StatsCard';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const EstatisticasLivro: React.FC = () => {
  const { id } = useParams();
  const [period, setPeriod] = useState('30d');

  // Mock data
  const bookTitle = 'Fundamentos de Inteligência Artificial';
  const stats = {
    views: 1250,
    viewsTrend: 12,
    downloads: 340,
    downloadsTrend: 8,
    likes: 89,
    likesTrend: -3,
    summaries: 156,
    summariesTrend: 25,
  };

  const dailyData = [
    { date: '01 Jan', views: 45, downloads: 12 },
    { date: '02 Jan', views: 52, downloads: 15 },
    { date: '03 Jan', views: 38, downloads: 8 },
    { date: '04 Jan', views: 65, downloads: 18 },
    { date: '05 Jan', views: 48, downloads: 14 },
    { date: '06 Jan', views: 72, downloads: 22 },
    { date: '07 Jan', views: 58, downloads: 16 },
  ];

  const maxViews = Math.max(...dailyData.map(d => d.views));

  const topReferrers = [
    { source: 'Pesquisa Google', visits: 420, percentage: 34 },
    { source: 'Direto', visits: 310, percentage: 25 },
    { source: 'Redes Sociais', visits: 245, percentage: 20 },
    { source: 'Email', visits: 156, percentage: 12 },
    { source: 'Outros', visits: 119, percentage: 9 },
  ];

  const recentActivity = [
    { action: 'Download', user: 'Maria S.', time: 'Há 5 minutos' },
    { action: 'Visualização', user: 'João F.', time: 'Há 12 minutos' },
    { action: 'Resumo gerado', user: 'Ana C.', time: 'Há 25 minutos' },
    { action: 'Like', user: 'Pedro M.', time: 'Há 1 hora' },
    { action: 'Download', user: 'Sofia L.', time: 'Há 2 horas' },
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-4">
            <Link to="/meus-livros">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-primary" />
                Estatísticas
              </h1>
              <p className="text-muted-foreground">{bookTitle}</p>
            </div>
          </div>

          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up">
          <StatsCard
            icon={Eye}
            label="Visualizações"
            value={stats.views.toLocaleString()}
            trend={{ value: stats.viewsTrend, positive: stats.viewsTrend > 0 }}
          />
          <StatsCard
            icon={Download}
            label="Downloads"
            value={stats.downloads.toLocaleString()}
            trend={{ value: stats.downloadsTrend, positive: stats.downloadsTrend > 0 }}
          />
          <StatsCard
            icon={Heart}
            label="Likes"
            value={stats.likes.toLocaleString()}
            trend={{ value: stats.likesTrend, positive: stats.likesTrend > 0 }}
          />
          <StatsCard
            icon={FileText}
            label="Resumos Gerados"
            value={stats.summaries.toLocaleString()}
            trend={{ value: stats.summariesTrend, positive: stats.summariesTrend > 0 }}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-card animate-slide-up" style={{ animationDelay: '100ms' }}>
            <h2 className="font-serif text-lg font-bold text-foreground mb-6">
              Visualizações e Downloads
            </h2>
            
            <div className="space-y-4">
              {dailyData.map((day, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-16">{day.date}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                        style={{ width: `${(day.views / maxViews) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground w-12 text-right">
                      {day.views}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-primary" />
                <span className="text-sm text-muted-foreground">Visualizações</span>
              </div>
            </div>
          </div>

          {/* Top Referrers */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-card animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h2 className="font-serif text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Fontes de Tráfego
            </h2>
            
            <div className="space-y-4">
              {topReferrers.map((referrer, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{referrer.source}</span>
                    <span className="text-sm text-muted-foreground">{referrer.percentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        idx === 0 ? "bg-gradient-primary" : "bg-primary/50"
                      )}
                      style={{ width: `${referrer.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-card animate-slide-up" style={{ animationDelay: '300ms' }}>
          <h2 className="font-serif text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Atividade Recente
          </h2>
          
          <div className="divide-y divide-border">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                    activity.action === 'Download' && "bg-green-500/10 text-green-500",
                    activity.action === 'Visualização' && "bg-blue-500/10 text-blue-500",
                    activity.action === 'Resumo gerado' && "bg-purple-500/10 text-purple-500",
                    activity.action === 'Like' && "bg-rose-500/10 text-rose-500"
                  )}>
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EstatisticasLivro;
