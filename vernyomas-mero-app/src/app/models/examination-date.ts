export interface ExaminationDate {
  id?: string;
  patientId: string;
  doctorId: string;
  date: string; // ISO dátum formátum
  place: string;
  purpose?: string;
}
