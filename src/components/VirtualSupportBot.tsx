import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  X,
  Send,
  MessageCircle,
  Sparkles,
  MapPin,
  ExternalLink,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  time?: string;
}

const QUICK_QUESTIONS = [
  '¿Dónde están ubicados?',
  '¿Cuál es el horario de atención?',
  '¿Cuáles son sus teléfonos de contacto?',
  '¿Qué plásticos técnicos tienen en stock?',
  '¿Hacen envíos a provincias y minas?',
  '¿Cómo solicito una cotización?',
  '¿Fabrican piezas mecanizadas a plano?',
  '¿Qué caucho resiste aceites e hidrocarburos?',
];

// Fallback responses in case of network interruption
const LOCAL_KNOWLEDGE: Record<string, string> = {
  '¿dónde están ubicados?':
    '📍 Nuestra sede y almacén central se encuentran en Cercado de Lima, Perú. Puede abrir nuestra ubicación exacta en Google Maps aquí: https://maps.app.goo.gl/baDBp18YinHCC62Z8',
  '¿cuál es el horario de atención?':
    '⏰ Nuestro horario de atención en sede central y almacén es de Lunes a Viernes de 8:00 AM a 6:00 PM y Sábados de 8:30 AM a 1:00 PM.',
  '¿cuáles son sus teléfonos de contacto?':
    '📞 Puede comunicarse a nuestra Central Telefónica Lima: (01) 326-1234 / (01) 326-5678, Asesoría Técnica de Planta: +51 998 123 456, WhatsApp de Ventas: +51 981 334 762 o al correo oficial ventas@emacin.com.pe.',
  '¿qué plásticos técnicos tienen en stock?':
    'Contamos con stock permanente en Lima de: Nylon Poliamida (PA6/PA66), PTFE Teflon puro y con cargas, POM Acetal (Delrin), UHMW-PE antidesgaste, Polietileno HDPE sanitario, PVC rígido, Poliuretano (PU) y Acrílico en planchas, barras redondas y tubos.',
  '¿hacen envíos a provincias y minas?':
    '¡Sí! Realizamos despachos diarios con embalaje de protección técnica a empresas mineras, pesqueras e industrias en todas las regiones del Perú.',
  '¿cómo solicito una cotización?':
    'Puede cotizar directamente en la Ventana 03 de Cotización en esta página, o escribirnos directamente a nuestro WhatsApp de Ventas al +51 981 334 762 con las medidas requeridas.',
  '¿fabrican piezas mecanizadas a plano?':
    'Sí, contamos con servicio de mecanizado CNC de precisión para polímeros (engranajes, bujes, cojinetes, tiras de desgaste) según plano técnico o réplica de muestra física.',
  '¿qué caucho resiste aceites e hidrocarburos?':
    'Para hidrocarburos, aceites y grasas el material estándar es el Caucho Nitrilo (NBR). Para condiciones más severas con calor extremo hasta 250°C, recomendamos Viton (FKM).',
};

