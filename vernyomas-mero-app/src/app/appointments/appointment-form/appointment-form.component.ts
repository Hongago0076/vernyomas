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
import {AppointmentService} from '../../services/appointment.service';
import {PatientService} from '../../services/patient.service';
import {AuthService} from '../../services/auth.service';
import {DoctorService} from '../../services/doctor.service';
import {map, switchMap, take} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {doc, docData, Firestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-appointment-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, CommonModule],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  @Output() appointmentCreated = new EventEmitter<Appointment>();

  appointmentForm: FormGroup;
  userid: any;
  doctorId: string = '';

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private authService: AuthService,
    private doctorService: DoctorService,
    private firestore: Firestore
  ) {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      place: ['', Validators.required],
      purpose: ['']
    });

  }

  ngOnInit() {
  }

  async onSubmit() {
    if (this.appointmentForm.valid) {
      try {
        const patient = await this.patientService.getCurrentPatient().pipe(take(1)).toPromise();
        const userId = patient?.id;
        if (!userId) {
          console.error('Patient ID nem található.');
          return;
        }

        const doctorId = await this.patientService.getDoctorIdOfPatient(userId).pipe(take(1)).toPromise();
        if (!doctorId) {
          console.error('Orvos azonosító nem megfelelő:', doctorId);
          return;
        }
        const formValue = this.appointmentForm.value;

        const newAppointment: Appointment = {
          id: '',                             // string (vagy optional)
          patientId: userId,                // string
          doctorId: doctorId,               // string
          date: formValue.date,
          place: formValue.place,           // string
          purpose: formValue.purpose        // string (vagy optional)
        };
        console.log('Új időpont:', formValue.date);
        await this.appointmentService.addAppointment(newAppointment);
        console.log('Időpont sikeresen létrehozva');
        this.appointmentForm.reset();

      } catch (error) {
        console.error('Hiba történt a foglalás során:', error);
      }
    }
  }

}
