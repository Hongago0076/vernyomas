import { Routes } from '@angular/router';

export const routes: Routes = [
  { path:'', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path:'home', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },  // Főoldal alapértelmezett
  { path: 'measurements', loadComponent: () => import('./measurements/measurements.component').then(m => m.MeasurementsComponent) },
  { path: 'appointments', loadComponent: () => import('./appointments/appointments.component').then(m => m.AppointmentsComponent) },
  { path: 'doctor', loadComponent: () => import('./doctor/doctor.component').then(m => m.DoctorComponent) },
  { path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
];
