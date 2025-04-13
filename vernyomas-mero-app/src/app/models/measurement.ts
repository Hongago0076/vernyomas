export class Measurement {
  constructor(
    public patientId: number,
    public systolic: number,
    public diastolic: number,
    public pulse: number,
    public date: string,
    public notes?: string,
    public id?: string,
  ) {}
}
