export class Measurement {
  constructor(
    public id: string,
    public patientId: string,
    public systolic: number,
    public diastolic: number,
    public pulse: number,
    public date: string
  ) {}
}
