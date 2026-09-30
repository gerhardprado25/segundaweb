import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini API client on the server side with required User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `Eres el Asistente Virtual Inteligente de Soporte Técnico y Comercial de Corporación Emacin S.A.C., empresa peruana líder con más de 21 años en el mercado industrial de Lima, Perú.

Tu objetivo es responder de forma cordial, clara, concisa y muy profesional preguntas simples de clientes sobre materiales, especificaciones, ubicación, formas de cotización y atención.

Información oficial y canales de atención de Corporación Emacin S.A.C.:
- RUC: 20508544831
- Razón Social: CORPORACIÓN EMACIN S.A.C.
- Sede Central & Almacén Principal: Cercado de Lima, Perú.
- Ubicación en Google Maps: https://maps.app.goo.gl/baDBp18YinHCC62Z8
- Ventas WhatsApp (Cotizaciones): +51 981 334 762 (atención prioritaria)
- Central Telefónica Lima: (01) 326-1234 / (01) 326-5678
- Asesoría Técnica de Planta: +51 998 123 456
- Correo Electrónico Oficial: ventas@emacin.com.pe
- Horario de Atención: Lunes a Viernes de 8:00 AM a 6:00 PM | Sábados de 8:30 AM a 1:00 PM
- Redes Profesionales: LinkedIn oficial corporativo.
- Cobertura: Stock permanente en almacén central de Lima y despachos inmediatos a todo el Perú (mineras, pesqueras, energía e industrias en provincias).

Nuestras 5 Líneas de Productos Normalizados (en estricto orden):
1. Plásticos Técnicos:
   - Poliamida Nylon (PA6/PA66): reemplaza engranajes metálicos, bujes, alta resistencia al desgaste.
   - PTFE / Teflon: hasta 260°C, químicamente inerte, antiadherente.
   - POM Acetal (Delrin): alta precisión dimensional, engranajes y piezas mecánicas.
   - UHMW-PE: fricción ultra baja, revestimiento de tolvas mineras y silos.
   - HDPE (Polietileno): grado alimenticio FDA, nula absorción de humedad.
   - PVC Rígido: resistencia a ácidos y galvanoplastia.
   - Poliuretano (PU): resistencia extrema a impacto y abrasión (70 a 95 Shore A).
   - Acrílico Industrial: alta transparencia óptica.
   (Formatos: Planchas, Barras redondas, Tubos y cortes a medida).

2. Cauchos:
   - Nitrilo (NBR): resistente a aceites, hidrocarburos y grasas.
   - Neopreno (CR): agua salada, intemperie solar, ozono.
   - EPDM: vapor de agua, calor moderado y ozono.
   - Silicona: alimenticia/sanitaria FDA, de -60°C a +220°C.
   - Viton (FKM): hidrocarburos calientes, ácidos fuertes y hasta 250°C.
   - SBR: caucho de uso general para agua y amortiguación con o sin lona.
   - Perfiles extruidos de caucho para marcos y compuertas.

3. Sellos:
   - Juntas para bridas normalizadas ANSI B16.5 (150#, 300#, etc.) y DIN (FF y RF).
   - Empaquetaduras trenzadas de grafito flexible, PTFE y aramida para bombas y válvulas.
   - Planchas comprimidas libres de asbesto (non-asbestos).

4. Aislamientos Térmicos:
   - Telas y mantas de cerámica: incombustibles, soportan hasta 1260°C continuo.
   - Telas de fibra de vidrio: resistentes hasta 550°C continuo.
   - Fibras de sílice (hasta 1000°C) y cordones térmicos.

5. Aislamiento Eléctrico / Mecánico:
   - Planchas de fibra baquelita (base papel y base tela).
   - Fibra de vidrio FV (G-10, FR-4, G-11) con rigidez dieléctrica de hasta 20 kV/mm.
   - Fibra Ferrosel dieléctrica para celdas y tableros.

Servicios de Taller:
- Mecanizado CNC de plásticos técnicos a plano o muestra física.
- Dimensionado y corte longitudinal a medida de planchas y barras.
- Troquelado rápido de juntas y sellos sin pedido mínimo.
- Asesoría de selección de materiales y fichas técnicas.

Guía de Sectores Atendidos:
- Minería & Concentradoras: tolvas UHMW-PE, faldones SBR, sellos para ácidos.
- Pesca & Sector Naval: Neopreno para escotillas, empaquetaduras de achique, bujes de nylon.
- Petroquímica & Gas: Juntas libres de asbesto, Viton FKM, mantas cerámicas 1260°C.
- Alimentos, Bebidas & Farma: HDPE Sanitario FDA, Teflón virgen, Silicona atóxica.
- Textil & Confección: Engranajes silenciosos de baquelita y nylon.
- Automotriz & Transporte: Topes PU, sellos de cárter NBR, burletes EPDM.
- Electricidad & Subestaciones: Baquelita dieléctrica, Fibra G-10 / FR-4, Ferrosel.

Pautas de respuesta:
- Sé amable, educado y técnico pero accesible.
- Respuestas breves y precisas (1 a 3 párrafos cortos).
- Si el usuario desea comprar o cotizar, invítalo a usar la Ventana 03 de Cotización de la página web o comunicarse directamente por WhatsApp al +51 981 334 762.`;

// API endpoint for Virtual AI Assistant
app.post('/api/support-chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'El mensaje no puede estar vacío.' });
    }

    // Build conversation context
    const contents: any[] = [];
    if (Array.isArray(conversationHistory)) {
      for (const msg of conversationHistory.slice(-6)) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          contents.push({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: String(msg.text) }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }],
    });

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.6,
          maxOutputTokens: 600,
        },
      });
    } catch (primaryErr) {
      console.warn('Fallback to gemini-3.1-flash-lite:', primaryErr);
      response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.6,
          maxOutputTokens: 600,
        },
      });
    }

    const reply =
      response.text ||
      'Gracias por comunicarse con Corporación Emacin S.A.C. Para cotizaciones inmediatas, por favor escríbanos a nuestro WhatsApp de Ventas al +51 981 334 762.';

    return res.json({ reply });
  } catch (error: any) {
    console.error('Error generating AI support response:', error);
    return res.status(500).json({
      error: 'Error de conexión con el modelo de soporte.',
      fallbackReply:
        'Estimado cliente, estamos disponibles para atenderle de inmediato en nuestro WhatsApp de Ventas (+51 981 334 762) o en ventas@emacin.com.pe. También puede solicitar su cotización en la Ventana 03 de la página.',
    });
  }
});

// Start full-stack server
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Corporación Emacin App running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
