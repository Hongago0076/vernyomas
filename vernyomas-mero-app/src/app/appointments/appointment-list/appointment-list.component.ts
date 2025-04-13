import {Component, Input} from '@angular/core';
import {Measurement} from '../../models/measurement';
import {Appointment} from '../../models/appointment';
import {MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  imports: [MatTableModule, MatCell, MatHeaderCell, MatHeaderRow, MatRow, CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent {
  @Input() appointments: Appointment[] = [];

  displayedColumns: string[] = ['date', 'place', 'purpose', 'patientId', 'doctorId'];

}
