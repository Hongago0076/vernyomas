import {Component, inject, Input, ViewChild} from '@angular/core';
import {Measurement} from '../../models/measurement';
import {Appointment} from '../../models/appointment';
import {MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {RelativeDatePipe} from '../../pipes/relative-date.pipe';
import {IsPastPipe} from '../../pipes/is-past.pipe';
import {PatientService} from '../../services/patient.service';
import {AppointmentService} from '../../services/appointment.service';
import {switchMap, take} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-appointment-list',
  imports: [MatTableModule, MatCell, MatHeaderCell, MatHeaderRow, MatRow, CommonModule, MatCardModule, MatIconModule, MatPaginatorModule, RelativeDatePipe, IsPastPipe],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent {
  dataSource = new MatTableDataSource<Appointment>();
  displayedColumns: string[] = ['date', 'place', 'purpose'];

  private appointmentService = inject(AppointmentService);
  private patientService = inject(PatientService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.patientService.getCurrentPatient().pipe(
      take(1),
      switchMap(patient => {
        if (!patient?.id) return of([]);
        return this.appointmentService.getAppointmentsByPatient(patient.id);
      })
    ).subscribe(appointments => {
      this.dataSource.data = appointments;
      console.log(appointments);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
