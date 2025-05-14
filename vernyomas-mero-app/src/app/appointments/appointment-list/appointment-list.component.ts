import {Component, Input, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-appointment-list',
  imports: [MatTableModule, MatCell, MatHeaderCell, MatHeaderRow, MatRow, CommonModule, MatCardModule, MatIconModule, MatPaginatorModule, RelativeDatePipe, IsPastPipe],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent {
  private _appointments: Appointment[] = [];

  @Input() set appointments(value: Appointment[]) {
    this._appointments = value;
    this.dataSource.data = value;
  }

  get appointments(): Appointment[] {
    return this._appointments;
  }

  displayedColumns: string[] = ['date', 'place', 'purpose', 'patientId', 'doctorId'];
  dataSource = new MatTableDataSource<Appointment>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Funkció, amely meghatározza, hogy a dátum a múltban van-e
}
