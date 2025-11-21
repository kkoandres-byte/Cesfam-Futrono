import React, { useState, useEffect } from 'react';
import { getRequests } from './services/storageService';
import { RequestForm } from './components/RequestForm';
import { SpreadsheetView } from './components/SpreadsheetView';
import { CalendarView } from './components/CalendarView';
import { BlockRequest, ViewMode, RequestStatus } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('form');
  const [requests, setRequests] = useState<BlockRequest[]>([]);

  // Initial data load
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setRequests(getRequests());
  };

  const pendingCount = requests.filter(r => r.status === RequestStatus.PENDING).length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2">
                  C
                </div>
                <span className="font-bold text-xl text-gray-800 tracking-tight">CESFAM<span className="text-blue-600">Gestor</span></span>
              </div>
              <div className="hidden md:ml-8 md:flex md:space-x-4">
                <button
                  onClick={() => setCurrentView('form')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'form' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Nueva Solicitud
                </button>
                <button
                  onClick={() => setCurrentView('spreadsheet')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                    currentView === 'spreadsheet' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Solicitudes / Hoja de Cálculo
                  {pendingCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-yellow-500 rounded-full">
                      {pendingCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setCurrentView('calendar')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'calendar' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Calendario Visual
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu (Simple implementation) */}
        <div className="md:hidden flex justify-around border-t border-gray-200 bg-gray-50 p-2">
          <button onClick={() => setCurrentView('form')} className={`p-2 ${currentView === 'form' ? 'text-blue-600' : 'text-gray-500'}`}>
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <button onClick={() => setCurrentView('spreadsheet')} className={`p-2 relative ${currentView === 'spreadsheet' ? 'text-blue-600' : 'text-gray-500'}`}>
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 10h16M4 14h16M4 18h16" strokeWidth="2" strokeLinecap="round"/></svg>
             {pendingCount > 0 && <span className="absolute top-1 right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white"></span>}
          </button>
          <button onClick={() => setCurrentView('calendar')} className={`p-2 ${currentView === 'calendar' ? 'text-blue-600' : 'text-gray-500'}`}>
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-in fade-in duration-300">
          {currentView === 'form' && (
            <div className="space-y-6">
               <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Complete el formulario para ingresar un nuevo bloqueo. La solicitud quedará en estado <strong>Pendiente</strong> hasta su autorización.
                    </p>
                  </div>
                </div>
              </div>
              <RequestForm onSuccess={() => {
                refreshData();
                setCurrentView('spreadsheet'); // Redirect to list after success
              }} />
            </div>
          )}

          {currentView === 'spreadsheet' && (
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Gestión de Solicitudes</h1>
                  <p className="text-sm text-gray-500">Vista de hoja de cálculo y autorización de bloqueos.</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">
                    Total registros: {requests.length}
                  </span>
                </div>
              </div>
              <SpreadsheetView data={requests} onDataChange={refreshData} />
            </div>
          )}

          {currentView === 'calendar' && (
             <div>
               <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Calendario Visual</h1>
                  <p className="text-sm text-gray-500">Visualización mensual de bloqueos autorizados.</p>
                </div>
              <CalendarView requests={requests} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
