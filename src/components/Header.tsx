import React, { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo';
import { CATEGORIES, PRODUCTS, ProductCategory, Product } from '../data/products';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Calculator,
  Search,
  Menu,
  X,
  Clock,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Wrench,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

interface HeaderProps {
  onSelectProduct: (product: Product) => void;
  onOpenCalculator: (product?: Product) => void;
  onOpenAdvisor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectProduct,
  onOpenCalculator,
  onOpenAdvisor,
}) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('plasticos-tecnicos');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<ProductCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Close mega menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
        setIsCompanyDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeCategoryInfo = CATEGORIES.find((c) => c.id === activeCategory);
  const filteredProducts = PRODUCTS.filter((p) => p.category === activeCategory);

  // Search filtered products for quick find
  const searchResults = searchQuery.trim().length > 1
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.industries.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6)
    : [];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 transition-all">
      {/* Top Industrial Contact Bar with Consistent Number Hierarchy */}
      <div className="bg-[#073B6E] text-white text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#04203F]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: WhatsApp & Central Telefónica */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="https://wa.me/51981334762?text=Hola%20Corporaci%C3%B3n%20Emacin,%20deseo%20informaci%C3%B3n%20y%20cotizaciones."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ventas WhatsApp: <strong>+51 981 334 762</strong></span>
            </a>

            <span className="hidden sm:inline text-white/30">|</span>

            <a
              href="tel:+5113261234"
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFD200]" />
              <span>Central Lima: <strong>(01) 326-1234</strong></span>
            </a>

            <span className="hidden md:inline text-white/30">|</span>

            <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Lun - Vie: 8:00 AM - 6:00 PM | Sáb: 8:30 AM - 1:00 PM</span>
            </div>
          </div>

          {/* Right: Email & Location */}
          <div className="flex items-center gap-4 sm:gap-6 text-slate-300">
            <a
              href="mailto:ventas@emacin.com.pe"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#FFD200]" />
              <span className="hidden sm:inline">ventas@emacin.com.pe</span>
              <span className="sm:hidden">Email</span>
            </a>

            <span className="text-white/30">|</span>

            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lima, Perú</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo with Homepage Link and Proper Alt text (Replacing legacy LA FESTA) */}
        <a
          href="#inicio"
          className="focus:outline-none focus:ring-2 focus:ring-[#073B6E] rounded-lg transition-transform hover:opacity-95"
          title="Corporación Emacin S.A.C. - Inicio"
        >
          <Logo />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Inicio */}
          <a
            href="#inicio"
            className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#073B6E] rounded-md transition-colors"
          >
            INICIO
          </a>

          {/* PRODUCTOS Mega-Menu Trigger */}
          <div className="relative" ref={megaMenuRef}>
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                isMegaMenuOpen
                  ? 'text-[#073B6E] bg-blue-50/70 font-bold'
                  : 'text-slate-700 hover:text-[#073B6E] hover:bg-slate-50'
              }`}
              aria-expanded={isMegaMenuOpen}
            >
              <span>PRODUCTOS</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isMegaMenuOpen ? 'rotate-180 text-[#073B6E]' : 'text-slate-400'
                }`}
              />
            </button>

            {/* PRODUCTOS MEGA-MENU DROPDOWN */}
            {isMegaMenuOpen && (
              <div
                onMouseLeave={() => setIsMegaMenuOpen(false)}
                className="absolute left-1/2 -translate-x-1/2 mt-2 w-[920px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                {/* Mega-menu Header & Search */}
                <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <Layers className="w-4 h-4 text-[#073B6E]" />
                    <span>Catálogo Técnico Emacin (5 Categorías · 26 Productos)</span>
                  </div>

                  <div className="relative w-64">
                    <input
                      type="text"
                      placeholder="Buscar material, norma o uso..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B6E] focus:ring-1 focus:ring-[#073B6E]"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                {/* Search overlay inside menu if user types */}
                {searchQuery.trim().length > 1 ? (
                  <div className="p-6 max-h-96 overflow-y-auto">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                      Resultados para "{searchQuery}" ({searchResults.length})
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            onSelectProduct(product);
                            setIsMegaMenuOpen(false);
                            setSearchQuery('');
                          }}
                          className="p-3 border border-slate-200 rounded-xl hover:border-[#073B6E] hover:bg-blue-50/50 cursor-pointer transition-all"
                        >
                          <div className="text-xs font-bold text-[#073B6E]">{product.name}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{product.shortSummary}</div>
                          <span className="inline-block mt-1 text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                            {product.categoryName}
                          </span>
                        </div>
                      ))}
                      {searchResults.length === 0 && (
                        <div className="col-span-2 py-6 text-center text-slate-500 text-xs">
                          No encontramos coincidencias exactas. Consulta con nuestros ingenieros vía WhatsApp.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Standard Two-Level Layout */
                  <div className="grid grid-cols-12 min-h-[420px]">
                    {/* Level 1: Categories (col-span-4) */}
                    <div className="col-span-4 bg-slate-50/70 p-3 border-r border-slate-200 space-y-1">
                      {CATEGORIES.map((category) => {
                        const isSelected = category.id === activeCategory;
                        const count = PRODUCTS.filter((p) => p.category === category.id).length;
                        return (
                          <button
                            key={category.id}
                            onMouseEnter={() => setActiveCategory(category.id)}
                            onClick={() => setActiveCategory(category.id)}
                            className={`w-full text-left px-3.5 py-3 rounded-xl flex items-center justify-between gap-2 transition-all ${
                              isSelected
                                ? 'bg-[#073B6E] text-white shadow-md'
                                : 'text-slate-700 hover:bg-white hover:text-[#073B6E]'
                            }`}
                          >
                            <div>
                              <div className="text-xs font-bold leading-tight">
                                {category.title}
                              </div>
                              <div
                                className={`text-[10px] mt-0.5 ${
                                  isSelected ? 'text-blue-200' : 'text-slate-400'
                                }`}
                              >
                                {count} sub-productos
                              </div>
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 shrink-0 ${
                                isSelected ? 'text-[#FFD200]' : 'text-slate-400'
                              }`}
                            />
                          </button>
                        );
                      })}

                      {/* Quick link to Size Calculator */}
                      <div className="pt-3 mt-3 border-t border-slate-200">
                        <button
                          onClick={() => {
                            setIsMegaMenuOpen(false);
                            onOpenCalculator();
                          }}
                          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:brightness-105 shadow-sm transition-all"
                        >
                          <Calculator className="w-3.5 h-3.5" />
                          <span>Mini Calculadora de Medidas</span>
                        </button>
                      </div>
                    </div>

                    {/* Level 2: Sub-Products + PERSISTENT CTA (col-span-8) */}
                    <div className="col-span-8 p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                          <div>
                            <h4 className="text-sm font-extrabold text-[#073B6E]">
                              {activeCategoryInfo?.title}
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              {activeCategoryInfo?.subtitle}
                            </p>
                          </div>
                          <a
                            href={`#catalogo`}
                            onClick={() => setIsMegaMenuOpen(false)}
                            className="text-[11px] font-bold text-[#00B074] hover:underline flex items-center gap-1"
                          >
                            <span>Ver todos en catálogo</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        </div>

                        {/* Sub-products grid */}
                        <div className="grid grid-cols-2 gap-2 max-h-[260px] overflow-y-auto pr-1">
                          {filteredProducts.map((product) => (
                            <div
                              key={product.id}
                              onClick={() => {
                                onSelectProduct(product);
                                setIsMegaMenuOpen(false);
                              }}
                              className="group p-2.5 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 cursor-pointer transition-all flex flex-col justify-between"
                            >
                              <div className="text-xs font-bold text-slate-800 group-hover:text-[#073B6E] transition-colors leading-snug">
                                {product.name}
                              </div>
                              <div className="text-[10px] text-slate-500 line-clamp-1 mt-1">
                                {product.shortSummary}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* PERSISTENT CTA BLOCK IN EVERY CATEGORY PANEL */}
                      <div className="mt-4 pt-3 border-t border-slate-200 bg-slate-50 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="text-xs font-extrabold text-[#073B6E] flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-[#FF9900]" />
                            <span>¿NO ENCUENTRAS LO QUE BUSCAS?</span>
                          </div>
                          <p className="text-[10px] text-slate-600 leading-tight">
                            Fabricamos y mecanizamos perfiles, juntas y piezas a plano según sus medidas exactas.
                          </p>
                          <div className="text-[10px] text-slate-500 flex flex-wrap gap-x-3 pt-1">
                            <span>📞 (01) 326-1234</span>
                            <span>✉️ ventas@emacin.com.pe</span>
                            <span>📍 Cercado de Lima</span>
                          </div>
                        </div>

                        <a
                          href="https://wa.me/51981334762?text=Hola%20Corporaci%C3%B3n%20Emacin,%20necesito%20asesor%C3%ADa%20personalizada%20para%20un%20producto%20especial."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 px-3 py-2 bg-[#00B074] hover:bg-[#009E60] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Asesoría Personalizada</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* CALCULADORA DE MEDIDAS (Featured Link) */}
          <button
            onClick={() => onOpenCalculator()}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-amber-600" />
            <span>CALCULADORA DE MEDIDAS</span>
          </button>

          {/* ASESOR "¿QUÉ NECESITO?" (For non-technical buyers) */}
          <button
            onClick={onOpenAdvisor}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-emerald-800 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#00B074]" />
            <span>¿QUÉ MATERIAL NECESITO?</span>
          </button>

          {/* COMPAÑÍA (Consolidated menu with access to Representaciones, Servicios, Post Venta) */}
          <div className="relative">
            <button
              onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
              className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#073B6E] rounded-md transition-colors"
            >
              <span>EMPRESA</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {isCompanyDropdownOpen && (
              <div
                onMouseLeave={() => setIsCompanyDropdownOpen(false)}
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50"
              >
                <a
                  href="#nosotros"
                  onClick={() => setIsCompanyDropdownOpen(false)}
                  className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#073B6E]"
                >
                  Sobre Corporación Emacin (21+ Años)
                </a>
                <a
                  href="#servicios"
                  onClick={() => setIsCompanyDropdownOpen(false)}
                  className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#073B6E]"
                >
                  Servicios y Mecanizado CNC
                </a>
                <a
                  href="#representaciones"
                  onClick={() => setIsCompanyDropdownOpen(false)}
                  className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#073B6E]"
                >
                  Representaciones y Marcas
                </a>
                <a
                  href="#certificaciones"
                  onClick={() => setIsCompanyDropdownOpen(false)}
                  className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#073B6E]"
                >
                  Certificaciones y Calidad Técnica
                </a>
                <a
                  href="#postventa"
                  onClick={() => setIsCompanyDropdownOpen(false)}
                  className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#073B6E]"
                >
                  Servicio Post Venta & Garantía
                </a>
              </div>
            )}
          </div>

          {/* CONTACTO */}
          <a
            href="#contacto"
            className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#073B6E] rounded-md transition-colors"
          >
            CONTACTO
          </a>
        </nav>

        {/* Right CTA Button: Direct WhatsApp Quote */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wa.me/51981334762?text=Hola%20Corporaci%C3%B3n%20Emacin,%20deseo%20solicitar%20una%20cotizaci%C3%B3n%20formal."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#073B6E] hover:bg-[#04203F] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 text-[#00B074]" />
            <span>Cotizar por WhatsApp</span>
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-[#073B6E] rounded-lg"
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Quick Calculator Action in Mobile */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenCalculator();
            }}
            className="w-full py-3 px-4 bg-amber-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculadora de Medidas (Cotizar)</span>
          </button>

          {/* Quick Advisor Action in Mobile */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenAdvisor();
            }}
            className="w-full py-3 px-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#00B074]" />
            <span>¿No sabes qué material necesitas?</span>
          </button>

          {/* Navigation Links */}
          <div className="space-y-1">
            <a
              href="#inicio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 text-sm font-bold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Inicio
            </a>

            {/* Mobile Categories Accordion */}
            <div className="border border-slate-200 rounded-xl p-2 bg-slate-50/50">
              <div className="text-xs font-extrabold text-[#073B6E] uppercase tracking-wider px-2 py-1">
                Catálogo de Productos (5 Categorías)
              </div>
              {CATEGORIES.map((cat) => {
                const isOpen = mobileCategoryOpen === cat.id;
                const catProducts = PRODUCTS.filter((p) => p.category === cat.id);
                return (
                  <div key={cat.id} className="mt-1">
                    <button
                      onClick={() => setMobileCategoryOpen(isOpen ? null : cat.id)}
                      className="w-full flex items-center justify-between p-2 text-xs font-bold text-slate-700 hover:text-[#073B6E] rounded-lg"
                    >
                      <span>{cat.title} ({catProducts.length})</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="pl-3 pr-2 py-2 space-y-1 bg-white rounded-lg border border-slate-100 mt-1">
                        {catProducts.map((prod) => (
                          <div
                            key={prod.id}
                            onClick={() => {
                              onSelectProduct(prod);
                              setIsMobileMenuOpen(false);
                            }}
                            className="text-xs text-slate-600 hover:text-[#073B6E] py-1.5 px-2 rounded cursor-pointer hover:bg-blue-50"
                          >
                            {prod.name}
                          </div>
                        ))}

                        {/* Mobile Category Persistent CTA */}
                        <div className="pt-2 mt-2 border-t border-slate-100 text-[11px] text-slate-500">
                          <p className="font-bold text-[#073B6E]">¿No encuentras lo que buscas?</p>
                          <p className="text-[10px] text-slate-500">Cotiza a plano al (01) 326-1234</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <a
              href="#nosotros"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 text-sm font-bold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Sobre la Empresa (21+ Años)
            </a>
            <a
              href="#servicios"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 text-sm font-bold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Servicios y Mecanizado
            </a>
            <a
              href="#contacto"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 text-sm font-bold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Contacto y Ubicación
            </a>
          </div>

          {/* Direct WhatsApp Call */}
          <div className="pt-4 border-t border-slate-200">
            <a
              href="https://wa.me/51981334762?text=Hola%20Corporaci%C3%B3n%20Emacin,%20deseo%20solicitar%20una%20cotizaci%C3%B3n%20directa."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#00B074] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear por WhatsApp (+51 981 334 762)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
