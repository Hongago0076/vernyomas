export class Appointment {
  constructor(
    public id: string,
    public patientId: string,
    public doctorId: string,
    public date: string,
    public place: string,
    public purpose: string,
  ) {}
}
