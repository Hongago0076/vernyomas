import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MeasurementsComponent } from './measurements/measurements.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent} from './menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MeasurementsComponent, AppointmentsComponent, DoctorComponent, ProfileComponent, DashboardComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vernyomas-mero-app';

  page = 'home'; // Alapértelmezett oldal
}
