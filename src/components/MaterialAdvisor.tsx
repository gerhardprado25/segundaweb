import React, { useState } from 'react';
import { PRODUCTS, Product } from '../data/products';
import {
  Sparkles,
  ShieldAlert,
  Flame,
  Droplet,
  Utensils,
  Zap,
  RotateCw,
  ArrowRight,
  Calculator,
  CheckCircle2,
  X,
} from 'lucide-react';

interface MaterialAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onOpenCalculator: (product: Product) => void;
}

interface AdvisorOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  productIds: string[];
}

const ADVISOR_CRITERIA: AdvisorOption[] = [
  {
    id: 'friccion',
    label: 'Desgaste, Fricción y Piezas Mecánicas',
    icon: <RotateCw className="w-5 h-5 text-amber-500" />,
    description: 'Bujes, engranes, poleas, rodillos o tolvas que sufren abrasión continua.',
    productIds: ['poliamida-nylon', 'uhmw-pe', 'pom-acetal', 'poliuretano-pu'],
  },
  {
    id: 'aceites',
    label: 'Aceites, Combustibles y Grasas',
    icon: <Droplet className="w-5 h-5 text-blue-500" />,
    description: 'Retenes, cárter, motores y juntas en contacto con hidrocarburos o fluidos hidráulicos.',
    productIds: ['caucho-nitrilo-nbr', 'caucho-viton-fkm', 'pom-acetal'],
  },
  {
    id: 'quimicos',
    label: 'Ácidos y Químicos Fuertes',
    icon: <ShieldAlert className="w-5 h-5 text-purple-500" />,
    description: 'Lixiviación minera, decapado, cubas de ácido sulfúrico o solventes agresivos.',
    productIds: ['teflon-ptfe', 'caucho-hypalon-csm', 'pvc-rigido', 'caucho-viton-fkm'],
  },
  {
    id: 'alimentos',
    label: 'Alimentos, Farmacia y Agua Potable (FDA)',
    icon: <Utensils className="w-5 h-5 text-emerald-500" />,
    description: 'Mesas higiénicas, empaques no tóxicos y líneas sanitarias certificadas.',
    productIds: ['polietileno-hdpe', 'caucho-silicona', 'teflon-ptfe', 'polipropileno-pp'],
  },
  {
    id: 'calor',
    label: 'Calor Extremo o Fuego Directo (>200°C - 1260°C)',
    icon: <Flame className="w-5 h-5 text-orange-500" />,
    description: 'Bocas de hornos, chimeneas, soldadura pesada, calderas y escapes de turbina.',
    productIds: ['tela-de-ceramica', 'fibra-de-silicio', 'tela-fibra-de-vidrio', 'teflon-ptfe'],
  },
  {
    id: 'electrico',
    label: 'Aislamiento Eléctrico y Dieléctrico',
    icon: <Zap className="w-5 h-5 text-yellow-500" />,
    description: 'Tableros eléctricos, celdas de media tensión, transformadores y cuñas de motor.',
    productIds: ['fibra-baquelita', 'fibra-ferrosel', 'fibra-de-vidrio-fv'],
  },
];

export const MaterialAdvisor: React.FC<MaterialAdvisorProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onOpenCalculator,
}) => {
  const [selectedCriteria, setSelectedCriteria] = useState<string>('friccion');

  if (!isOpen) return null;

  const currentOption = ADVISOR_CRITERIA.find((c) => c.id === selectedCriteria) || ADVISOR_CRITERIA[0];
  const recommendedProducts = PRODUCTS.filter((p) =>
    currentOption.productIds.includes(p.id)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#00B074] text-white p-6 sm:p-8 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-100">
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Guía para Compradores No Técnicos</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              ¿No sabes qué material necesitas?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-50">
              Dinos a qué condición estará sometida tu pieza y te sugerimos el material ideal para que no gastes de más.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
            aria-label="Cerrar asesor"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step 1: Select Condition */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-3">
              1. Selecciona la principal exigencia de tu operación:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {ADVISOR_CRITERIA.map((crit) => {
                const isSelected = crit.id === selectedCriteria;
                return (
                  <button
                    key={crit.id}
                    onClick={() => setSelectedCriteria(crit.id)}
                    className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#00B074] bg-emerald-50/70 shadow-md ring-2 ring-[#00B074]/30'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 rounded-xl bg-white shadow-sm">{crit.icon}</div>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-[#00B074]" />
                        )}
                      </div>
                      <div className="text-xs font-bold text-slate-800 leading-snug">
                        {crit.label}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                        {crit.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recommendations List */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                2. Materiales Recomendados ({recommendedProducts.length}):
              </label>
              <span className="text-[11px] text-slate-500">
                Selecciona uno para ver sus medidas o cotizar
              </span>
            </div>

            <div className="space-y-3">
              {recommendedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-[#073B6E] bg-white transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 max-w-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#073B6E]">
                        {prod.name}
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                        {prod.categoryName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      {prod.solvedProblem}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProduct(prod);
                      }}
                      className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-bold border border-slate-300 rounded-xl hover:bg-slate-50 text-slate-700"
                    >
                      Ver Detalles
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenCalculator(prod);
                      }}
                      className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold bg-[#073B6E] hover:bg-[#04203F] text-white rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Calculator className="w-3.5 h-3.5 text-amber-400" />
                      <span>Cotizar Medidas</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            ¿Tu aplicación requiere análisis de laboratorio o ensayos de resistencia química?
          </p>
          <a
            href="https://wa.me/51981334762?text=Hola%20Corporaci%C3%B3n%20Emacin,%20deseo%20asesor%C3%ADa%20para%20elegir%20el%20material%20adecuado."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#00B074] hover:bg-[#009E60] text-white text-xs font-bold flex items-center justify-center gap-2"
          >
            <span>Consultar con un Ingeniero vía WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
