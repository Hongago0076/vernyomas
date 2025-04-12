export interface Patient {
  id?: string;
  name: string;
  dateOfBirth: string; // YYYY-MM-DD
  tajNumber: string;
  email?: string;
  doctorId?: string;
}
