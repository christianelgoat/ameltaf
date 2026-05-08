import React from 'react';
import { motion } from 'motion/react';
import { SupplyChainStage, StageId } from '../data/dashboardData';
import { cn } from '../lib/utils';
import { ArrowRight, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface FlowDiagramProps {
  stages: SupplyChainStage[];
  activeStageId: StageId | null;
  onStageClick: (id: StageId) => void;
}

export function FlowDiagram({ stages, activeStageId, onStageClick }: FlowDiagramProps) {
  
  // Calculate an overall status for each node based on its KPIs
  const getStageStatus = (kpis: SupplyChainStage['kpis']) => {
    if (kpis.some(k => k.status === 'critical')) return 'critical';
    if (kpis.some(k => k.status === 'warning')) return 'warning';
    return 'good';
  };

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === 'critical') return <XCircle className="w-5 h-5 text-red-500 fill-red-50" />;
    if (status === 'warning') return <AlertTriangle className="w-5 h-5 text-yellow-500 fill-yellow-50" />;
    return <CheckCircle2 className="w-5 h-5 text-olive fill-olive/10" />;
  };

  return (
    <div className="w-full py-8 overflow-x-auto hide-scrollbar">
      <div className="flex items-center min-w-max justify-between gap-4 px-4">
        {stages.map((stage, index) => {
          const isActive = activeStageId === stage.id;
          const status = getStageStatus(stage.kpis);
          const Icon = stage.icon;
          
          return (
            <React.Fragment key={stage.id}>
              {/* Node */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStageClick(stage.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center p-6 w-56 rounded-3xl border-2 transition-all duration-300 shadow-sm outline-none text-left",
                  isActive 
                    ? "border-terracotta bg-white shadow-lg ring-4 ring-terracotta/10" 
                    : "border-transparent bg-white hover:border-coffee-medium/20"
                )}
              >
                <div className="absolute -top-3 -right-3 bg-white rounded-full p-0.5 shadow-sm">
                  <StatusIcon status={status} />
                </div>
                
                <div className={cn(
                  "p-4 rounded-2xl mb-4 transition-colors",
                  isActive ? "bg-terracotta text-white" : "bg-bg-warm text-coffee-medium"
                )}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-center font-serif font-semibold text-lg text-coffee-dark mb-1 leading-tight">
                  {stage.title}
                </h3>
                <p className="text-center text-xs font-medium text-coffee-medium uppercase tracking-widest opacity-70">
                  {stage.subtitle}
                </p>
                
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute -bottom-2 w-12 h-1 bg-terracotta rounded-full"
                  />
                )}
              </motion.button>
              
              {/* Connector Arrow */}
              {index < stages.length - 1 && (
                <div className="flex items-center justify-center px-2">
                  <div className="h-1 w-12 bg-coffee-medium/20 rounded-full overflow-hidden relative">
                    <motion.div 
                      className="absolute inset-0 bg-terracotta/40 origin-left"
                      animate={{ scaleX: [0, 1, 0], translateX: ['-100%', '0%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <ArrowRight className="w-6 h-6 text-coffee-medium/40 mx-2" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
