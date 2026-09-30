import React from 'react';
import {
  Pickaxe,
  Ship,
  Flame,
  Utensils,
  Shirt,
  Truck,
  Award,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Cpu,
  FileCheck2,
  Quote,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface TrustAndIndustriesProps {
  onOpenCalculator: () => void;
}

export const TrustAndIndustries: React.FC<TrustAndIndustriesProps> = ({ onOpenCalculator }) => {
  const industries = [
    {
      title: 'Minería & Procesamiento',
      icon: <Pickaxe className="w-6 h-6 text-[#FFD200]" />,
      desc: 'Revestimiento de tolvas con UHMW-PE, faldones de caucho SBR, rascadores de poliuretano y juntas para lixiviación con ácido concentrado.',
      stats: '+45 Unidades Mineras en Perú',
    },
    {
      title: 'Pesca & Industria Naval',
      icon: <Ship className="w-6 h-6 text-blue-300" />,
      desc: 'Sellos de escotillas en Neopreno, empaquetaduras trenzadas para bombas de achique y bujes de nylon para poleas de izaje marino.',
      stats: 'Astilleros y Flotas Pesqueras',
    },
    {
      title: 'Petroquímica, Gas & Vapor',
      icon: <Flame className="w-6 h-6 text-orange-400" />,
      desc: 'Láminas no asbesto comprimidas para bridas ANSI, O-rings y planchas de Viton (FKM), y telas de cerámica hasta 1260°C.',
      stats: 'Refinerías y Plantas Térmicas',
    },
    {
      title: 'Alimentos, Bebidas & Farma',
      icon: <Utensils className="w-6 h-6 text-emerald-400" />,
      desc: 'Plásticos y elastómeros con certificación FDA: HDPE sanitario, Teflón PTFE puro y Silicona atóxica de alta pureza.',
      stats: 'Plantas con Norma Sanitaria',
    },
    {
      title: 'Textil e Hilandería',
      icon: <Shirt className="w-6 h-6 text-purple-300" />,
      desc: 'Engranajes silenciosos de baquelita y nylon, perfiles protectores de telares y fieltros retenedores de lubricante.',
      stats: 'Líderes de Hilatura en Lima',
    },
    {
      title: 'Automotriz & Maquinaria',
      icon: <Truck className="w-6 h-6 text-cyan-300" />,
      desc: 'Topes antivibratorios de poliuretano, empaquetaduras de cárter en caucho nitrilo NBR y burletes perimétricos para cabinas.',
      stats: 'Transporte y Construcción',
    },
  ];

  const testimonials = [
    {
      quote:
        'Llevamos más de 8 años abasteciendo los faldones y tolvas de nuestra planta concentradora con Emacin. La durabilidad del UHMW-PE y los cauchos ha reducido nuestras paradas de mantenimiento a la mitad.',
      author: 'Ing. Fernando Velásquez',
      role: 'Superintendente de Mantenimiento Mecánico',
      company: 'Operación Minera Sierra Central',
    },
    {
      quote:
        'La precisión de sus juntas para bridas troqueladas a plano y la rapidez de entrega en Lima para nuestras paradas de calderas en Paita son insuperables. Son verdaderos socios técnicos.',
      author: 'Ing. Patricia Aranda',
      role: 'Jefa de Planta Procesadora',
      company: 'Pesquera & Conservas del Norte',
    },
  ];

  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Company Legacy & Trust Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#073B6E] text-xs font-extrabold uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#FF9900]" />
              <span>Trayectoria Comprobada (2005 - 2026)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#073B6E] leading-tight">
              21+ Años Impulsando la{' '}
              <span className="text-[#00B074]">Productividad Industrial</span> del Perú
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              <strong>Corporación Emacin S.A.C.</strong> nació con el firme compromiso de abastecer a la industria minera, pesquera, química y manufacturera peruana con materiales elastoméricos y polímeros de ingeniería de clase mundial.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              No solo suministramos barras y planchas brutas: contamos con capacidad de corte computarizado, troquelado milimétrico y mecanizado CNC para entregar componentes listos para su montaje inmediato en planta.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-2xl sm:text-3xl font-black text-[#073B6E]">21+ Años</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">Experiencia en el mercado nacional</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-2xl sm:text-3xl font-black text-[#00B074]">26 Productos</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">En 5 categorías normalizadas</div>
              </div>
            </div>
          </div>

          {/* Right: Technical Services & CNC Machining */}
          <div id="servicios" className="lg:col-span-6 bg-gradient-to-br from-[#073B6E] to-[#04203F] text-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Wrench className="w-4 h-4" />
              <span>Servicios Especializados en Taller</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Mecanizado CNC y Fabricación a Medida
            </h3>

            <p className="text-sm text-slate-200 leading-relaxed">
              Transformamos la materia prima en soluciones terminadas según sus planos o muestras desgastadas.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00B074] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">Torneado y Fresado CNC de Plásticos</div>
                  <div className="text-xs text-slate-300">Bujes, engranajes, poleas y guías con tolerancias micrométricas.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00B074] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">Corte y Troquelado de Juntas para Bridas</div>
                  <div className="text-xs text-slate-300">Mesas de corte digital para empaques ANSI y especiales en teflón y caucho.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00B074] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">Extrusión y Vulcanizado de Perfiles</div>
                  <div className="text-xs text-slate-300">Desarrollo de matrices para perfiles de caucho con geometrías complejas.</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15">
              <button
                onClick={onOpenCalculator}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FFD200] to-[#FF9900] text-[#073B6E] font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-105 transition-all cursor-pointer"
              >
                <span>Cotizar Fabricación con la Calculadora</span>
                <ArrowRight className="w-4 h-4 text-[#073B6E]" />
              </button>
            </div>
          </div>
        </div>

        {/* Key Industries Served */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#00B074]">
              <span>Sectores Productivos</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-[#073B6E]">
              Industrias que Confían en Emacin
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Desarrollamos soluciones adaptadas a las condiciones más severas de temperatura, corrosión química y desgaste mecánico en el Perú.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, idx) => (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#073B6E]/40 hover:shadow-lg rounded-2xl p-6 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#073B6E] flex items-center justify-center">
                    {ind.icon}
                  </div>
                  <h4 className="text-lg font-black text-[#073B6E]">{ind.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {ind.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-200/80 text-[11px] font-bold text-[#00B074]">
                  {ind.stats}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Surfaced Certifications & Quality Signals */}
        <div id="certificaciones" className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#007A50] text-xs font-extrabold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#00B074]" />
                <span>Garantía de Calidad Técnica</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#073B6E]">
                Cumplimiento de Normas Internacionales
              </h3>
              <p className="text-sm text-slate-600 max-w-2xl">
                Todos nuestros plásticos y elastómeros cuentan con certificados de lote del fabricante y cumplen con normativas <strong>ASTM, DIN, FDA e ISO 9001</strong> para aplicaciones críticas.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto shrink-0">
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                <FileCheck2 className="w-6 h-6 text-[#073B6E] mx-auto mb-1.5" />
                <div className="text-xs font-black text-slate-800">ASTM D</div>
                <div className="text-[10px] text-slate-500">Ensayos Mecánicos</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                <FileCheck2 className="w-6 h-6 text-[#00B074] mx-auto mb-1.5" />
                <div className="text-xs font-black text-slate-800">FDA 21 CFR</div>
                <div className="text-[10px] text-slate-500">Grado Alimenticio</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                <FileCheck2 className="w-6 h-6 text-amber-500 mx-auto mb-1.5" />
                <div className="text-xs font-black text-slate-800">DIN EN</div>
                <div className="text-[10px] text-slate-500">Norma Europea</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                <FileCheck2 className="w-6 h-6 text-[#073B6E] mx-auto mb-1.5" />
                <div className="text-xs font-black text-slate-800">ISO 9001</div>
                <div className="text-[10px] text-slate-500">Trazabilidad</div>
              </div>
            </div>
          </div>
        </div>

        {/* Industrial Testimonials */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-[#073B6E]">
              Testimonios de Quienes Mantienen al País Operando
            </h3>
            <p className="text-sm text-slate-600">
              La confianza de jefes de planta y compras industriales a lo largo de más de dos décadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative flex flex-col justify-between"
              >
                <Quote className="w-10 h-10 text-slate-200 absolute top-6 right-6 pointer-events-none" />
                <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed mb-6 font-medium">
                  "{t.quote}"
                </p>
                <div>
                  <div className="text-sm font-bold text-[#073B6E]">{t.author}</div>
                  <div className="text-xs text-slate-600">{t.role}</div>
                  <div className="text-xs font-semibold text-[#00B074] mt-0.5">{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
