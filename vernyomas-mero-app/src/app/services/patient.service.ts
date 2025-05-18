import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  docData, getDocs, query, where
} from '@angular/fire/firestore';
import {map, Observable, of} from 'rxjs';
import { Patient } from '../models/patient.model';
import {Auth, authState} from '@angular/fire/auth';
import {switchMap, take} from 'rxjs/operators';
import {limit, orderBy} from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  collectionRef;

  constructor(private firestore: Firestore, private auth: Auth) {
    this.collectionRef = collection(this.firestore, 'patients');
  }


  async addPatient(patient: Patient): Promise<string> {
    const ref = collection(this.firestore, 'patients');
    const docRef = await addDoc(ref, { ...patient, id: '' }); // ideiglenes
    return docRef.id;
  }

  async updatePatientId(docId: string) {
    const ref = doc(this.firestore, 'patients', docId);
    await updateDoc(ref, { id: docId });
  }

  getAll(): Observable<Patient[]> {
    return collectionData(this.collectionRef, { idField: 'id' }) as Observable<Patient[]>;
  }

  add(patient: Patient): Promise<void> {
    const { id, ...data } = patient;
    return addDoc(this.collectionRef, data as any).then(() => {});
  }

  update(patient: Patient): Promise<void> {
    if (!patient.id) throw new Error("Nincs ID megadva a frissítéshez");
    const docRef = doc(this.firestore, `patients/${patient.id}`);
    const { id, ...data } = patient;
    return updateDoc(docRef, data as any);
  }

  delete(id: string): Promise<void> {
    const docRef = doc(this.firestore, `patients/${id}`);
    return deleteDoc(docRef);
  }
  getCurrentPatient(): Observable<Patient | null> {
    return authState(this.auth).pipe(
      take(1),
      switchMap(user => {
        if (!user) return of(null);

        const patientsCollection = collection(this.firestore, 'patients');
        const q = query(patientsCollection, where('uid', '==', user.uid));

        return collectionData(q, { idField: 'id' }).pipe(
          map(patients => patients.length > 0 ? patients[0] as Patient : null)
        );
      })
    );
  }

  // Utolsó mérés lekérése a beteghez
  getLastMeasurementForPatient(patientId: string): Observable<any | null> {
    if (!patientId) return of(null);

    const measurementsCollection = collection(this.firestore, 'measurements');
    const q = query(
      measurementsCollection,
      where('patientId', '==', patientId),
      orderBy('date', 'desc'),
      limit(1)
    );

    return collectionData(q, { idField: 'id' }).pipe(
      map(measurements => {
        if (measurements.length > 0) {
          const measurement = measurements[0];
          // Konvertálás Timestamp -> Date
          if (measurement['date']?.toDate) {
            measurement['date'] = measurement['date'].toDate();
          }
          return measurement;
        }
        return null;
      })
    );
  }

  // Összes mérés lekérése dátum szerint rendezve
  getAllMeasurementsForPatient(patientId: string): Observable<any[]> {
    if (!patientId) return of([]);

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
  getDoctorIdOfPatient(userId: string): Observable<string> {
    const patientDocRef = doc(this.firestore, 'patients', userId);
    return docData(patientDocRef).pipe(
      map((patient: any) => patient.doctorId as string)
    );
  }
}
