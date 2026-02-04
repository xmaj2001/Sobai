import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, label, value, trend, className }) => {
  return (
    <div className={cn(
      "p-4 rounded-2xl bg-card border border-border shadow-card",
      "transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-xl bg-primary-light">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trend.positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          )}>
            {trend.positive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;
