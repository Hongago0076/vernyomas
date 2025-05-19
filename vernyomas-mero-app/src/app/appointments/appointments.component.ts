import { Component } from '@angular/core';
import {AppointmentFormComponent} from './appointment-form/appointment-form.component';
import {Measurement} from '../models/measurement';
import {Appointment} from '../models/appointment';
import {AppointmentListComponent} from './appointment-list/appointment-list.component';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-appointments',
  imports: [AppointmentFormComponent, AppointmentListComponent, CommonModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  appointments: Appointment[] = [];

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Az adatok betöltése a localStorage-ból, ha létezik
      const savedAppointments = localStorage.getItem('appointments');
      if (savedAppointments) {
        this.appointments = JSON.parse(savedAppointments);
      }
    }
  }

  addAppointment(newAppointment: Appointment) {
    this.appointments.push(newAppointment);
    this.saveAppointment();  // Adatok mentése
  }

  saveAppointment() {
    // A measurements tömb mentése a localStorage-ba
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
