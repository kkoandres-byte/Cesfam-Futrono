import React, { useState } from 'react';
import { BlockRequest, RequestStatus } from '../types';
import { updateRequestStatus, generateCSV } from '../services/storageService';
import { generateExecutiveSummary } from '../services/geminiService';
import { Button } from './Button';

interface SpreadsheetViewProps {
  data: BlockRequest[];
  onDataChange: () => void;
}

export const SpreadsheetView: React.FC<SpreadsheetViewProps> = ({ data, onDataChange }) => {
  const [filter, setFilter] = useState<RequestStatus | 'All'>('All');
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleStatusChange = (id: string, newStatus: RequestStatus) => {
    updateRequestStatus(id, newStatus);
    onDataChange();
  };

  const handleExport = () => {
    const csv = generateCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cesfam_solicitudes_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleGenerateReport = async () => {
    setLoadingAi(true);
    const summary = await generateExecutiveSummary(data);
    setAiSummary(summary);
    setLoadingAi(false);
  };

  const filteredData = filter === 'All' ? data : data.filter(r => r.status === filter);

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case RequestStatus.AUTHORIZED: return 'bg-green-100 text-green-800 border-green-200';
      case RequestStatus.REJECTED: return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600">Filtrar por estado:</span>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as any)}
            className="rounded-md border border-gray-300 text-sm py-1.5 px-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">Todos</option>
            <option value={RequestStatus.PENDING}>Pendientes</option>
            <option value={RequestStatus.AUTHORIZED}>Autorizados</option>
            <option value={RequestStatus.REJECTED}>Rechazados</option>
          </select>
        </div>
        <div className="flex space-x-2">
           <Button onClick={handleGenerateReport} variant="secondary" size="sm" isLoading={loadingAi}>
            {loadingAi ? 'Analizando...' : '✨ Análisis IA'}
          </Button>
          <Button onClick={handleExport} variant="outline" size="sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exportar a CSV
          </Button>
        </div>
      </div>

      {/* AI Summary Section */}
      {aiSummary && (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-lg p-5 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-indigo-900 mb-1">Reporte Ejecutivo (Gemini AI)</h3>
              <div className="text-sm text-indigo-800 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: aiSummary }} />
            </div>
            <button onClick={() => setAiSummary(null)} className="ml-auto text-indigo-400 hover:text-indigo-600">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Data Grid */}
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Solicitado el</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profesional</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo Bloqueo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fechas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Solicitante</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-gray-500 text-sm">
                    No hay solicitudes que coincidan con el filtro.
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(row.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{row.professionalName}</div>
                      <div className="text-sm text-gray-500">{row.profession}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.blockType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.startDate} <br/> <span className="text-xs text-gray-400">a</span> {row.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.startTime} - {row.endTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.solicitante}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusChange(row.id, RequestStatus.AUTHORIZED)}
                          className="text-green-600 hover:text-green-900 bg-green-50 px-2 py-1 rounded border border-green-200 hover:bg-green-100"
                          title="Autorizar"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => handleStatusChange(row.id, RequestStatus.REJECTED)}
                          className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded border border-red-200 hover:bg-red-100"
                          title="Rechazar"
                        >
                          ✕
                        </button>
                        <button
                          onClick={() => handleStatusChange(row.id, RequestStatus.PENDING)}
                          className="text-yellow-600 hover:text-yellow-900 bg-yellow-50 px-2 py-1 rounded border border-yellow-200 hover:bg-yellow-100"
                          title="Marcar Pendiente"
                        >
                          ?
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
