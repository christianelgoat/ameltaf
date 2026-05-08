import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SupplyChainStage } from '../data/dashboardData';
import { Users, AlertCircle, Lightbulb, Wrench, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { KPICard } from './KPICard';

interface StageDetailProps {
  stage: SupplyChainStage | null;
}

export function StageDetail({ stage }: StageDetailProps) {
  if (!stage) {
    return (
      <div className="w-full h-64 flex items-center justify-center border-2 border-dashed border-coffee-medium/20 rounded-3xl bg-white/50">
        <p className="text-coffee-medium italic font-serif text-lg">Seleccione un eslabón para ver detalles.</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full bg-white rounded-[2rem] shadow-sm border border-coffee-medium/10 overflow-hidden"
      >
        <div className="p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-bg-warm rounded-2xl text-terracotta">
              <stage.icon className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-coffee-dark mb-1">{stage.title}</h2>
              <p className="font-sans text-sm font-semibold tracking-wider uppercase text-coffee-medium/70">{stage.subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Col: Actors & Overview */}
            <div className="col-span-1 space-y-8">
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-coffee-dark mb-3">
                  <Users className="w-4 h-4 text-terracotta" /> Actores
                </h4>
                <p className="text-coffee-medium leading-relaxed bg-bg-warm p-4 rounded-xl text-sm">
                  {stage.actors}
                </p>
              </div>
              
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-coffee-dark mb-3">
                  <Wrench className="w-4 h-4 text-terracotta" /> Herramientas Clave
                </h4>
                <div className="flex flex-wrap gap-2">
                  {stage.tools.map(tool => (
                    <span key={tool} className="px-3 py-1.5 bg-coffee-dark text-white text-xs font-semibold rounded-lg tracking-wide">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Col: Problem & Solution */}
            <div className="col-span-1 lg:col-span-2 space-y-6">
              
              {/* Problem */}
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h4 className="flex items-center gap-2 text-red-800 font-serif font-bold text-lg mb-3">
                  <AlertCircle className="w-5 h-5" /> Situación Actual (Problema)
                </h4>
                <p className="text-red-900/80 leading-relaxed text-sm">
                  {stage.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="bg-olive/10 p-6 rounded-2xl border border-olive/20">
                <h4 className="flex items-center gap-2 text-olive font-serif font-bold text-lg mb-3">
                  <Lightbulb className="w-5 h-5" /> Iniciativa Estratégica (Solución)
                </h4>
                <p className="text-olive/90 leading-relaxed text-sm">
                  {stage.solution}
                </p>
              </div>
              
            </div>
          </div>
          
          <div className="mt-10 pt-10 border-t border-coffee-medium/10">
            <h4 className="text-xl font-serif font-bold text-coffee-dark mb-6">Metricas del Eslabón (KPIs)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stage.kpis.map((kpi, idx) => (
                <KPICard 
                  key={idx}
                  name={kpi.name}
                  value={kpi.value}
                  status={kpi.status}
                  trend={kpi.trend}
                  trendDirection={kpi.trendDirection}
                />
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
