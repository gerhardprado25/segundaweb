/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './components/Logo';
import { VirtualSupportBot } from './components/VirtualSupportBot';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PRODUCTS, ProductCategory, Product } from './data/products';
import {
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  ArrowDown,
  Boxes,
  Zap,
  Wrench,
  CheckCircle2,
  Radio,
  ShieldCheck,
  Linkedin,
  Layers,
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Flame,
  Send,
  Sparkles,
  Ruler,
  Check,
  Info,
  Clock,
  FileText,
  Building2,
  Pickaxe,
  Ship,
  Utensils,
  Shirt,
  Truck,
  User,
  Shield,
  X,
  Award,
} from 'lucide-react';

export default function App() {
  // State for collapsible windows 1, 2, and 3
  const [openWindows, setOpenWindows] = useState<{
    productos: boolean;
    servicio: boolean;
    cotizacion: boolean;
    sectores: boolean;
  }>({
    productos: true,
    servicio: true,
    cotizacion: true,
    sectores: true,
  });

  const toggleWindow = (key: 'productos' | 'servicio' | 'cotizacion' | 'sectores') => {
    setOpenWindows((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // State for Product Detail Modal & Legal/Warranty Terms Modal
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  // 5 Categories in the exact required order:
  // 1. Plásticos Técnicos, 2. Cauchos, 3. Sellos, 4. Aislamientos Térmicos, 5. Aislamiento Eléctrico / Mecánico
  const ORDERED_CATEGORIES: {
    id: ProductCategory;
    name: string;
    description: string;
    icon: React.ElementType;
    badge: string;
  }[] = [
    {
      id: 'plasticos-tecnicos',
      name: 'Plásticos Técnicos',
      description: 'Nylon PA6, PTFE Teflon, POM Acetal, UHMW-PE, HDPE, PVC, Poliuretano PU, Acrílico',
      icon: Boxes,
      badge: '8 Polímeros',
    },
    {
      id: 'cauchos',
      name: 'Cauchos',
      description: 'Caucho Nitrilo NBR, Neopreno CR, EPDM, Silicona, Viton FKM, SBR y Perfiles',
      icon: Layers,
      badge: '8 Elastómeros',
    },
    {
      id: 'sellos',
      name: 'Sellos',
      description: 'Juntas para bridas ANSI/DIN, empaquetaduras trenzadas y láminas libres de asbesto',
      icon: ShieldCheck,
      badge: 'Estanqueidad',
    },
    {
      id: 'aislamientos-termicos',
      name: 'Aislamientos Térmicos',
      description: 'Telas y mantas de cerámica hasta 1260°C, telas de fibra de vidrio y silicio',
      icon: Flame,
      badge: 'Hasta 1260°C',
    },
    {
      id: 'aislamiento-electrico-mecanico',
      name: 'Aislamiento Eléctrico / Mecánico',
      description: 'Planchas de baquelita papel/tela, fibra de vidrio FV (G-10/FR-4) y Ferrosel',
      icon: Zap,
      badge: 'Dieléctricos',
    },
  ];

  // Industrial Sectors Guide (from Guía de Sectores y Productos)
  const INDUSTRIAL_SECTORS = [
    {
      id: 'mineria',
      title: 'Minería & Concentradoras',
      icon: Pickaxe,
      categoryId: 'plasticos-tecnicos' as ProductCategory,
      badge: 'Alto Impacto & Abrasión',
      description:
        'Revestimiento de tolvas, chuts y silos con UHMW-PE antidesgaste, faldones de caucho SBR, rascadores de fajas en poliuretano y empaquetaduras de lixiviación ácida.',
      keyMaterials: ['UHMW-PE Grado Minero', 'Poliuretano PU 90 Shore A', 'Caucho SBR', 'Láminas Comprimidas'],
    },
    {
      id: 'pesca',
      title: 'Pesca & Sector Naval',
      icon: Ship,
      categoryId: 'cauchos' as ProductCategory,
      badge: 'Ambiente Salino Marino',
      description:
        'Sellos de escotillas en Neopreno cloropreno, empaquetaduras trenzadas de PTFE y grafito para bombas de achique, y bujes de nylon para poleas y cabrestantes de izaje.',
      keyMaterials: ['Caucho Neopreno CR', 'Empaquetaduras Trenzadas', 'Nylon PA6', 'Sellos de Escotilla'],
    },
    {
      id: 'petroquimica',
      title: 'Petroquímica, Gas & Vapor',
      icon: Flame,
      categoryId: 'sellos' as ProductCategory,
      badge: 'Alta Presión & Temp.',
      description:
        'Juntas libres de asbesto para bridas ANSI B16.5, O-rings y planchas de Viton (FKM) para hidrocarburos calientes, y mantas de cerámica refractaria hasta 1260°C.',
      keyMaterials: ['Láminas No-Asbesto', 'Viton FKM', 'Mantas Cerámicas 1260°C', 'PTFE Virgen'],
    },
    {
      id: 'alimentos',
      title: 'Alimentos, Bebidas & Farma',
      icon: Utensils,
      categoryId: 'plasticos-tecnicos' as ProductCategory,
      badge: 'Norma Sanitaria FDA',
      description:
        'Polímeros atóxicos fisiológicamente inertes: HDPE blanco para tablas de despiece, teflón PTFE puro para válvulas y silicona translúcida atóxica libre de plastificantes.',
      keyMaterials: ['HDPE Sanitario FDA', 'Teflón PTFE Virgen', 'Silicona Blanca/Translúcida', 'POM Acetal'],
    },
    {
      id: 'textil',
      title: 'Textil, Papelera & Confección',
      icon: Shirt,
      categoryId: 'aislamiento-electrico-mecanico' as ProductCategory,
      badge: 'Bajo Ruido & Fricción',
      description:
        'Engranajes silenciosos en baquelita tela y poliamida nylon para telares de alta velocidad, bujes autolubricados y perfiles protectores resistentes a tinturas ácidas.',
      keyMaterials: ['Baquelita Tela Mecánica', 'Nylon PA6 + MoS2', 'Perfiles Extruidos', 'Poliuretano'],
    },
    {
      id: 'automotriz',
      title: 'Automotriz, Maquinaria & Transporte',
      icon: Truck,
      categoryId: 'cauchos' as ProductCategory,
      badge: 'Aceites & Amortiguación',
      description:
        'Topes de amortiguación en poliuretano alta carga, empaquetaduras de cárter resistentes a hidrocarburos en nitrilo NBR y burletes perimétricos herméticos para cabinas.',
      keyMaterials: ['Caucho Nitrilo NBR', 'Caucho EPDM Resistente UV', 'Poliuretano PU', 'Planchas de Corcho-Caucho'],
    },
    {
      id: 'electrico',
      title: 'Electricidad & Subestaciones',
      icon: Zap,
      categoryId: 'aislamiento-electrico-mecanico' as ProductCategory,
      badge: 'Alta Rigidez Dieléctrica',
      description:
        'Planchas de baquelita papel y tela dieléctricas, fibra de vidrio FV (G-10 / FR-4) anti-arco y Ferrosel para tableros eléctricos, cámaras de extinción y transformadores.',
      keyMaterials: ['Baquelita Papel / Tela', 'Fibra de Vidrio G-10 / FR-4', 'Ferrosel Dieléctrico', 'Mikanita'],
    },
  ];

  // Selected Category inside PRODUCTOS
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('plasticos-tecnicos');

  // Quotation form state
  const [quoteFullName, setQuoteFullName] = useState('');
  const [quoteEmail, setQuoteEmail] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteCategory, setQuoteCategory] = useState<ProductCategory>('plasticos-tecnicos');
  const [quoteProduct, setQuoteProduct] = useState('Barras y Planchas Poliamida-Nylon');
  const [quoteFormat, setQuoteFormat] = useState('Plancha');
  const [quoteDimensions, setQuoteDimensions] = useState('');
  const [quoteInquiry, setQuoteInquiry] = useState('');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [lastSelectedProductName, setLastSelectedProductName] = useState('');

  // Handle category button click inside PRODUCTOS
  const handleCategoryButtonClick = (catId: ProductCategory, shouldScrollToCatalog = false) => {
    setActiveCategory(catId);
    setQuoteCategory(catId);
    const firstProd = PRODUCTS.find((p) => p.category === catId);
    if (firstProd) {
      setQuoteProduct(firstProd.name);
    }
    if (shouldScrollToCatalog) {
      setTimeout(() => {
        const el = document.getElementById('catalogo-seleccion-directa');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  // Handle product selection to quote
  const handleSelectProductForQuote = (prod: Product) => {
    setQuoteCategory(prod.category);
    setQuoteProduct(prod.name);
    setLastSelectedProductName(prod.name);
    if (prod.presentations.formats.length > 0) {
      setQuoteFormat(prod.presentations.formats[0]);
    }
    if (prod.presentations.dimensionsRange || prod.presentations.thicknessRange) {
      setQuoteDimensions(
        `${prod.presentations.thicknessRange ? prod.presentations.thicknessRange + ' | ' : ''}${prod.presentations.dimensionsRange || ''}`
      );
    }

    // Ensure COTIZACION window is open
    setOpenWindows((prev) => ({ ...prev, cotizacion: true }));

    // Smooth scroll to COTIZACION section
    setTimeout(() => {
      const el = document.getElementById('cotizacion');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Select sector from guide
  const handleSelectSector = (sector: typeof INDUSTRIAL_SECTORS[0]) => {
    handleCategoryButtonClick(sector.categoryId);
    setOpenWindows((prev) => ({ ...prev, productos: true }));
    setTimeout(() => {
      const el = document.getElementById('productos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Generate WhatsApp pre-formatted quotation link
  const getWhatsappQuoteLink = () => {
    const categoryTitle =
      ORDERED_CATEGORIES.find((c) => c.id === quoteCategory)?.name || quoteCategory;
    const msg =
      `*COTIZACIÓN WEB - CORPORACIÓN EMACIN S.A.C.*\n\n` +
      `👤 *Nombre Completo:* ${quoteFullName.trim() || 'No especificado'}\n` +
      `✉️ *Correo:* ${quoteEmail.trim() || 'No especificado'}\n` +
      `📞 *Teléfono / WhatsApp:* ${quotePhone.trim() || 'No especificado'}\n` +
      `🏷️ *Categoría:* ${categoryTitle}\n` +
      `📦 *Producto:* ${quoteProduct}\n` +
      `📐 *Medida / Formato:* ${quoteDimensions.trim() ? `${quoteFormat} - ${quoteDimensions.trim()}` : quoteFormat}\n` +
      `📝 *Consultas:* ${quoteInquiry.trim() || 'Solicito disponibilidad inmediata y presupuesto formal.'}`;
    return `https://wa.me/51981334762?text=${encodeURIComponent(msg)}`;
  };

  // Submit quote form
  const handleQuoteFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
    }, 6000);
  };

  const defaultWhatsappUrl =
    'https://wa.me/51981334762?text=' +
    encodeURIComponent(
      'Hola Corporación Emacin S.A.C., deseo solicitar información y cotización de sus productos y servicios industriales.'
    );

  const googleMapsUrl = 'https://maps.app.goo.gl/baDBp18YinHCC62Z8';
  const linkedinUrl = 'https://www.linkedin.com/company/corporacion-emacin-sac/';

  // Products belonging to the active category in Ventana PRODUCTOS
  const displayedProducts = PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <main className="relative w-full min-h-[115vh] overflow-x-hidden flex flex-col items-center font-sans selection:bg-[#073B6E] selection:text-white bg-black">
      {/* Background Video with full-screen cover, autoplay, loop, muted (no audio), playsInline */}
      <video
        className="fixed inset-0 w-full h-full object-cover z-[0]"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      {/* Semi-transparent dark overlay to ensure sharp contrast & legibility */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-black/60" />
      <div className="fixed inset-0 pointer-events-none z-[1] bg-gradient-to-b from-black/70 via-black/35 to-black/80" />

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between py-8 md:py-12">
        {/* Navigation Bar */}
        <header className="w-full flex items-center justify-between pb-6 border-b border-white/10">
          <a
            href="#inicio"
            className="focus:outline-none transition-transform hover:opacity-95"
            title="Corporación Emacin S.A.C. - Plásticos de Ingeniería y Aislamientos"
          >
            <Logo height={52} />
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] font-bold text-white/80">
            <a href="#productos" className="hover:text-[#FFD200] transition-colors">
              Productos
            </a>
            <a href="#servicio" className="hover:text-[#FFD200] transition-colors">
              Servicio
            </a>
            <a href="#sectores" className="hover:text-[#FFD200] transition-colors">
              Sectores & Guía
            </a>
            <a href="#cotizacion" className="hover:text-[#FFD200] transition-colors">
              Cotización
            </a>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5 text-white/90 bg-white/10 px-3 py-1.5 rounded-full border border-white/15"
            >
              <MapPin className="w-3.5 h-3.5 text-[#00B074]" />
              <span>Ver Ubicación Maps</span>
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Perfil Corporativo LinkedIn Emacin"
              title="Corporación Emacin en LinkedIn"
              className="p-2.5 rounded-full bg-white/10 hover:bg-[#0A66C2] text-white/90 hover:text-white transition-all border border-white/15"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </header>

        {/* Upper Hero Section */}
        <section id="inicio" className="pt-14 md:pt-20 pb-10 flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Badge with letter-spacing & industrial precision */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full liquid-glass text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#4EEDB8] mb-6 shadow-md">
            <Radio className="w-3.5 h-3.5 text-[#00B074] animate-pulse" />
            <span>Corporación Emacin S.A.C. · 21+ Años en Lima, Perú</span>
          </div>

          {/* High-Impact Hero Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[1.04]">
            PLÁSTICOS DE INGENIERÍA
            <br />
            <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-white/60">
              & AISLAMIENTOS TÉCNICOS.
            </span>
          </h1>

          {/* Body Copy */}
          <p className="text-sm sm:text-base md:text-lg text-white/80 font-normal max-w-3xl mx-auto leading-relaxed mb-8 tracking-normal">
            Suministro integral de polímeros de alto rendimiento, cauchos normalizados, sellos y aislamientos térmicos/dieléctricos con corte técnico a medida y mecanizado de precisión en Lima, Perú.
          </p>

          {/* Direct CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="#productos"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FFD200] hover:bg-[#FFC000] text-[#073B6E] font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl transition-transform hover:scale-105 cursor-pointer"
            >
              <span>Ver Catálogo de Productos</span>
              <ArrowRight className="w-4 h-4 text-[#073B6E]" />
            </a>

            <a
              href="#cotizacion"
              className="liquid-glass w-full sm:w-auto px-8 py-3.5 rounded-full text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 hover:bg-white/15 transition-all cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4 text-[#4EEDB8]" />
              <span>Solicitar Cotización</span>
            </a>
          </div>

          {/* METRICS & VERIFIED CONTACT BAR ON CRISP WHITE BACKGROUND */}
          <div className="mt-12 w-full bg-white text-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-left">
            {/* 1. Stock en Circulación */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00B074] shrink-0 shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-slate-400 block mb-0.5">
                  Disponibilidad Inmediata
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#073B6E]">
                  Stock en Circulación
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  ALMACÉN CENTRAL DE LIMA
                </p>
              </div>
            </div>

            {/* 2. Ubicación de la Empresa con Botón Directo a Google Maps */}
            <div className="flex flex-col justify-between gap-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-200 md:pl-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#073B6E] shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5 text-[#073B6E]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-slate-400 block mb-0.5">
                    Sede & Almacén Principal
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-[#073B6E]">
                    Ubicación de la Empresa
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    Cercado de Lima, Perú
                  </p>
                </div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#00B074] hover:bg-[#009E60] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer w-full sm:w-auto"
                title="Abrir ubicación de Corporación Emacin en Google Maps"
              >
                <MapPin className="w-4 h-4 text-[#FFD200]" />
                <span>Abrir en Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>
            </div>

            {/* 3. Horarios de Atención */}
            <div className="flex flex-col justify-between gap-2.5 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-200 md:pl-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 shadow-sm">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-slate-400 block mb-0.5">
                    Horario de Atención
                  </span>
                  <h3 className="text-sm font-black text-[#073B6E]">
                    Lun - Vie 8:00 AM - 6:00 PM
                  </h3>
                  <p className="text-[11px] text-slate-600 font-medium">
                    Sábados: 8:30 AM - 1:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3 COLLAPSIBLE WINDOWS (VENTANA 1, 2 Y 3) WITH CRISP WHITE BACKGROUNDS
            Titles: PRODUCTOS, SERVICIO, COTIZACION + GUIA DE SECTORES
            ========================================================================= */}
        <section className="py-8 space-y-8">
          {/* =========================================================================
              VENTANA 1: PRODUCTOS
              Order: 1. Plásticos Técnicos, 2. Cauchos, 3. Sellos, 4. Aislamientos Térmicos,
                     5. Aislamiento Eléctrico / Mecánico
              Interactive buttons for each category to choose desired product!
              ========================================================================= */}
          <div
            id="productos"
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 transition-all"
          >
            {/* Window Header / Toggle Bar */}
            <div
              onClick={() => toggleWindow('productos')}
              className="p-6 sm:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors select-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#073B6E] shrink-0">
                  <Boxes className="w-6 h-6 text-[#073B6E]" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#00B074] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      VENTANA 01
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      5 Categorías Normalizadas
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#073B6E] tracking-tight mt-1">
                    PRODUCTOS
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Explore nuestras 5 líneas. Haga clic en cualquiera de las categorías para ver sus productos y seleccionarlos para cotización.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                  {openWindows.productos ? 'Cerrar ventana' : 'Abrir ventana'}
                </span>
                <button
                  type="button"
                  aria-label={openWindows.productos ? 'Cerrar ventana Productos' : 'Abrir ventana Productos'}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-all"
                >
                  {openWindows.productos ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Window Content */}
            <AnimatePresence>
              {openWindows.productos && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8 space-y-8"
                >
                  {/* The 5 Category Buttons in Strict Required Order */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#00B074]" />
                      <span>Seleccione una categoría para ver productos disponibles:</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                      {ORDERED_CATEGORIES.map((cat, idx) => {
                        const Icon = cat.icon;
                        const isSelected = activeCategory === cat.id;

                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleCategoryButtonClick(cat.id, true)}
                            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group ${
                              isSelected
                                ? 'bg-[#073B6E] text-white border-[#073B6E] shadow-lg scale-[1.02]'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                                  isSelected
                                    ? 'bg-white/20 text-[#FFD200]'
                                    : 'bg-white text-[#073B6E] shadow-sm'
                                }`}
                              >
                                <Icon className="w-5 h-5" />
                              </div>
                              <span
                                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                                  isSelected
                                    ? 'bg-[#00B074] text-white'
                                    : 'bg-slate-200 text-slate-600'
                                }`}
                              >
                                {idx + 1}º
                              </span>
                            </div>

                            <div>
                              <h3
                                className={`font-black text-sm tracking-tight ${
                                  isSelected ? 'text-white' : 'text-[#073B6E]'
                                }`}
                              >
                                {cat.name}
                              </h3>
                            </div>

                            <div
                              className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 pt-1 ${
                                isSelected ? 'text-[#FFD200]' : 'text-[#073B6E]'
                              }`}
                            >
                              {isSelected ? (
                                <span className="inline-flex items-center gap-1.5 bg-[#FFD200]/20 hover:bg-[#FFD200]/30 text-[#FFD200] px-2.5 py-1 rounded-lg transition-all border border-[#FFD200]/30 shadow-sm">
                                  <span>Ahora selecciona tu producto</span>
                                  <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                                </span>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <span>Ver Productos</span>
                                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* APARTADO DE ELECCIÓN DE PRODUCTO */}
                  <div id="catalogo-seleccion-directa" className="pt-6 border-t border-slate-200 scroll-mt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#00B074] block">
                          Catálogo de Selección Directa
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-[#073B6E]">
                          Productos de {ORDERED_CATEGORIES.find((c) => c.id === activeCategory)?.name}
                        </h3>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Elija el producto que requiere para transferir automáticamente sus datos al apartado de cotización.
                        </p>
                      </div>

                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 self-start sm:self-center">
                        {displayedProducts.length} productos listos para cotizar
                      </span>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {displayedProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-[#073B6E] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                                {prod.categoryName}
                              </span>
                              <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-full">
                                En Stock Lima
                              </span>
                            </div>

                            <h4 className="text-base font-black text-[#073B6E] tracking-tight">
                              {prod.name}
                            </h4>

                            <div className="pt-2 text-xs text-slate-700 border-t border-slate-200">
                              <span className="font-bold text-slate-900">Formatos disponibles:</span>{' '}
                              <span className="font-medium text-slate-700">{prod.presentations.formats.join(', ')}</span>
                            </div>
                          </div>

                          {/* Action Buttons: Choose product or view technical datasheet */}
                          <div className="space-y-2 pt-2">
                            <button
                              type="button"
                              onClick={() => handleSelectProductForQuote(prod)}
                              className="w-full py-2.5 px-4 rounded-xl bg-[#073B6E] hover:bg-[#04203F] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer group"
                            >
                              <span>Elegir este Producto y Cotizar</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#FFD200] transition-transform group-hover:translate-x-1" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setDetailProduct(prod)}
                              className="w-full py-1.5 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5 text-slate-500" />
                              <span>Ver Ficha Técnica Completa</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* =========================================================================
              VENTANA 2: SERVICIO
              Specialized CNC machining, cutting to measure, gasket punching, application engineering
              ========================================================================= */}
          <div
            id="servicio"
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 transition-all"
          >
            {/* Window Header / Toggle Bar */}
            <div
              onClick={() => toggleWindow('servicio')}
              className="p-6 sm:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors select-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#073B6E] shrink-0">
                  <Wrench className="w-6 h-6 text-[#073B6E]" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#073B6E] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      VENTANA 02
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Taller Industrial & Fabricación
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#073B6E] tracking-tight mt-1">
                    SERVICIO
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Mecanizado CNC de polímeros, corte longitudinal a medida y fabricación de juntas y sellos según plano o muestra física.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                  {openWindows.servicio ? 'Cerrar ventana' : 'Abrir ventana'}
                </span>
                <button
                  type="button"
                  aria-label={openWindows.servicio ? 'Cerrar ventana Servicio' : 'Abrir ventana Servicio'}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-all"
                >
                  {openWindows.servicio ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Window Content */}
            <AnimatePresence>
              {openWindows.servicio && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8 space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Service 1 */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#073B6E] flex items-center justify-center shadow-sm">
                          <Wrench className="w-5 h-5 text-[#073B6E]" />
                        </div>
                        <h3 className="font-bold text-[#073B6E] text-base">
                          Mecanizado CNC a Plano o Muestra
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Torneado y fresado CNC en Nylon, PTFE, POM Acetal, UHMW-PE y Poliuretano con tolerancias micrométricas ±0.05 mm para bujes, engranajes y cojinetes.
                        </p>
                      </div>
                      <ul className="text-[11px] text-slate-600 space-y-1 pt-2 border-t border-slate-200">
                        <li>• Engranajes silenciosos y poleas</li>
                        <li>• Bujes de deslizamiento de alta carga</li>
                        <li>• Réplica exacta de piezas desgastadas</li>
                      </ul>
                    </div>

                    {/* Service 2 */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#073B6E] flex items-center justify-center shadow-sm">
                          <Ruler className="w-5 h-5 text-[#073B6E]" />
                        </div>
                        <h3 className="font-bold text-[#073B6E] text-base">
                          Dimensionado & Corte Longitudinal
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Corte de planchas, barras y tubos a la medida exacta de su requerimiento. Seccionado de alta precisión que evita compras excesivas y mermas en su planta.
                        </p>
                      </div>
                      <ul className="text-[11px] text-slate-600 space-y-1 pt-2 border-t border-slate-200">
                        <li>• Tiras y placas a medidas especiales</li>
                        <li>• Corte de barras redondas al largo requerido</li>
                        <li>• Sin pedido mínimo de compra</li>
                      </ul>
                    </div>

                    {/* Service 3 */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#073B6E] flex items-center justify-center shadow-sm">
                          <ShieldCheck className="w-5 h-5 text-[#073B6E]" />
                        </div>
                        <h3 className="font-bold text-[#073B6E] text-base">
                          Troquelado y Fabricación de Sellos
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Confección de juntas para bridas según normas ANSI B16.5, DIN y bajo plano en elastómeros técnicos (Nitrilo, EPDM, Neopreno, Viton y láminas no-asbesto).
                        </p>
                      </div>
                      <ul className="text-[11px] text-slate-600 space-y-1 pt-2 border-t border-slate-200">
                        <li>• Juntas Cara Llena (FF) y Cara Realzada (RF)</li>
                        <li>• Troquelado rápido para paradas de planta</li>
                        <li>• Empaquetaduras para fluidos agresivos</li>
                      </ul>
                    </div>

                    {/* Service 4 */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#073B6E] flex items-center justify-center shadow-sm">
                          <Info className="w-5 h-5 text-[#073B6E]" />
                        </div>
                        <h3 className="font-bold text-[#073B6E] text-base">
                          Asesoría de Selección de Materiales
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Acompañamiento técnico de ingenieros de aplicación para seleccionar el polímero o elastómero correcto ante fricción abrasiva, ataques químicos o alta tensión.
                        </p>
                      </div>
                      <ul className="text-[11px] text-slate-600 space-y-1 pt-2 border-t border-slate-200">
                        <li>• Homologación técnica de polímeros</li>
                        <li>• Fichas técnicas y certificados de calidad</li>
                        <li>• Despachos a mineras y proyectos en provincia</li>
                      </ul>
                    </div>
                  </div>

                  {/* Service CTA */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-blue-50/70 border border-blue-100">
                    <div>
                      <h4 className="font-bold text-[#073B6E] text-sm">
                        ¿Tiene un plano, muestra o requerimiento especial de taller?
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Envíenos las medidas o plano de su pieza y cotizaremos la fabricación inmediatamente.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setQuoteCategory('plasticos-tecnicos');
                        setQuoteProduct('Servicio de Mecanizado a Plano / Corte a Medida');
                        setQuoteFormat('Pieza Mecanizada');
                        setOpenWindows((prev) => ({ ...prev, cotizacion: true }));
                        const el = document.getElementById('cotizacion');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#073B6E] hover:bg-[#04203F] text-white text-xs font-bold shrink-0 shadow transition-all cursor-pointer"
                    >
                      Cotizar Servicio en Ventana 03
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* =========================================================================
              GUIA DE SECTORES Y PRODUCTOS (SECTORES INDUSTRIALES & APLICACIONES)
              En fondos blancos, con iconos descriptivos para cada industria
              ========================================================================= */}
          <div
            id="sectores"
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 transition-all"
          >
            {/* Header / Toggle Bar */}
            <div
              onClick={() => toggleWindow('sectores')}
              className="p-6 sm:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors select-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00B074] shrink-0">
                  <Building2 className="w-6 h-6 text-[#00B074]" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#00B074] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      GUÍA INDUSTRIAL
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Sectores & Aplicaciones
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#073B6E] tracking-tight mt-1">
                    SECTORES Y PRODUCTOS RECOMENDADOS
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Guía técnica de polímeros y elastómeros recomendados para cada industria nacional según sus condiciones de operación.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                  {openWindows.sectores ? 'Cerrar guía' : 'Abrir guía'}
                </span>
                <button
                  type="button"
                  aria-label={openWindows.sectores ? 'Cerrar guía de sectores' : 'Abrir guía de sectores'}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-all"
                >
                  {openWindows.sectores ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Window Content */}
            <AnimatePresence>
              {openWindows.sectores && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8 space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {INDUSTRIAL_SECTORS.map((sector) => {
                      const Icon = sector.icon;
                      return (
                        <div
                          key={sector.id}
                          className="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-[#073B6E] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#073B6E] shadow-sm">
                                <Icon className="w-5 h-5 text-[#073B6E]" />
                              </div>
                              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-[#073B6E]">
                                {sector.badge}
                              </span>
                            </div>

                            <h3 className="text-base font-black text-[#073B6E] tracking-tight">
                              {sector.title}
                            </h3>

                            <p className="text-xs text-slate-600 leading-relaxed">
                              {sector.description}
                            </p>

                            <div className="pt-2 border-t border-slate-200/80">
                              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                Materiales clave aplicados:
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {sector.keyMaterials.map((mat, i) => (
                                  <span
                                    key={i}
                                    className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                                  >
                                    {mat}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleSelectSector(sector)}
                            className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#073B6E] text-[#073B6E] hover:text-white border border-slate-300 hover:border-[#073B6E] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer group shadow-sm"
                          >
                            <span>Ver Productos para este Sector</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* =========================================================================
              VENTANA 3: COTIZACION
              Requests: Nombre completo, Correo, Teléfono, Medidas (si corresponde al producto)
                        y Consultas/Requerimiento.
              ========================================================================= */}
          <div
            id="cotizacion"
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 transition-all"
          >
            {/* Window Header / Toggle Bar */}
            <div
              onClick={() => toggleWindow('cotizacion')}
              className="p-6 sm:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors select-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00B074] shrink-0">
                  <Send className="w-6 h-6 text-[#00B074]" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#00B074] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      VENTANA 03
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Respuesta Inmediata B2B
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#073B6E] tracking-tight mt-1">
                    COTIZACION
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Ingrese sus datos de contacto (nombre completo, correo, teléfono), medidas y consulta para recibir su cotización formal.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                  {openWindows.cotizacion ? 'Cerrar ventana' : 'Abrir ventana'}
                </span>
                <button
                  type="button"
                  aria-label={openWindows.cotizacion ? 'Cerrar ventana Cotización' : 'Abrir ventana Cotización'}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-all"
                >
                  {openWindows.cotizacion ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Window Content */}
            <AnimatePresence>
              {openWindows.cotizacion && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8 space-y-6"
                >
                  {/* Feedback Banner if product was selected from Ventana 1 */}
                  {lastSelectedProductName && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs text-emerald-900">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#00B074] shrink-0" />
                        <span>
                          Producto preseleccionado desde el catálogo:{' '}
                          <strong className="font-bold">{lastSelectedProductName}</strong>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLastSelectedProductName('')}
                        className="text-[11px] underline text-emerald-700 hover:text-emerald-900 cursor-pointer"
                      >
                        Descartar
                      </button>
                    </div>
                  )}

                  {/* Submission Confirmation Notice */}
                  {quoteSubmitted ? (
                    <div className="p-8 text-center bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00B074] flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-black text-[#073B6E]">
                        ¡Cotización Recibida con Éxito!
                      </h3>
                      <p className="text-sm text-slate-700 max-w-lg mx-auto">
                        Gracias <strong>{quoteFullName || 'estimado cliente'}</strong>. Su solicitud para <strong>{quoteProduct}</strong> ha sido registrada. Un asesor comercial de Corporación Emacin se comunicará a su teléfono <strong>{quotePhone}</strong> o correo <strong>{quoteEmail}</strong>.
                      </p>

                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                          href={getWhatsappQuoteLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 rounded-xl bg-[#00B074] hover:bg-[#009E60] text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Enviar también por WhatsApp para atención inmediata</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => setQuoteSubmitted(false)}
                          className="px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold cursor-pointer"
                        >
                          Realizar otra cotización
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* The Quotation Form on Crisp White Background */
                    <form onSubmit={handleQuoteFormSubmit} className="space-y-6">
                      {/* Section 1: Customer Contact Info */}
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                          <User className="w-4 h-4 text-[#073B6E]" />
                          <span>1. Datos del Cliente (Obligatorios)</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Nombre Completo *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                required
                                placeholder="Ej: Ing. Jorge Mendoza / Minera Andina"
                                value={quoteFullName}
                                onChange={(e) => setQuoteFullName(e.target.value)}
                                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#073B6E] focus:bg-white focus:ring-2 focus:ring-[#073B6E]/10"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Correo Electrónico *
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="Ej: jmendoza@minera.pe"
                              value={quoteEmail}
                              onChange={(e) => setQuoteEmail(e.target.value)}
                              className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#073B6E] focus:bg-white focus:ring-2 focus:ring-[#073B6E]/10"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Teléfono / WhatsApp *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="Ej: +51 987 654 321"
                              value={quotePhone}
                              onChange={(e) => setQuotePhone(e.target.value)}
                              className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#073B6E] focus:bg-white focus:ring-2 focus:ring-[#073B6E]/10"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Product & Category selection */}
                      <div className="pt-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                          <Boxes className="w-4 h-4 text-[#073B6E]" />
                          <span>2. Selección de Producto Deseado</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Categoría Industrial
                            </label>
                            <select
                              value={quoteCategory}
                              onChange={(e) => {
                                const newCat = e.target.value as ProductCategory;
                                setQuoteCategory(newCat);
                                setActiveCategory(newCat);
                                const firstProd = PRODUCTS.find((p) => p.category === newCat);
                                if (firstProd) setQuoteProduct(firstProd.name);
                              }}
                              className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#073B6E] focus:bg-white"
                            >
                              {ORDERED_CATEGORIES.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                  {cat.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Producto a Cotizar
                            </label>
                            <select
                              value={quoteProduct}
                              onChange={(e) => setQuoteProduct(e.target.value)}
                              className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#073B6E] focus:bg-white"
                            >
                              {PRODUCTS.filter((p) => p.category === quoteCategory).map((p) => (
                                <option key={p.id} value={p.name}>
                                  {p.name}
                                </option>
                              ))}
                              <option value="Servicio de Mecanizado a Plano CNC">
                                Servicio de Mecanizado a Plano CNC
                              </option>
                              <option value="Corte Especial y Medida a Pedido">
                                Corte Especial y Medida a Pedido
                              </option>
                              <option value="Otro Producto / Requerimiento Especial">
                                Otro Producto / Requerimiento Especial
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Medidas (si corresponde a dicho producto) y Consultas */}
                      <div className="pt-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                          <Ruler className="w-4 h-4 text-[#073B6E]" />
                          <span>3. Medidas del Producto & Consultas</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Formato de Presentación
                            </label>
                            <select
                              value={quoteFormat}
                              onChange={(e) => setQuoteFormat(e.target.value)}
                              className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#073B6E] focus:bg-white"
                            >
                              <option value="Plancha / Placa">Plancha / Placa</option>
                              <option value="Barra Redonda (Eje)">Barra Redonda (Eje)</option>
                              <option value="Tubo / Bocina">Tubo / Bocina</option>
                              <option value="Rollo Continuo">Rollo Continuo</option>
                              <option value="Perfil Extruido">Perfil Extruido</option>
                              <option value="Junta Cortada / Troquelada">Junta Cortada / Troquelada</option>
                              <option value="Manta Aislante">Manta Aislante</option>
                              <option value="Pieza Mecanizada CNC">Pieza Mecanizada CNC</option>
                            </select>
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Medidas (Espesor, Diámetro, Ancho x Largo si corresponde al producto)
                            </label>
                            <input
                              type="text"
                              placeholder="Ej: Espesor 25 mm x 1000 x 2000 mm / o Diámetro Ø 80 mm x 1 metro"
                              value={quoteDimensions}
                              onChange={(e) => setQuoteDimensions(e.target.value)}
                              className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#073B6E] focus:bg-white focus:ring-2 focus:ring-[#073B6E]/10"
                            />
                            <p className="text-[11px] text-slate-500 mt-1">
                              * Si no cuenta con la medida exacta, puede indicarlo en las consultas o solicitar asesoría técnica.
                            </p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Consultas y Detalles del Requerimiento
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Detalle su consulta, cantidad requerida, condiciones de temperatura, químico, presión o cualquier duda técnica..."
                            value={quoteInquiry}
                            onChange={(e) => setQuoteInquiry(e.target.value)}
                            className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#073B6E] focus:bg-white focus:ring-2 focus:ring-[#073B6E]/10"
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <a
                          href={getWhatsappQuoteLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#00B074] hover:bg-[#009E60] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4 text-white" />
                          <span>Enviar Directo a WhatsApp</span>
                        </a>

                        <button
                          type="submit"
                          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#073B6E] hover:bg-[#04203F] text-white text-xs font-black flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                        >
                          <Send className="w-4 h-4 text-[#FFD200]" />
                          <span>Registrar Solicitud en la Web</span>
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Footer Conforming to the Manual of Specifications */}
        <footer className="w-full rounded-3xl p-6 md:p-10 text-white/80 mt-16 border border-white/10 bg-black/60 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-8">
            {/* Column 1: Identity & Legal Data */}
            <div className="md:col-span-5 flex flex-col items-start space-y-4">
              <Logo height={48} />
              <p className="text-xs sm:text-sm leading-relaxed text-white/70 max-w-sm">
                Corporación Emacin S.A.C. — 21+ años suministrando plásticos de ingeniería, cauchos formulados, sellos y aislamientos para la minería, energía y manufactura nacional.
              </p>
              <div className="text-xs text-white/60 space-y-1 font-mono">
                <div>RUC: 20508544831</div>
                <div>Razón Social: CORPORACIÓN EMACIN S.A.C.</div>
                <div>Sede & Almacén Principal: Cercado de Lima, Perú</div>
              </div>

              {/* Direct Maps Button with GPS / MapPin icon */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#00B074] hover:bg-[#009E60] text-white text-xs font-bold transition-all shadow-md"
              >
                <MapPin className="w-4 h-4 text-[#FFD200]" />
                <span>Ver ubicación en Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>
            </div>

            {/* Column 2: 5 Categorías */}
            <div className="md:col-span-3">
              <h3 className="text-xs uppercase tracking-[0.2em] text-white font-bold mb-4 flex items-center gap-2">
                <Boxes className="w-3.5 h-3.5 text-[#FFD200]" />
                <span>Categorías Normalizadas</span>
              </h3>
              <ul className="text-xs space-y-2 text-white/70">
                {ORDERED_CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => {
                        handleCategoryButtonClick(c.id);
                        setOpenWindows((prev) => ({ ...prev, productos: true }));
                        const el = document.getElementById('productos');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="hover:text-[#FFD200] transition-colors cursor-pointer text-left"
                    >
                      • {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Verified Contact Channels & Business Hours */}
            <div className="md:col-span-4 space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-white font-bold flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#00B074]" />
                <span>Canales de Atención Directa</span>
              </h3>

              <ul className="text-xs space-y-2.5 text-white/80">
                <li>
                  <a
                    href={defaultWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-300 transition-colors text-emerald-400 font-semibold flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Ventas: +51 981 334 762</span>
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#FFD200]" />
                  <span>Central Lima: (01) 326-1234 / (01) 326-5678</span>
                </li>
                <li className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-blue-400" />
                  <span>Asesoría Técnica de Planta: +51 998 123 456</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-300" />
                  <a
                    href="mailto:ventas@emacin.com.pe"
                    className="hover:underline text-white font-medium"
                  >
                    ventas@emacin.com.pe
                  </a>
                </li>
                <li className="flex items-start gap-2 pt-2 border-t border-white/10 text-[11px] text-white/60">
                  <Clock className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <div>Horario de Planta y Almacén:</div>
                    <div className="font-semibold text-white/80">
                      Lun - Vie 8:00 AM – 6:00 PM | Sáb 8:30 AM – 1:00 PM
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright, Terms & Prominent LinkedIn Icon */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/60">
            <p className="font-mono">
              © 2026 CORPORACIÓN EMACIN S.A.C. · RUC 20508544831 · LIMA, PERÚ
            </p>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsTermsModalOpen(true)}
                className="hover:text-white transition-colors underline cursor-pointer"
              >
                Términos, Garantía & Políticas Técnicas
              </button>

              <span className="text-white/20">|</span>

              {/* Prominent LinkedIn Icon linking to official company profile */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Perfil Corporativo LinkedIn Emacin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold transition-all shadow-sm"
                title="Conectar en LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Corporativo</span>
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Virtual AI Support Bot (Bottom-Right Bubble with Robot Icon) */}
      <VirtualSupportBot />

      {/* Product Detail Modal */}
      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
          onOpenCalculator={(p) => {
            setDetailProduct(null);
            handleSelectProductForQuote(p);
          }}
        />
      )}

      {/* Terms & Conditions / Technical Policies Modal */}
      {isTermsModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 text-slate-800">
            <div className="bg-[#073B6E] text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-[#FFD200]" />
                <h3 className="text-lg font-bold">
                  Términos, Garantía & Políticas Técnicas B2B
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTermsModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs text-slate-700 leading-relaxed">
              <div>
                <h4 className="font-bold text-[#073B6E] text-sm mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#00B074]" />
                  <span>1. Calidad y Certificación de Materiales</span>
                </h4>
                <p>
                  Corporación Emacin S.A.C. garantiza que todos los polímeros de ingeniería, cauchos, sellos y aislamientos suministrados cumplen con estándares técnicos internacionales (ASTM, DIN, ISO, FDA). A solicitud del cliente corporativo se adjuntan certificados de calidad y fichas técnicas de fábrica con cada despacho.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#073B6E] text-sm mb-1 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-[#073B6E]" />
                  <span>2. Tolerancias en Corte y Mecanizado CNC</span>
                </h4>
                <p>
                  Los cortes y mecanizados se realizan bajo especificaciones del plano o muestra del cliente con tolerancias milimétricas según norma técnica de materiales plásticos y elastómeros. Cualquier discrepancia dimensional debe ser informada dentro de los 5 días calendario posteriores a la entrega en almacén o recepción en planta.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#073B6E] text-sm mb-1 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#00B074]" />
                  <span>3. Despacho y Entrega a Nivel Nacional</span>
                </h4>
                <p>
                  Los materiales en stock permanente cuentan con entrega inmediata en nuestra sede de Cercado de Lima o puesta en agencia de transporte con destino a mineras y provincias de todo el Perú.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#073B6E] text-sm mb-1 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#073B6E]" />
                  <span>4. Validez de Cotizaciones B2B</span>
                </h4>
                <p>
                  Las cotizaciones emitidas a través de la web o WhatsApp tienen una validez estándar de 15 días hábiles, sujetas a confirmación de stock al momento del cierre de la orden de compra. Precios expresados en dólares americanos o nuevos soles con IGV desglosado.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setIsTermsModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#073B6E] hover:bg-[#04203F] text-white text-xs font-bold transition-all cursor-pointer"
              >
                Entendido y Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
