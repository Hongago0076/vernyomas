import { Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PatientLoginComponent} from './login-register/patient-login/patient-login.component';
import {PatientRegisterComponent} from './login-register/patient-register/patient-register.component';
import {authGuard} from './guard/auth.guard';
import {noAuthGuard} from './guard/no-auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login-register/patient-login/patient-login.component').then(m => PatientLoginComponent), canActivate: [noAuthGuard]},
  { path: 'register', loadComponent: () => import('./login-register/patient-register/patient-register.component').then(m => PatientRegisterComponent), canActivate: [noAuthGuard] },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => DashboardComponent),  canActivate: [authGuard] },
  { path: 'home', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard] },  // Főoldal alapértelmezett
  { path: 'measurements', loadComponent: () => import('./measurements/measurements.component').then(m => m.MeasurementsComponent), canActivate: [authGuard] },
  { path: 'appointments', loadComponent: () => import('./appointments/appointments.component').then(m => m.AppointmentsComponent), canActivate: [authGuard] },
  { path: 'doctor', loadComponent: () => import('./doctor/doctor.component').then(m => m.DoctorComponent), canActivate: [authGuard] },
  { path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent), canActivate: [authGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full'  },
];
