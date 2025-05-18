import { Injectable } from '@angular/core';
import {Firestore, collectionData, addDoc, deleteDoc, doc, updateDoc, setDoc} from '@angular/fire/firestore';
import {collection,  query, where, orderBy, limit } from 'firebase/firestore';
import {map, Observable} from 'rxjs';
import { Appointment } from '../models/appointment';
import {DocumentData} from '@angular/fire/compat/firestore';
import {Measurement} from '../models/measurement';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private collectionRef;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'appointments');
  }

  getAll(): Observable<Appointment[]> {
    return collectionData(this.collectionRef, { idField: 'id' }) as Observable<Appointment[]>;
  }

  add(appointment: Appointment): Promise<void> {
    const { id, ...data } = appointment;
    return addDoc(this.collectionRef, data as any).then(() => {});
  }

  update(appointment: Appointment): Promise<void> {
    if (!appointment.id) throw new Error("Nincs ID megadva a frissítéshez");
    const docRef = doc(this.firestore, `appointments/${appointment.id}`);
    const { id, ...data } = appointment;
    return updateDoc(docRef, data as any);
  }

  delete(id: string): Promise<void> {
    const docRef = doc(this.firestore, `appointments/${id}`);
    return deleteDoc(docRef);
  }

  async addAppointment(appointment: Appointment): Promise<void> {
    const appointmentsCollection = collection(this.firestore, 'appointments');

    const docRef = await addDoc(appointmentsCollection, appointment);
    await setDoc(docRef, { id: docRef.id }, { merge: true });
  }

  getAppointmentsByPatient(patientId: string): Observable<Appointment[]> {
    const q = query(
      collection(this.firestore, 'appointments'),
      where('patientId', '==', patientId),
      orderBy('date', 'asc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Appointment[]>;
  }
}
