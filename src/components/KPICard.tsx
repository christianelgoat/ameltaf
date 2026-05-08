import React from 'react';
import { cn } from '../lib/utils';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface KPICardProps {
  name: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
  subtitle?: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
  className?: string;
}

export function KPICard({ name, value, status, subtitle, trend, trendDirection, className }: KPICardProps) {
  const statusColors = {
    good: "bg-olive/10 text-olive border-olive/20",
    warning: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
    critical: "bg-red-500/10 text-red-700 border-red-500/20",
  };

  const statusDot = {
    good: "bg-olive",
    warning: "bg-yellow-500",
    critical: "bg-red-500",
  };

  return (
    <div className={cn("rounded-2xl border bg-bg-card p-5 shadow-sm transition-all hover:shadow-md", className)}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-coffee-medium tracking-wide uppercase">{name}</h3>
        <div className={cn("flex items-center px-2 py-1 rounded-full text-xs font-semibold border", statusColors[status])}>
          <div className={cn("w-1.5 h-1.5 rounded-full mr-1.5", statusDot[status])} />
          {status === 'good' ? 'Óptimo' : status === 'warning' ? 'Alerta' : 'Crítico'}
        </div>
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-light text-coffee-dark font-sans">{value}</span>
        {trend && (
          <span className={cn(
            "flex items-center text-xs font-medium",
            trendDirection === 'up' && status === 'good' ? 'text-olive' : 
            trendDirection === 'down' && status === 'good' ? 'text-red-500' :
            trendDirection === 'up' && status === 'critical' ? 'text-red-500' :
            trendDirection === 'down' && status === 'critical' ? 'text-olive' : 'text-coffee-medium'
          )}>
            {trendDirection === 'up' ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
            {trend}
          </span>
        )}
      </div>
      
      {subtitle && (
        <p className="mt-2 text-xs text-coffee-medium opacity-80">{subtitle}</p>
      )}
    </div>
  );
}
