import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { collection, collectionData, doc, docData, Firestore, query, where, orderBy, limit } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { map, switchMap, take } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { MeasurementService } from '../services/measurement.service';
import { AppointmentListComponent } from '../appointments/appointment-list/appointment-list.component';
import { AppointmentService } from '../services/appointment.service';
import { DoctorService } from '../services/doctor.service';
import { Patient } from '../models/patient.model';
import { PatientService } from '../services/patient.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [MatToolbarModule, MatSidenavModule, MatInputModule, MatCardModule, CommonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  lastMeasurement: any;
  nextAppointment: any;
  doctor: any;
  dailyTip: string = '';
  currentPatient: Patient | null = null;

  tips: string[] = [
    'Igyon meg napi legalább 2 liter vizet!',
    'Kerülje a sóban gazdag ételeket!',
    'Mozogjon napi 30 percet!',
    'Aludjon legalább 7-8 órát!',
  ];

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private authService: AuthService,
    private measurementService: MeasurementService,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.getRandomTip();
    this.loadPatientData();
  }

  getRandomTip(): void {
    const randomIndex = Math.floor(Math.random() * this.tips.length);
    this.dailyTip = this.tips[randomIndex];
  }

  loadPatientData(): void {
    this.patientService.getCurrentPatient().pipe(
      switchMap(patient => {
        this.currentPatient = patient;
        if (!patient?.id) return of(null);
        return this.patientService.getLastMeasurementForPatient(patient.id);
      })
    ).subscribe(lastMeasurement => {
      this.lastMeasurement = lastMeasurement;
      console.log('Utolsó mérés:', this.lastMeasurement);
    });
  }
}
