import {Component, inject, OnInit} from '@angular/core';
import {Patient} from '../models/patient.model';
import {CommonModule} from '@angular/common';
import {switchMap, take} from 'rxjs/operators';
import {DoctorService} from '../services/doctor.service';
import {PatientService} from '../services/patient.service';
import {of} from 'rxjs';
import {RelativeDatePipe} from '../pipes/relative-date.pipe';


@Component({
  selector: 'app-profile',
  imports: [CommonModule, RelativeDatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  patient: Patient | null = null;
  doctorName: string | null = null;

  private patientService = inject(PatientService);
  private doctorService = inject(DoctorService);

  ngOnInit(): void {
    this.patientService.getCurrentPatient().pipe(
      take(1),
      switchMap(patient => {
        this.patient = patient;
        if (patient?.doctorId) {
          return this.doctorService.getById(patient.doctorId);
        }
        return of(null);
      })
    ).subscribe(doctor => {
      this.doctorName = doctor?.name ?? null;
    });
  }
}
