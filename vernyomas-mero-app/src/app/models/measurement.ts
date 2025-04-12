export interface Measurement {
  id?: string;
  patientId: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  date: string; // pl. "2025-04-12T09:30:00"
  notes?: string;
}
