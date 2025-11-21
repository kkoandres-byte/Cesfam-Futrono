import { BlockRequest, RequestStatus } from '../types';

const STORAGE_KEY = 'cesfam_requests_v1';

export const getRequests = (): BlockRequest[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveRequest = (request: Omit<BlockRequest, 'id' | 'createdAt' | 'status'>): BlockRequest => {
  const newRequest: BlockRequest = {
    ...request,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    status: RequestStatus.PENDING,
  };
  
  const current = getRequests();
  const updated = [newRequest, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newRequest;
};

export const updateRequestStatus = (id: string, status: RequestStatus): BlockRequest[] => {
  const current = getRequests();
  const updated = current.map(req => req.id === id ? { ...req, status } : req);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

// Simulates exporting to CSV which users would import to Google Sheets
export const generateCSV = (requests: BlockRequest[]): string => {
  const headers = ['ID', 'Fecha Solicitud', 'Solicitante', 'Profesional', 'Profesión', 'Tipo Bloqueo', 'Inicio', 'Fin', 'Hora Inicio', 'Hora Fin', 'Estado'];
  const rows = requests.map(r => [
    r.id,
    new Date(r.createdAt).toLocaleDateString(),
    r.solicitante,
    r.professionalName,
    r.profession,
    r.blockType,
    r.startDate,
    r.endDate,
    r.startTime,
    r.endTime,
    r.status
  ]);
  
  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
};
