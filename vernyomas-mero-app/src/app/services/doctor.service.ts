import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  docData
} from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  collectionRef;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'doctors');
  }


  getAll(): Observable<Doctor[]> {
    return collectionData(this.collectionRef, { idField: 'id' }) as Observable<Doctor[]>;
  }

  add(doctor: Doctor): Promise<void> {
    const { id, ...data } = doctor;
    return addDoc(this.collectionRef, data as any).then(() => {});
  }

  update(doctor: Doctor): Promise<void> {
    if (!doctor.id) throw new Error("Nincs ID megadva a frissítéshez");
    const docRef = doc(this.firestore, `doctors/${doctor.id}`);
    const { id, ...data } = doctor;
    return updateDoc(docRef, data as any);
  }

  delete(id: string): Promise<void> {
    const docRef = doc(this.firestore, `doctors/${id}`);
    return deleteDoc(docRef);
  }
  getAllDoctors(): Observable<Doctor[]> {
    const ref = collection(this.firestore, 'doctors');
    return collectionData(ref, { idField: 'id' }) as Observable<Doctor[]>;
  }

}
