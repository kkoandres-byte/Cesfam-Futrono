export enum RequestStatus {
  PENDING = 'Pendiente',
  AUTHORIZED = 'Autorizado',
  REJECTED = 'Rechazado',
}

export interface BlockRequest {
  id: string;
  createdAt: number;
  solicitante: string; // Coordinator
  professionalName: string;
  profession: string;
  blockType: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string;   // HH:MM
  status: RequestStatus;
  comments?: string;
}

export type ViewMode = 'form' | 'spreadsheet' | 'calendar';
