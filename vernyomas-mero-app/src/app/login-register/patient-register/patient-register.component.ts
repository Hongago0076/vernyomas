import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Patient } from '../../models/patient.model';
import { Doctor } from '../../models/doctor.model';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import {AuthService} from '../../services/auth.service';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css'],
  imports: [CommonModule, MatFormFieldModule, MatDatepickerModule, ReactiveFormsModule, MatOptionModule, MatNativeDateModule, MatSelectModule, MatInputModule, MatIconModule],
})
export class PatientRegisterComponent {
  registerForm!: FormGroup;

  doctors: Doctor[] = [];

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      tajNumber: ['', Validators.required],
      doctorId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private doctorService: DoctorService
  ) {
    this.doctorService.getAll().subscribe(doctors => this.doctors = doctors);
  }

  onSubmit() {
    this.register();
  }

  async register() {
    if (this.registerForm.invalid) return;

    const formValue = this.registerForm.value;
    const patient = new Patient(
      formValue.name!,
      formValue.dateOfBirth!,
      formValue.tajNumber!,
      formValue.password!,
      formValue.email!,
      formValue.doctorId!
    );

    try {
      await this.authService.register(patient);
      this.router.navigate(['/dashboard']);
    } catch (err) {
      console.error('Hiba a regisztrációnál:', err);
    }
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
