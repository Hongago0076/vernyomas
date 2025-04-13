import {Component, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Measurement} from '../../models/measurement';
import {MeasurementsComponent} from '../measurements.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTimepickerModule} from '@angular/material/timepicker';



@Component({
  selector: 'app-measurement-form',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatTimepickerModule],
    templateUrl: './measurement-form.component.html',
  styleUrl: './measurement-form.component.css'
})
export class MeasurementFormComponent {
  @Output() measurementCreated = new EventEmitter<Measurement>();

  measurementForm: FormGroup;
  constructor(private fb: FormBuilder) {
    // A formGroup létrehozása
    this.measurementForm = this.fb.group({
      systolic: ['', [Validators.required, Validators.min(50), Validators.max(250)]],  // Szisztolés nyomás
      diastolic: ['', [Validators.required, Validators.min(30), Validators.max(200)]],  // Diasztolés nyomás
      pulse: ['', [Validators.required, Validators.min(40), Validators.max(210)]],  // Pulzus
      date: ['', Validators.required]  // Mérés dátuma
    });
  }

  onSubmit() {
    if (this.measurementForm.valid) {
      const newMeasurement: Measurement = {
        patientId: 0,
        systolic: this.measurementForm.value.systolic,
        diastolic: this.measurementForm.value.diastolic,
        pulse: this.measurementForm.value.pulse,
        date: this.measurementForm.value.date
      };
      this.measurementCreated.emit(newMeasurement); //  elküldi a szülőnek
      this.measurementForm.reset();
    }
  }
}
