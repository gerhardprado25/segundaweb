import React from 'react';
import { Product } from '../data/products';
import {
  X,
  CheckCircle,
  Shield,
  Layers,
  Building2,
  ArrowRight,
  Boxes,
  Zap,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenCalculator: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenCalculator,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-300 overflow-hidden my-8">
        {/* Header - Limpio, sin textos adicionales debajo del título */}
        <div className="bg-[#073B6E] text-white p-6 sm:p-7 flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#FFD200] border border-white/20 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#FFD200]" />
              <span>{product.categoryName}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {product.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            aria-label="Cerrar modal"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[72vh] overflow-y-auto space-y-6">
          {/* ¿PARA QUÉ SIRVE? - Letras altamente legibles y nítidas */}
          <div className="bg-slate-50 border-2 border-[#073B6E]/20 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="text-xs font-black uppercase tracking-wider text-[#073B6E] flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-[#073B6E]" />
              <span>¿Para qué sirve?</span>
            </div>
            <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
              {product.solvedProblem}
            </p>
          </div>

          {/* PROPIEDADES DEL PRODUCTO (Sin rango térmico, dureza, densidad, espesores ni medidas) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#073B6E] flex items-center gap-2">
              <Boxes className="w-4 h-4 text-[#073B6E]" />
              <span>PROPIEDADES DEL PRODUCTO</span>
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {product.specifications.chemicalResistance && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-300">
                  <div className="text-xs font-bold text-[#073B6E] uppercase tracking-wider mb-1">
                    Resistencia Química
                  </div>
                  <div className="text-sm font-semibold text-slate-900 leading-relaxed">
                    {product.specifications.chemicalResistance}
                  </div>
                </div>
              )}

              {product.specifications.dielectricStrength && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-300">
                  <div className="text-xs font-bold text-[#073B6E] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Rigidez Dieléctrica</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900 leading-relaxed">
                    {product.specifications.dielectricStrength}
                  </div>
                </div>
              )}

              {/* Formatos Disponibles */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-300">
                <div className="text-xs font-bold text-[#073B6E] uppercase tracking-wider mb-2">
                  Formatos de Suministro
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.presentations.formats.map((fmt) => (
                    <span
                      key={fmt}
                      className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 shadow-xs"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Aplicaciones Comunes en Planta */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#073B6E] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#00B074]" />
              <span>Aplicaciones Comunes en Planta</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.applications.map((app, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00B074] mt-1.5 shrink-0" />
                  <span className="text-xs font-semibold text-slate-900 leading-snug">{app}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Industrias Recomendadas */}
          <div className="pt-2">
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Industrias recomendadas:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.industries.map((ind) => (
                <span
                  key={ind}
                  className="text-xs px-3 py-1 bg-slate-100 border border-slate-200 text-slate-800 rounded-full font-semibold"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer - Botón azul para cotizar */}
        <div className="p-5 sm:p-6 bg-slate-100 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-bold text-slate-700 text-center sm:text-left">
            Disponibilidad inmediata en almacén central de Lima.
          </div>

          <div className="w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenCalculator(product);
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#073B6E] hover:bg-[#04203F] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer hover:shadow-lg hover:scale-[1.02]"
            >
              <span>Elegir este Producto y Cotizar</span>
              <ArrowRight className="w-4 h-4 text-[#FFD200]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
