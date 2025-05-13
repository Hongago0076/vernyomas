import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {Appointment} from '../../models/appointment';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {Measurement} from '../../models/measurement';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-appointment-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, CommonModule],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  @Output() appointmentCreated = new EventEmitter<Appointment>();

  appointmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // FormGroup létrehozása és inicializálása a szükséges validátorokkal
    this.appointmentForm = this.fb.group({
      patientId: ['', Validators.required],         // Beteg ID
      doctorId: ['', Validators.required],          // Orvos ID
      date: ['', Validators.required],               // Mérés időpontja (dátum)
      place: ['', Validators.required],              // Mérés helyszíne
      purpose: ['']                                 // Cél (nem kötelező)
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const newAppointment = new Appointment(
        this.appointmentForm.value.patientId,
        this.appointmentForm.value.doctorId,
        this.appointmentForm.value.date,
        this.appointmentForm.value.place,
        this.appointmentForm.value.purpose
      );
      this.appointmentCreated.emit(newAppointment); //  elküldi a szülőnek
      this.appointmentForm.reset();
    }
  }
}
