import React, { useState, useEffect } from 'react';
import { PRODUCTS, Product } from '../data/products';
import {
  Calculator,
  X,
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Ruler,
  Layers,
  Sparkles,
  HelpCircle,
  FileSpreadsheet,
} from 'lucide-react';

interface SizeCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: Product | null;
}

export const SizeCalculatorModal: React.FC<SizeCalculatorModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    preselectedProduct?.id || PRODUCTS[0].id
  );
  const [formatType, setFormatType] = useState<string>('Plancha');
  const [thickness, setThickness] = useState<string>('');
  const [diameter, setDiameter] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('1');
  const [unit, setUnit] = useState<'mm' | 'pulgadas'>('mm');

  // Customer Contact Fields
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerCompany, setCustomerCompany] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');

  // Status State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quoteReference, setQuoteReference] = useState<string>('');

  useEffect(() => {
    if (preselectedProduct) {
      setSelectedProductId(preselectedProduct.id);
      if (preselectedProduct.presentations.formats.length > 0) {
        setFormatType(preselectedProduct.presentations.formats[0]);
      }
    }
  }, [preselectedProduct]);

  if (!isOpen) return null;

  const currentProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  // Handle automatic format adjustment when product changes
  const handleProductChange = (productId: string) => {
    setSelectedProductId(productId);
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (prod && prod.presentations.formats.length > 0) {
      setFormatType(prod.presentations.formats[0]);
    }
  };

  // Build WhatsApp URL
  const generateWhatsAppMessage = () => {
    const dimensionDetails = formatType === 'Barra'
      ? `Diámetro: ${diameter} ${unit}, Largo: ${length} ${unit}`
      : formatType === 'Plancha' || formatType === 'Rollo'
      ? `Espesor: ${thickness} ${unit}, Ancho: ${width} ${unit}, Largo: ${length} ${unit}`
      : `Medida requerida: Espesor: ${thickness} ${unit}, Dimensión: ${width}x${length} ${unit}`;

    const text = `*SOLICITUD DE COTIZACIÓN - CORPORACIÓN EMACIN*
*Ref:* ${quoteReference || 'COT-WEB-2026'}
*Producto:* ${currentProduct.name}
*Categoría:* ${currentProduct.categoryName}
*Formato:* ${formatType}
*Dimensiones:* ${dimensionDetails}
*Cantidad:* ${quantity} unidad(es)
-------------------------
*Cliente:* ${customerName}
*Empresa/RUC:* ${customerCompany || 'Particular'}
*Teléfono:* ${customerPhone}
*Correo:* ${customerEmail}
${customerNotes ? `*Notas:* ${customerNotes}` : ''}`;

    return `https://wa.me/51981334762?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ref = `COT-EMACIN-${Math.floor(1000 + Math.random() * 9000)}`;
    setQuoteReference(ref);

    // Simulate backend sending email to gerhardprado25@gmail.com
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setThickness('');
    setDiameter('');
    setWidth('');
    setLength('');
    setQuantity('1');
    setCustomerNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#073B6E] text-white p-6 sm:p-7 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-[#FFD200] flex items-center justify-center shrink-0 border border-amber-400/30">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Herramienta de Cotización Técnica
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Calculadora de Medidas
              </h3>
              <p className="text-xs text-blue-100 mt-0.5">
                Ingrese las dimensiones deseadas para cotizar cortes o barras según su plano.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-black text-slate-800">
                  ¡Solicitud Enviada con Éxito!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Hemos enviado los datos de su cotización al área comercial (
                  <strong className="text-slate-800">gerhardprado25@gmail.com</strong> /{' '}
                  <strong className="text-slate-800">ventas@emacin.com.pe</strong>).
                </p>
                <div className="inline-block px-4 py-1.5 bg-slate-100 rounded-full text-xs font-mono font-bold text-slate-700">
                  Código de Referencia: {quoteReference}
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="font-bold text-[#073B6E] border-b border-slate-200 pb-1">
                  Resumen de la Cotización:
                </div>
                <div><strong>Producto:</strong> {currentProduct.name}</div>
                <div><strong>Formato:</strong> {formatType}</div>
                <div>
                  <strong>Medidas:</strong>{' '}
                  {formatType === 'Barra'
                    ? `Ø ${diameter} ${unit} x ${length} ${unit}`
                    : `${thickness} ${unit} (Esp.) x ${width} ${unit} (Ancho) x ${length} ${unit} (Largo)`}
                </div>
                <div><strong>Cantidad:</strong> {quantity} unidad(es)</div>
                <div><strong>Solicitante:</strong> {customerName} ({customerPhone})</div>
              </div>

              {/* Immediate WhatsApp Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#00B074] hover:bg-[#009E60] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Enviar también por WhatsApp a Ventas</span>
                </a>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-3 border border-slate-300 hover:bg-slate-50 rounded-xl text-sm font-semibold text-slate-700"
                >
                  Cotizar Otro Producto
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Product Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  1. Seleccione el Producto ({PRODUCTS.length} materiales disponibles)
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => handleProductChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#073B6E]"
                >
                  {PRODUCTS.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      [{prod.categoryName}] {prod.name}
                    </option>
                  ))}
                </select>

                {/* Published commercial range preview */}
                <div className="mt-2 p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-2 text-xs text-slate-600">
                  <Ruler className="w-4 h-4 text-[#073B6E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#073B6E]">Rangos comerciales habituales: </span>
                    {currentProduct.presentations.thicknessRange && (
                      <span>{currentProduct.presentations.thicknessRange}. </span>
                    )}
                    {currentProduct.presentations.diameterRange && (
                      <span>{currentProduct.presentations.diameterRange}. </span>
                    )}
                    {currentProduct.presentations.dimensionsRange && (
                      <span>{currentProduct.presentations.dimensionsRange}.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 2: Format & Dimensions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    2. Formato y Medidas Requeridas
                  </label>
                  {/* Units Toggle */}
                  <div className="flex items-center gap-1 text-xs bg-slate-100 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setUnit('mm')}
                      className={`px-2 py-0.5 rounded font-bold transition-colors ${
                        unit === 'mm' ? 'bg-white shadow text-[#073B6E]' : 'text-slate-500'
                      }`}
                    >
                      Milímetros (mm)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnit('pulgadas')}
                      className={`px-2 py-0.5 rounded font-bold transition-colors ${
                        unit === 'pulgadas' ? 'bg-white shadow text-[#073B6E]' : 'text-slate-500'
                      }`}
                    >
                      Pulgadas (")
                    </button>
                  </div>
                </div>

                {/* Presentation Format Radio */}
                <div className="flex flex-wrap gap-2">
                  {currentProduct.presentations.formats.map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setFormatType(fmt)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        formatType === fmt
                          ? 'bg-[#073B6E] text-white shadow'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>

                {/* Dimension Inputs based on Format */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  {formatType === 'Barra' ? (
                    <>
                      <div className="col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Diámetro (Ø en {unit}) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: 50"
                          value={diameter}
                          onChange={(e) => setDiameter(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B6E]"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Largo (en {unit}) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: 1000"
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B6E]"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Espesor ({unit}) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: 6.4 (1/4&quot;)"
                          value={thickness}
                          onChange={(e) => setThickness(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B6E]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Ancho ({unit}) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: 1000"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B6E]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Largo ({unit}) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: 2000"
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B6E]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Cantidad (Pzas/M) *
                        </label>
                        <input
                          type="text"
                          required
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B6E]"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Step 3: Customer Information */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  3. Datos de Contacto para Envío de Cotización
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Ing. Carlos Morales"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B6E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej: +51 987 654 321"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B6E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Ej: compras@minera.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B6E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Empresa / RUC (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Minera del Centro S.A.C."
                      value={customerCompany}
                      onChange={(e) => setCustomerCompany(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B6E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Comentarios, tolerancias de maquinado o plano (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Especifique si requiere corte a plano, biselado o certificado de calidad FDA/ASTM..."
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B6E]"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] text-slate-500">
                  Destino comercial: <strong>gerhardprado25@gmail.com</strong>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-[#073B6E] hover:bg-[#04203F] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Enviando...' : 'Enviar Cotización'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
