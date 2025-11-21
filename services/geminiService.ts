import { GoogleGenAI } from "@google/genai";
import { BlockRequest, RequestStatus } from '../types';

export const generateExecutiveSummary = async (requests: BlockRequest[]): Promise<string> => {
  if (!process.env.API_KEY) return "API Key no configurada.";

  const pendingCount = requests.filter(r => r.status === RequestStatus.PENDING).length;
  const authorizedCount = requests.filter(r => r.status === RequestStatus.AUTHORIZED).length;
  
  // Simplified data context for Gemini to avoid token limits
  const contextData = requests.slice(0, 50).map(r => 
    `- ${r.professionalName} (${r.profession}): ${r.blockType} desde ${r.startDate} hasta ${r.endDate} [${r.status}]`
  ).join('\n');

  const prompt = `
    Actúa como un asistente administrativo experto para un CESFAM (Centro de Salud Familiar).
    Analiza los siguientes datos de solicitudes de bloqueo de agenda (vacaciones, permisos, capacitaciones, etc.).
    
    Resumen actual:
    - Pendientes: ${pendingCount}
    - Autorizados: ${authorizedCount}
    
    Lista de solicitudes recientes (muestra):
    ${contextData}
    
    Genera un breve reporte ejecutivo (máximo 2 párrafos) en formato HTML simple (usando <p>, <strong>, <ul>, <li>) sobre el estado de la dotación. 
    Identifica si hay muchas solicitudes pendientes de un tipo específico o de una profesión específica que puedan poner en riesgo la atención.
    Sé profesional y directo.
  `;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "No se pudo generar el resumen.";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Error al contactar con el servicio de IA.";
  }
};
