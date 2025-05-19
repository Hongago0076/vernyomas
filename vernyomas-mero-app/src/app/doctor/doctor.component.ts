import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor.model';
import { CommonModule } from '@angular/common';
import { PatientService } from '../services/patient.service';
import { DoctorService } from '../services/doctor.service';
import { Patient } from '../models/patient.model';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit {
  doctor: Doctor | null = null;
  loading = true;

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.patientService.getCurrentPatient().subscribe(patient => {
      if (patient && patient.doctorId) {
        this.doctorService.getById(patient.doctorId).subscribe(doctor => {
          this.doctor = doctor;
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    });
  }
}
