import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MeasurementsComponent } from './measurements/measurements.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent} from './menu/menu.component';
import {Observable} from 'rxjs';
import {User} from '@angular/fire/auth';
import {AuthService} from './services/auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MeasurementsComponent, AppointmentsComponent, DoctorComponent, ProfileComponent, DashboardComponent, MenuComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vernyomas-mero-app';

  page = 'home'; // Alapértelmezett oldal
  currentUser$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser;
  }
}
