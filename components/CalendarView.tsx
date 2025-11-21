import React, { useState, useMemo } from 'react';
import { BlockRequest, RequestStatus } from '../types';

interface CalendarViewProps {
  requests: BlockRequest[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ requests }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Filter only authorized requests for the calendar
  const authorizedRequests = useMemo(() => 
    requests.filter(r => r.status === RequestStatus.AUTHORIZED),
  [requests]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 = Sunday

  // Adjust for Monday start (standard in Chile)
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startOffset }, (_, i) => i);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    return authorizedRequests.filter(req => {
      // Simple range check: if current date is within start and end
      return dateStr >= req.startDate && dateStr <= req.endDate;
    });
  };

  const monthName = new Intl.DateTimeFormat('es-CL', { month: 'long', year: 'numeric' }).format(currentDate);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 capitalize">{monthName}</h2>
        <div className="flex space-x-2">
          <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden border border-gray-200">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(d => (
          <div key={d} className="bg-gray-50 py-2 text-center text-sm font-semibold text-gray-700">
            {d}
          </div>
        ))}

        {blanks.map(i => (
          <div key={`blank-${i}`} className="bg-white h-32 md:h-40"></div>
        ))}

        {days.map(day => {
          const events = getEventsForDay(day);
          return (
            <div key={day} className="bg-white h-32 md:h-40 p-2 border-t border-gray-100 hover:bg-blue-50 transition-colors flex flex-col">
              <span className="text-sm font-bold text-gray-700 mb-1">{day}</span>
              <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
                {events.map(ev => (
                  <div 
                    key={ev.id} 
                    className="text-xs p-1 rounded bg-blue-100 text-blue-800 border border-blue-200 truncate cursor-help group relative"
                  >
                    <span className="font-semibold">{ev.professionalName.split(' ')[0]}</span>: {ev.blockType}
                    
                    {/* Tooltip */}
                    <div className="hidden group-hover:block absolute z-10 bottom-full left-0 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg mb-1">
                      <p className="font-bold">{ev.professionalName}</p>
                      <p>{ev.profession}</p>
                      <p>{ev.blockType}</p>
                      <p>{ev.startTime} - {ev.endTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 flex items-center text-sm text-gray-500">
        <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded mr-2"></div>
        <span>Bloqueo Autorizado</span>
      </div>
    </div>
  );
};
