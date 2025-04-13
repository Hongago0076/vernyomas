import { Component } from '@angular/core';
import {Doctor} from '../models/doctor.model';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-doctor',
  imports: [CommonModule],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent {
  doctor: Doctor = new Doctor(
    'Dr. Kovács János',
    'drkov.jani@medi.hu',
    'Kardiológus',
    '340782');
}
