import React from 'react';
import { Logo } from './Logo';
import { CATEGORIES } from '../data/products';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Award,
  ChevronRight,
  ArrowUp,
  Clock,
} from 'lucide-react';

interface FooterProps {
  onOpenCalculator: () => void;
  onOpenAdvisor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCalculator, onOpenAdvisor }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#04203F] text-slate-300 border-t border-slate-800">
      {/* Top Advisory Banner inside Footer */}
      <div className="bg-[#073B6E] py-8 px-4 sm:px-6 lg:px-8 border-b border-[#0A4B8C]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-white text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-[#FFD200] flex items-center justify-center shrink-0 border border-amber-400/30">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-black tracking-tight">
                ¿Necesita una cotización para licitación o compra corporativa?
              </div>
              <div className="text-xs text-blue-200">
                Atendemos órdenes de compra con entrega en almacén de Lima o despacho a provincias.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenCalculator}
              className="px-5 py-3 rounded-xl bg-[#FFD200] hover:bg-[#FFC000] text-[#073B6E] font-black text-xs transition-colors shadow-sm cursor-pointer"
            >
              Calculadora de Medidas
            </button>

            <a
              href="https://wa.me/51981334762?text=Hola%20Corporaci%C3%B3n%20Emacin,%20deseo%20cotizar%20para%20una%20empresa."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#00B074] hover:bg-[#009E60] text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Ventas (+51 981 334 762)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#inicio" className="inline-block">
              <Logo height={48} />
            </a>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-normal">
              Corporación Emacin S.A.C. es una empresa peruana con más de 21 años de liderazgo en la importación, comercialización y manufactura de plásticos de ingeniería, planchas de caucho, sellos y aislamientos industriales.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400 pt-2">
              <div><strong>RUC:</strong> 20508544831</div>
              <div><strong>Razón Social:</strong> CORPORACIÓN EMACIN S.A.C.</div>
              <div><strong>Planta Central:</strong> Jr. Huancavelica / Av. Guillermo Dansey, Cercado de Lima, Perú.</div>
            </div>
          </div>

          {/* Col 2: Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-700 pb-2">
              Catálogo de Productos
            </div>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <a
                    href="#catalogo"
                    className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300"
                  >
                    <ChevronRight className="w-3 h-3 text-[#FFD200]" />
                    <span>{c.title}</span>
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={onOpenAdvisor}
                  className="text-xs font-bold text-[#4EEDB8] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3" />
                  <span>Guía: ¿Qué material necesito?</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Routes (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-700 pb-2">
              Navegación
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#nosotros" className="hover:text-white transition-colors">Compañía (21+ Años)</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Servicios & CNC</a></li>
              <li><a href="#certificaciones" className="hover:text-white transition-colors">Certificaciones</a></li>
              <li><a href="#contacto" className="hover:text-white transition-colors">Contacto Directo</a></li>
            </ul>
          </div>

          {/* Col 4: Consistent Verified Contact Channels (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-700 pb-2">
              Canales de Atención
            </div>
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <div className="text-[11px] text-[#00B074] font-bold uppercase">
                  Ventas WhatsApp (Cotizaciones):
                </div>
                <a
                  href="https://wa.me/51981334762"
                  className="font-bold text-white hover:text-emerald-300 flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+51 981 334 762</span>
                </a>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] text-amber-400 font-bold uppercase">
                  Central Telefónica Lima:
                </div>
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>(01) 326-1234 / (01) 326-5678</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] text-slate-400 font-bold uppercase">
                  Asesoría Técnica de Planta:
                </div>
                <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>+51 998 123 456</span>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="text-[11px] text-slate-400 font-bold uppercase">
                  Correo Electrónico:
                </div>
                <a
                  href="mailto:ventas@emacin.com.pe"
                  className="text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FFD200]" />
                  <span>ventas@emacin.com.pe</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with updated 2026 Copyright and No Legacy Artifacts */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 Corporación Emacin S.A.C. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-6">
            <span>Lima, Perú</span>
            <span>·</span>
            <span>RUC 20508544831</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
            >
              <span>Volver arriba</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
