// auth.service.ts
import { Injectable, inject, NgZone } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, authState, UserCredential} from '@angular/fire/auth';
import { Firestore, collection, setDoc, addDoc, doc } from '@angular/fire/firestore';
import { Patient } from '../models/patient.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {CollectionReference, DocumentData} from '@angular/fire/compat/firestore';
import {PatientService} from './patient.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser: Observable<User | null>;
  currentUserId = '';

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private patientService: PatientService
  ) {
    this.currentUser = authState(this.auth);
  }

  async register(patient: Patient): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      patient.email!,
      patient.password
    );

    const user = userCredential.user;
    const patientData: Omit<Patient, 'password'> & { uid: string; id: string } = {
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      tajNumber: patient.tajNumber,
      email: patient.email!,
      doctorId: patient.doctorId,
      uid: user.uid,
      id: ''
    };
    const patientsCollection = collection(this.firestore, 'patients');

    const docRef = await addDoc(patientsCollection, patientData);
    await setDoc(docRef, { id: docRef.id }, { merge: true });

  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
  getCurrentPatientId(): Observable<Patient | null> {
    return this.patientService.getCurrentPatient();
  }
}
