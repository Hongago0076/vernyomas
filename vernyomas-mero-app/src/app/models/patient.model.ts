export class Patient {
  constructor(
    public name: string,
    public dateOfBirth: string, // YYYY-MM-DD
    public tajNumber: string,
    public email?: string,
    public doctorId?: string,
    public id?: string,
  ){}
}
