import React, { useState } from 'react';
import { CATEGORIES, PRODUCTS, ProductCategory, Product } from '../data/products';
import {
  Layers,
  Search,
  Calculator,
  ArrowRight,
  Sparkles,
  Shield,
  Ruler,
  FileText,
  Phone,
  MessageCircle,
} from 'lucide-react';

interface ProductsCatalogProps {
  onSelectProduct: (product: Product) => void;
  onOpenCalculator: (product: Product) => void;
  onOpenAdvisor: () => void;
}

export const ProductsCatalog: React.FC<ProductsCatalogProps> = ({
  onSelectProduct,
  onOpenCalculator,
  onOpenAdvisor,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [filterQuery, setFilterQuery] = useState('');

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesQuery =
      filterQuery.trim() === '' ||
      p.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.shortSummary.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.solvedProblem.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.industries.some((ind) => ind.toLowerCase().includes(filterQuery.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  return (
    <section id="catalogo" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#00B074] mb-2">
              <Layers className="w-4 h-4" />
              <span>Líneas de Producción y Distribución</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#073B6E]">
              Catálogo Industrial Emacin
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-2">
              Descubra nuestras 5 categorías y 26 sub-productos técnicos normalizados. Presentados con especificaciones claras para facilitar su selección.
            </p>
          </div>

          {/* Quick non-technical guide button */}
          <button
            onClick={onOpenAdvisor}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-emerald-100/80 hover:bg-emerald-200/80 text-[#007A50] text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer border border-emerald-300/60"
          >
            <Sparkles className="w-4 h-4 text-[#00B074]" />
            <span>¿Dudas sobre cuál material elegir? Guía rápida</span>
          </button>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Buscar por material, industria o aplicación..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#073B6E]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Results Count */}
            <div className="text-xs text-slate-500 font-semibold self-end sm:self-auto">
              Mostrando <strong>{filteredProducts.length}</strong> de {PRODUCTS.length} productos
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#073B6E] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Todos ({PRODUCTS.length})
            </button>

            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = PRODUCTS.filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#073B6E] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.title} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-[#073B6E]/40 hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                {/* Category & Name */}
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md bg-blue-50 text-[#073B6E] text-[10px] font-bold uppercase tracking-wider mb-2">
                    {product.categoryName}
                  </span>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="text-lg font-black text-slate-800 group-hover:text-[#073B6E] transition-colors cursor-pointer leading-snug"
                  >
                    {product.name}
                  </h3>
                </div>

                {/* Problem Solved summary */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-1 flex items-center gap-1">
                    <Shield className="w-3 h-3 text-amber-600" />
                    <span>¿Dónde se utiliza / Solución:</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {product.solvedProblem}
                  </p>
                </div>

                {/* Formats and Dimensions */}
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                    <Ruler className="w-3.5 h-3.5 text-[#073B6E]" />
                    <span>Formatos disponibles:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {product.presentations.formats.map((fmt) => (
                      <span
                        key={fmt}
                        className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-medium text-slate-700"
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>
                  {product.presentations.thicknessRange && (
                    <div className="text-[11px] text-slate-500 pt-0.5">
                      <strong>Espesores:</strong> {product.presentations.thicknessRange}
                    </div>
                  )}
                  {product.presentations.diameterRange && (
                    <div className="text-[11px] text-slate-500">
                      <strong>Diámetros:</strong> {product.presentations.diameterRange}
                    </div>
                  )}
                </div>

                {/* Industry Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.industries.slice(0, 3).map((ind) => (
                    <span
                      key={ind}
                      className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onOpenCalculator(product)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#073B6E] hover:bg-[#04203F] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  title="Calcular medidas y solicitar cotización"
                >
                  <Calculator className="w-3.5 h-3.5 text-amber-300" />
                  <span>Cotizar Medidas</span>
                </button>

                <button
                  onClick={() => onSelectProduct(product)}
                  className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-white text-slate-700 text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                  title="Ver especificaciones completas"
                >
                  <span>Ficha Técnica</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner: Persistent Advisory Block */}
        <div className="mt-16 bg-gradient-to-r from-[#073B6E] to-[#04203F] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-[#FFD200] text-xs font-bold uppercase tracking-wider">
              <span>Fabricación Especial a Medida</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              ¿No encuentras las dimensiones o el material exacto?
            </h3>
            <p className="text-sm text-blue-100 max-w-2xl">
              En Corporación Emacin contamos con taller propio de maquinado CNC, troquelado de juntas y extrusión de perfiles según sus planos y tolerancias.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="https://wa.me/51981334762?text=Hola%20Corporaci%C3%B3n%20Emacin,%20deseo%20cotizar%20un%20trabajo%20especial%20a%20plano."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#00B074] hover:bg-[#009E60] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar por WhatsApp</span>
            </a>

            <a
              href="tel:+5113261234"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/20 transition-all"
            >
              <Phone className="w-4 h-4 text-[#FFD200]" />
              <span>Llamar: (01) 326-1234</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
