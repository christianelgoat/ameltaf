import React, { useState } from 'react';
import { supplyChainData, globalKpis, StageId } from './data/dashboardData';
import { FlowDiagram } from './components/FlowDiagram';
import { StageDetail } from './components/StageDetail';
import { KPICard } from './components/KPICard';
import { Coffee, Activity } from 'lucide-react';

export default function App() {
  const [activeStage, setActiveStage] = useState<StageId>('upstream');

  const selectedStage = supplyChainData.find(s => s.id === activeStage) || null;

  return (
    <div className="min-h-screen bg-bg-warm font-sans text-coffee-dark selection:bg-terracotta selection:text-white">
      
      {/* Header */}
      <header className="bg-white border-b border-coffee-medium/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-coffee-dark rounded-xl text-white">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold leading-tight">Café Andino Premium</h1>
                <p className="text-xs uppercase tracking-widest font-semibold text-coffee-medium/70">Supply Chain Control Tower</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-olive/10 text-olive rounded-full text-sm font-semibold border border-olive/20">
              <Activity className="w-4 h-4" />
              Sistema Operativo
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Global KPIs */}
        <section>
          <div className="flex items-baseline gap-4 mb-6">
            <h2 className="text-2xl font-serif font-bold text-coffee-dark">Visión Global</h2>
            <div className="h-[1px] flex-grow bg-coffee-medium/10"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {globalKpis.map((kpi, idx) => (
              <KPICard 
                key={idx}
                name={kpi.name}
                value={kpi.value}
                status={kpi.status as any}
                subtitle={kpi.subtitle}
                className="bg-white shadow-sm hover:shadow-md"
              />
            ))}
          </div>
        </section>

        {/* Value Chain Flow */}
        <section>
          <div className="flex items-baseline gap-4 mb-2">
            <h2 className="text-2xl font-serif font-bold text-coffee-dark">Cadena de Valor</h2>
            <div className="h-[1px] flex-grow bg-coffee-medium/10"></div>
          </div>
          <div className="bg-bg-warm rounded-[2rem] p-4">
            <FlowDiagram 
              stages={supplyChainData}
              activeStageId={activeStage}
              onStageClick={setActiveStage}
            />
          </div>
        </section>

        {/* Selected Stage Detail */}
        <section className="scroll-mt-24 pb-20">
          <StageDetail stage={selectedStage} />
        </section>
        
      </main>
    </div>
  );
}
