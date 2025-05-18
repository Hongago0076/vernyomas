import {Component, ViewChild, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {RelativeDatePipe} from '../../pipes/relative-date.pipe';
import {Measurement} from '../../models/measurement';
import {MeasurementService} from '../../services/measurement.service';
import {PatientService} from '../../services/patient.service';
import {take, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-measurement-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    RelativeDatePipe,
  ],
  templateUrl: './measurement-list.component.html',
  styleUrl: './measurement-list.component.css'
})
export class MeasurementListComponent implements OnInit {
  dataSource = new MatTableDataSource<Measurement>();
  displayedColumns: string[] = ['icon', 'date', 'systolic', 'diastolic', 'pulse'];

  private measurementService = inject(MeasurementService);
  private patientService = inject(PatientService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.patientService.getCurrentPatient().pipe(
      take(1),
      switchMap(patient => {
        if (!patient?.id) return of([]);
        return this.measurementService.getMeasurementsByPatientId(patient.id);
      })
    ).subscribe(measurements => {
      this.dataSource.data = measurements;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getSystolicClass(value: number): string {
    if (value >= 90 && value <= 120) return 'good';
    if ((value >= 80 && value < 90) || (value > 120 && value <= 140)) return 'warning';
    return 'danger';
  }

  getDiastolicClass(value: number): string {
    if (value >= 60 && value <= 80) return 'good';
    if ((value >= 50 && value < 60) || (value > 80 && value <= 90)) return 'warning';
    return 'danger';
  }

  getPulseClass(value: number): string {
    if (value >= 60 && value <= 90) return 'good';
    if ((value >= 50 && value < 60) || (value > 90 && value <= 110)) return 'warning';
    return 'danger';
  }
}
