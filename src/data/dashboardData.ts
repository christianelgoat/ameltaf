import { Sprout, Factory, PackageSearch, Truck, LucideIcon } from "lucide-react";

export type StageId = 'upstream' | 'midstream' | 'warehouse' | 'downstream';

export interface KPI {
  name: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
  trend?: string;
  trendDirection?: 'up' | 'down';
}

export interface SupplyChainStage {
  id: StageId;
  title: string;
  subtitle: string;
  icon: typeof Sprout;
  actors: string;
  problem: string;
  solution: string;
  tools: string[];
  kpis: KPI[];
  description: string;
}

export const supplyChainData: SupplyChainStage[] = [
  {
    id: "upstream",
    title: "Suministro y Abastecimiento",
    subtitle: "Upstream",
    icon: Sprout,
    description: "Gestión de materia prima (grano verde).",
    actors: "Pequeños productores de café de especialidad en regiones de origen único como Cajamarca y Cusco.",
    problem: "Actualmente la empresa compra al precio más bajo, lo que genera inconsistencia en la calidad (humedad excesiva o granos defectuosos).",
    solution: "Se debe visualizar el desempeño de los productores mediante KPIs de calidad para asegurar que el insumo cumpla con los estándares del café de especialidad.",
    tools: ["Gestión de Proveedores", "Control de Calidad en Origen"],
    kpis: [
      { name: "Tasa de Defectos", value: "15%", status: "critical", trend: "+3%", trendDirection: "up" },
      { name: "Humedad Promedio", value: "11.2%", status: "warning", trend: "-0.5%", trendDirection: "down" },
      { name: "Productores Cert.", value: "45%", status: "good", trend: "+5%", trendDirection: "up" }
    ]
  },
  {
    id: "midstream",
    title: "Planeamiento y Ope.",
    subtitle: "Midstream",
    icon: Factory,
    description: "Operaciones internas y sincronización de demanda.",
    actors: "Equipo de Planta, Tostadores y Empacadores.",
    problem: "Quiebres de stock del café Geisha y exceso de otros menos populares. Cuellos de botella en la línea de tostado.",
    solution: "Implementar S&OP y Producción Lean. El proceso debe buscar la eliminación de desperdicios y la gestión de cuellos de botella.",
    tools: ["S&OP", "MPS (Plan Maestro)", "MRP", "Producción Lean"],
    kpis: [
      { name: "OEE (Línea)", value: "65%", status: "critical", trend: "-2%", trendDirection: "down" },
      { name: "Cumplimiento MPS", value: "78%", status: "warning", trend: "+1%", trendDirection: "up" },
      { name: "Mermas Empaque", value: "8%", status: "warning", trend: "+2%", trendDirection: "up" }
    ]
  },
  {
    id: "warehouse",
    title: "Gestión de Almacenes",
    subtitle: "Warehouse Mgt.",
    icon: PackageSearch,
    description: "Flujo de inventario: Recepción, Almacenamiento, Picking.",
    actors: "Operarios de Almacén y Montacarguistas.",
    problem: "Errores actuales en Preparación de Pedidos (Picking), ej. enviar variedad Caturra por Bourbon.",
    solution: "Realizar conteos cíclicos e implementar un Análisis ABC para ubicar los cafés más vendidos en zonas accesibles y precisas.",
    tools: ["Análisis ABC", "Conteos Cíclicos", "WMS Básico"],
    kpis: [
      { name: "ERI (Exactitud Inv.)", value: "82%", status: "critical", trend: "-5%", trendDirection: "down" },
      { name: "Errores Picking", value: "4.5%", status: "critical", trend: "+1.2%", trendDirection: "up" },
      { name: "Rotación Inventario", value: "12 Días", status: "good", trend: "-2 Días", trendDirection: "down" }
    ]
  },
  {
    id: "downstream",
    title: "Distribución y Última Milla",
    subtitle: "Downstream",
    icon: Truck,
    description: "B2B (Cafeterías) y B2C (Tienda Online).",
    actors: "Servicio de taxi local (Actual) -> 3PL (Propuesto).",
    problem: "Taxi poco fiable genera ineficiencia de rutas, congestión y entregas fallidas. Logística Inversa desorganizada.",
    solution: "Transición hacia un 3PL especializado en paquetería para cumplir la promesa de 48 horas y gestionar devoluciones.",
    tools: ["Integración 3PL", "Gestión de Rutas", "Logística Inversa"],
    kpis: [
      { name: "OTD (On-Time Delivery)", value: "76%", status: "critical", trend: "-6%", trendDirection: "down" },
      { name: "Tasa Devoluciones", value: "6.2%", status: "warning", trend: "+1.5%", trendDirection: "up" },
      { name: "Crecimiento B2C", value: "+300%", status: "good", trend: "Anual", trendDirection: "up" }
    ]
  }
];

export const globalKpis = [
  { name: "On-Time Delivery (OTD)", value: "76%", status: "critical", subtitle: "Promesa 48h en riesgo" },
  { name: "Exactitud de Inventario (ERI)", value: "82%", status: "critical", subtitle: "Meta: > 98%" },
  { name: "Efectividad Global (OEE)", value: "65%", status: "warning", subtitle: "Línea de producción" },
  { name: "Crecimiento de Ventas B2C", value: "+300%", status: "good", subtitle: "Año a Año" }
];
