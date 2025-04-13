export class Appointment {
  constructor(
    public patientId: string,
    public doctorId: string,
    public date: string, // ISO dátum formátum
    public place: string,
    public purpose?: string,
    public id?: string,
  ) {}
}
