import React, { useState } from 'react';
import { saveRequest } from '../services/storageService';
import { COORDINADORES, DISCIPLINAS, TIPOS_BLOQUEO, PROFESIONALES_POR_DISCIPLINA } from '../constants';
import { Button } from './Button';

interface RequestFormProps {
  onSuccess: () => void;
}

export const RequestForm: React.FC<RequestFormProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  
  // Helper for local date YYYY-MM-DD
  const getTodayString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = getTodayString();
  
  // Initialize default discipline and the first professional in that list
  const defaultDiscipline = DISCIPLINAS[0];
  const defaultProfessional = PROFESIONALES_POR_DISCIPLINA[defaultDiscipline][0] || '';

  const [formData, setFormData] = useState({
    solicitante: COORDINADORES[0],
    profession: defaultDiscipline,
    professionalName: defaultProfessional,
    blockType: TIPOS_BLOQUEO[0],
    startDate: today, // Automatically set to today
    endDate: today,   // Automatically set to today
    startTime: '08:00',
    endTime: '17:00',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'profession') {
      // When profession changes, reset professional name to the first option in the new list
      const availableProfessionals = PROFESIONALES_POR_DISCIPLINA[value] || [];
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        professionalName: availableProfessionals[0] || ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate network delay for UX
    await new Promise(resolve => setTimeout(resolve, 600));
    
    saveRequest(formData);
    setLoading(false);
    onSuccess();
  };

  const availableProfessionals = PROFESIONALES_POR_DISCIPLINA[formData.profession] || [];

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Nueva Solicitud de Bloqueo
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* New Field: Fecha de Solicitud (Automatic & Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Solicitud
            </label>
            <input
              type="date"
              value={today}
              disabled
              className="w-full rounded-md border-gray-300 bg-gray-100 text-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="solicitante" className="block text-sm font-medium text-gray-700 mb-1">
              Solicitante (Coordinador)
            </label>
            <select
              name="solicitante"
              id="solicitante"
              required
              value={formData.solicitante}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {COORDINADORES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
              Profesión / Estamento
            </label>
            <select
              name="profession"
              id="profession"
              required
              value={formData.profession}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {DISCIPLINAS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="professionalName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Profesional
            </label>
            <select
              name="professionalName"
              id="professionalName"
              required
              value={formData.professionalName}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {availableProfessionals.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="blockType" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Bloqueo
            </label>
            <select
              name="blockType"
              id="blockType"
              required
              value={formData.blockType}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {TIPOS_BLOQUEO.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Inicio
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              required
              value={formData.startDate}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Término
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              required
              value={formData.endDate}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
              Hora Inicio
            </label>
            <input
              type="time"
              name="startTime"
              id="startTime"
              required
              value={formData.startTime}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
              Hora Término
            </label>
            <input
              type="time"
              name="endTime"
              id="endTime"
              required
              value={formData.endTime}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <Button type="submit" isLoading={loading} size="lg">
            Enviar Solicitud
          </Button>
        </div>
      </form>
    </div>
  );
};
