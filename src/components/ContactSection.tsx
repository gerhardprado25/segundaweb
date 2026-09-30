import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  Shield,
  HelpCircle,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [productInterest, setProductInterest] = useState('General');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setEmail('');
      setCompany('');
      setMessage('');
    }, 1000);
  };

  const whatsappDirectMessage = `Hola Corporación Emacin, me comunico desde la web para cotizar el producto: ${productInterest}.`;
  const whatsappUrl = `https://wa.me/51981334762?text=${encodeURIComponent(whatsappDirectMessage)}`;

  return (
    <section id="contacto" className="py-20 bg-slate-100/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#00B074]">
            <span>Atención Inmediata</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#073B6E]">
            Canales de Contacto & Asesoría Técnica
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Contáctese directamente con nuestros asesores de ventas e ingenieros de aplicación. Envíe sus requerimientos por formulario, correo o WhatsApp directo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details & Hierarchical Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Priority Card */}
            <div className="bg-gradient-to-br from-[#073B6E] to-[#04203F] text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Respuesta Inmediata</span>
                </div>
                <span className="text-xs bg-white/15 px-2.5 py-1 rounded-full text-white">Canal 1</span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">Ventas & Cotizaciones WhatsApp</h3>
                <p className="text-xs text-blue-200 mt-1">
                  Atención prioritaria para cotizaciones formales de planchas, barras, cortes y perfiles.
                </p>
              </div>

              <div className="text-2xl font-black text-[#FFD200] tracking-wide">
                +51 981 334 762
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#00B074] hover:bg-[#009E60] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Iniciar Chat de Ventas</span>
              </a>
            </div>

            {/* Other Direct Channels */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Directorio Corporativo Lima
              </div>

              {/* Central Telefónica */}
              <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#073B6E]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Central Telefónica Lima</div>
                  <a
                    href="tel:+5113261234"
                    className="text-sm font-semibold text-[#073B6E] hover:underline"
                  >
                    (01) 326-1234 / (01) 326-5678
                  </a>
                  <div className="text-[11px] text-slate-500">Mesa de partes y atención telefónica</div>
                </div>
              </div>

              {/* Asesoría Técnica */}
              <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Asesoría Técnica de Planta</div>
                  <a
                    href="https://wa.me/51998123456"
                    className="text-sm font-semibold text-[#073B6E] hover:underline"
                  >
                    +51 998 123 456
                  </a>
                  <div className="text-[11px] text-slate-500">Consultas de tolerancia y planos CNC</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#00B074]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Correos Electrónicos</div>
                  <div className="text-sm font-semibold text-slate-700">ventas@emacin.com.pe</div>
                  <div className="text-[11px] text-slate-500">Cotizaciones: gerhardprado25@gmail.com</div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Planta Central y Almacén</div>
                  <div className="text-xs text-slate-600 font-medium">
                    Jr. Huancavelica / Av. Guillermo Dansey, Cercado de Lima, Perú
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Horario: Lun a Vie 8:00 AM - 6:00 PM | Sáb 8:30 AM - 1:00 PM
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form with Product Interest Field (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
            <div className="mb-6">
              <h3 className="text-2xl font-black text-[#073B6E]">
                Formulario de Cotización Rápida
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Complete los datos para recibir una cotización formal con ficha técnica adjunta.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-800">¡Mensaje Recibido!</h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Un asesor comercial de Corporación Emacin se pondrá en contacto con usted en un plazo no mayor a 2 horas laborables.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#073B6E] text-white rounded-xl text-xs font-bold"
                >
                  Enviar Otro Mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Ing. Jorge Mendoza"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#073B6E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Teléfono / Celular WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej: +51 987 654 321"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#073B6E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Ej: compras@empresa.pe"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#073B6E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Empresa / RUC (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 20601234567 - Minera SAC"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#073B6E]"
                    />
                  </div>
                </div>

                {/* PRODUCT OF INTEREST FIELD - Specifically requested */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Producto o Categoría de Interés *
                  </label>
                  <select
                    value={productInterest}
                    onChange={(e) => setProductInterest(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#073B6E]"
                  >
                    <option value="Consulta General">-- Consulta General / Asesoría Técnica --</option>
                    <optgroup label="1. Plásticos Técnicos">
                      {PRODUCTS.filter((p) => p.category === 'plasticos-tecnicos').map((p) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="2. Cauchos Industriales">
                      {PRODUCTS.filter((p) => p.category === 'cauchos').map((p) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="3. Sellos y Juntas">
                      {PRODUCTS.filter((p) => p.category === 'sellos').map((p) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="4. Aislamientos Térmicos">
                      {PRODUCTS.filter((p) => p.category === 'aislamientos-termicos').map((p) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="5. Aislamiento Eléctrico / Mecánico">
                      {PRODUCTS.filter((p) => p.category === 'aislamiento-electrico-mecanico').map((p) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </optgroup>
                    <option value="Mecanizado CNC a Plano">Mecanizado CNC a Plano / Fabricación Especial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Requerimiento, Dimensiones o Cantidad *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describa medidas aproximadas, fluido de operación, temperatura o condiciones de trabajo..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#073B6E]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-500">
                    Sus datos están protegidos bajo estricta confidencialidad comercial.
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-[#073B6E] hover:bg-[#04203F] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Solicitud</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
