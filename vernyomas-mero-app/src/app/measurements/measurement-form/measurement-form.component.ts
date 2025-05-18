import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Measurement } from '../../models/measurement';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MeasurementService } from '../../services/measurement.service';
import { AuthService } from '../../services/auth.service';
import { PatientService } from '../../services/patient.service';
import { switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-measurement-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTimepickerModule
  ],
  templateUrl: './measurement-form.component.html',
  styleUrls: ['./measurement-form.component.css']
})
export class MeasurementFormComponent implements OnInit {
  @Input() patientId: string = '';  // Opcionális, ha manuálisan is akarod beállítani
  @Output() measurementCreated = new EventEmitter<Measurement>();
  userid: string = '';

  measurementForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private measurementService: MeasurementService,
    private authService: AuthService,
    private patientService: PatientService,
    private router: Router
  ) {
    this.measurementForm = this.fb.group({
      systolic: ['', [Validators.required, Validators.min(50), Validators.max(250)]],
      diastolic: ['', [Validators.required, Validators.min(30), Validators.max(200)]],
      pulse: ['', [Validators.required, Validators.min(40), Validators.max(210)]],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Automatikusan betöltjük a patientId-t, ha nincs megadva
    if (!this.userid) {
      this.loadCurrentPatientId();
    }
  }

  private loadCurrentPatientId(): void {
    this.authService.currentUser.pipe(
      take(1),
      switchMap(user => {
        if (!user) return of(null);
        return this.patientService.getCurrentPatient();
      })
    ).subscribe(patient => {
      if (patient?.id) {
        this.userid = patient.id;
      }
    });
  }

  async onSubmit() {
    this.loadCurrentPatientId();
    if (this.measurementForm.valid && this.userid) {
      try {
        const newMeasurement: Measurement = {
          id: '',
          patientId: this.userid,
          systolic: this.measurementForm.value.systolic,
          diastolic: this.measurementForm.value.diastolic,
          pulse: this.measurementForm.value.pulse,
          date: this.measurementForm.value.date,
        };

        await this.measurementService.addMeasurement(newMeasurement);
        console.log('Mérés sikeresen mentve:', newMeasurement);
        this.measurementForm.reset();
      } catch (error) {
        console.error('Hiba történt a mentés során:', error);
      }
    }
  }
}