export const VirtualSupportBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      text: '¡Hola! 👋 Soy el Asistente Virtual de Soporte de Corporación Emacin S.A.C.\n\n¿En qué puedo orientarte hoy? Puedes hacerme preguntas sobre nuestros plásticos técnicos, cauchos, sellos, aislamientos, ubicación o cómo cotizar.',
      time: 'Ahora',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Call server-side Gemini API proxy route
      const conversationHistory = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch('/api/support-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();
      const replyText =
        data.reply ||
        data.fallbackReply ||
        'Gracias por su consulta. Para asistencia comercial inmediata, puede escribirnos por WhatsApp al +51 981 334 762.';

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.warn('Network issue reaching /api/support-chat, using intelligent fallback:', err);

      // Check local knowledge match
      const lower = query.toLowerCase();
      let matchedReply = '';
      for (const [key, answer] of Object.entries(LOCAL_KNOWLEDGE)) {
        if (lower.includes(key.replace(/[¿?]/g, '').trim()) || key.includes(lower)) {
          matchedReply = answer;
          break;
        }
      }

      if (!matchedReply) {
        matchedReply =
          'Corporación Emacin S.A.C. dispone de stock permanente en Lima de plásticos de ingeniería, cauchos, sellos y aislamientos. Para una cotización personalizada o especificación técnica inmediata, por favor contáctenos a nuestro WhatsApp de Ventas al +51 981 334 762 o al correo ventas@emacin.com.pe.';
      }

      const botMessage: ChatMessage = {
        id: `bot-fallback-${Date.now()}`,
        role: 'assistant',
        text: matchedReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const defaultWhatsappUrl =
    'https://wa.me/51981334762?text=' +
    encodeURIComponent('Hola Corporación Emacin, tengo una consulta sobre sus productos industriales.');

  return (
    <>
      {/* =========================================================
          FLOATING ROBOT BUBBLE BUTTON (BOTTOM RIGHT)
          ========================================================= */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Subtle Tooltip Label on Hover / Idle (Visible on Desktop) */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center gap-2 bg-white/95 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-full shadow-xl border border-slate-200 pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-[#00B074] animate-pulse" />
            <span>Soporte Virtual IA</span>
          </motion.div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Cerrar Soporte Virtual' : 'Abrir Asistente Virtual Inteligente'}
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none ${
            isOpen
              ? 'bg-slate-800 text-white rotate-90 border-2 border-white/20'
              : 'bg-[#073B6E] text-white border-2 border-[#FFD200] hover:shadow-[#073B6E]/50'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              {/* Robot Icon */}
              <Bot className="w-7 h-7 sm:w-8 sm:h-8 text-[#FFD200]" />

              {/* Online Green Pulsing Indicator */}
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00B074] border-2 border-white" />
              </span>

              {/* Unread badge if closed */}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -left-1 bg-red-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow">
                  1
                </span>
              )}
            </>
          )}
        </button>
      </div>

      {/* =========================================================
          CHAT WINDOW PANEL (DOCKED BOTTOM RIGHT)
          ========================================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[400px] h-[540px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-800"
          >
            {/* Header */}
            <div className="bg-[#073B6E] text-white p-4 sm:p-5 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#FFD200] shrink-0">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-black text-sm text-white tracking-tight">
                      Soporte Virtual IA
                    </h3>
                    <span className="text-[10px] bg-[#00B074] text-white font-extrabold px-1.5 py-0.2 rounded">
                      EMACIN
                    </span>
                  </div>
                  <p className="text-[11px] text-white/80 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>En línea · Preguntas Frecuentes</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setMessages([
                      {
                        id: 'msg-welcome-reset',
                        role: 'assistant',
                        text: 'Conversación reiniciada. ¿En qué puedo orientarte sobre plásticos de ingeniería, cauchos, sellos o aislamientos?',
                        time: 'Ahora',
                      },
                    ])
                  }
                  title="Reiniciar chat"
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  aria-label="Cerrar ventana de soporte"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-[#073B6E] text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>
                  </div>
                  {msg.time && (
                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                      {msg.time}
                    </span>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-xl bg-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                    <Bot className="w-4 h-4 text-[#073B6E]" />
                  </div>
                  <div className="bg-white text-slate-500 border border-slate-200 rounded-2xl rounded-bl-xs px-4 py-2 text-xs flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#073B6E] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#073B6E] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#073B6E] animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] text-slate-500 ml-1">Consultando información...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions Suggestions Pills */}
            <div className="p-2.5 bg-white border-t border-slate-200 overflow-x-auto">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 px-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#00B074]" />
                <span>Preguntas rápidas sugeridas:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleQuickQuestionClick(q)}
                    disabled={isLoading}
                    className="text-[11px] bg-slate-100 hover:bg-blue-50 hover:text-[#073B6E] hover:border-blue-200 border border-slate-200 rounded-full px-2.5 py-1 text-slate-700 transition-colors text-left disabled:opacity-50 cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu pregunta aquí..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#073B6E] focus:bg-white"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="w-9 h-9 rounded-xl bg-[#073B6E] hover:bg-[#04203F] text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shrink-0 cursor-pointer"
                title="Enviar pregunta"
              >
                <Send className="w-4 h-4 text-[#FFD200]" />
              </button>
            </form>

            {/* Bottom Human WhatsApp Help Bar */}
            <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px]">
              <span className="text-slate-600">¿Deseas hablar con un asesor?</span>
              <a
                href={defaultWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#00B074]" />
                <span>WhatsApp Humano</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
