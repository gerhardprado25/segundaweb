import React from 'react';
import {
  Calculator,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';

interface HeroProps {
  onOpenCalculator: () => void;
  onOpenAdvisor: () => void;
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCalculator,
  onOpenAdvisor,
  onExploreCatalog,
}) => {
  return (
    <section id="inicio" className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Video with preserved autoplay, loop, muted, playsInline, object-cover */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src="/background-video.mp4"
      >
        <source src="/background-video.mp4" type="video/mp4" />
        <source
          src="/PixVerse_V6_Fusion_540P_image1_anima_como_reco (online-video-cutter.com).mp4"
          type="video/mp4"
        />
      </video>

      {/* EXISTING DARK OVERLAY / GRADIENT STRIP PRESERVED TO REDUCE GLARE AND MAINTAIN LEGIBILITY */}
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#04203F] via-[#073B6E]/80 to-black/75 backdrop-blur-[1.5px]" />

      {/* Decorative subtle industrial grid overlay */}
      <div className="absolute inset-0 z-1 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 flex flex-col items-center text-center text-white">
        {/* Experience Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-emerald-300 mb-6 shadow-lg">
          <Award className="w-4 h-4 text-[#FFD200]" />
          <span>21+ Años Líderes en Suministros Industriales en el Perú</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-5xl leading-tight mb-6">
          Plásticos Técnicos, Cauchos y Sellos{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD200] via-[#FFAE00] to-[#FF8800]">
            para la Gran Industria
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-3xl font-normal leading-relaxed mb-10">
          Importación, fabricación y mecanizado a plano de polímeros de ingeniería, elastómeros, empaquetaduras y aislamientos térmicos de alta exigencia para Minería, Pesca, Petroquímica y Alimentos.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          {/* Primary CTA: Size Calculator */}
          <button
            onClick={onOpenCalculator}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FFD200] via-[#FFAE00] to-[#FF9000] text-[#073B6E] font-black text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:brightness-105 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Calculator className="w-5 h-5 text-[#073B6E]" />
            <span>Calcular y Cotizar Medidas</span>
          </button>

          {/* Secondary CTA: Catalog */}
          <button
            onClick={onExploreCatalog}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 backdrop-blur-md transition-all cursor-pointer"
          >
            <span>Ver Catálogo Completo (26 Productos)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Non-Technical Buyer CTA */}
          <button
            onClick={onOpenAdvisor}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#00B074]/90 hover:bg-[#00B074] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span>¿No sabes qué material necesitas?</span>
          </button>
        </div>

        {/* 4 Trust & Guarantee Badges */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-white/15 max-w-5xl">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
              <ShieldCheck className="w-5 h-5 text-[#00B074]" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">Stock Permanente</div>
              <div className="text-[11px] text-slate-300">Entrega inmediata en Lima</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
              <Truck className="w-5 h-5 text-[#FFD200]" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">Envíos a Nivel Nacional</div>
              <div className="text-[11px] text-slate-300">Minas, puertos y provincias</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">Normas ASTM / DIN</div>
              <div className="text-[11px] text-slate-300">Fichas técnicas y FDA</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
              <MessageCircle className="w-5 h-5 text-[#4EEDB8]" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">Asesoría de Ingeniería</div>
              <div className="text-[11px] text-slate-300">Atención técnica directa</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
