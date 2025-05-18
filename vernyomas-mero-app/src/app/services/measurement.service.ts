import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  docData, query, where, orderBy, limit, setDoc
} from '@angular/fire/firestore';
import {map, Observable, of} from 'rxjs';
import { Measurement } from '../models/measurement';
import {Patient} from '../models/patient.model';
import {AuthService} from './auth.service';
import {switchMap, take} from 'rxjs/operators';
import {PatientService} from './patient.service';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private collectionRef;

  constructor(private firestore: Firestore, private authService: AuthService, private patientService: PatientService) {
    this.collectionRef = collection(this.firestore, 'measurements');
  }
  getAll(): Observable<Measurement[]> {
    return collectionData(this.collectionRef, { idField: 'id' }) as Observable<Measurement[]>;
  }

  getById(id: string): Observable<Measurement> {
    const docRef = doc(this.firestore, 'measurements', id);
    return docData(docRef, { idField: 'id' }) as Observable<Measurement>;
  }

  async addMeasurement(measurement: Measurement): Promise<void> {
    const measurementsCollection = collection(this.firestore, 'measurements');

    const docRef = await addDoc(measurementsCollection, measurement);
    await setDoc(docRef, { id: docRef.id }, { merge: true });
  }

  getLatestMeasurementForPatient(patientId: string): Observable<Measurement | null> {
    const q = query(
      this.collectionRef,
      where('patientId', '==', patientId),
      where('id', '!=', ''), // Csak a teljesen mentett mérések
      orderBy('date', 'desc'),
      limit(1)
    );

    return collectionData(q, { idField: 'id' }).pipe(
      map(measurements => {
        if (!measurements.length) return null;
        const data = measurements[0];
        return {
          id: data['id'],
          patientId: data['patientId'],
          systolic: data['systolic'],
          diastolic: data['diastolic'],
          pulse: data['pulse'],
          date: data['date']
        } as Measurement;
      })
    );
  }
  update(measurement: Measurement): Promise<void> {
    if (!measurement.id) throw new Error("Nincs ID megadva a frissítéshez");
    const docRef = doc(this.firestore, `measurements/${measurement.id}`);
    const { id, ...data } = measurement;
    return updateDoc(docRef, data);
  }

  delete(id: string): Promise<void> {
    const docRef = doc(this.firestore, `measurements/${id}`);
    return deleteDoc(docRef);
  }
  getMeasurementsByPatientId(patientId: string): Observable<any[]> {

    const measurementsCollection = collection(this.firestore, 'measurements');
    const q = query(
      measurementsCollection,
      where('patientId', '==', patientId),
      orderBy('date', 'desc')
    );

    return collectionData(q, { idField: 'id' }).pipe(
      map(measurements => measurements.map(m => {
        if (m['date']?.toDate) {
          m['date'] = m['date'].toDate();
        }
        console.log(m);
        return m;
      }))
    );
  }

}
