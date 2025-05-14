import {Component, Input, ViewChild} from '@angular/core';
import {Measurement} from '../../models/measurement';
import {CommonModule} from '@angular/common';
import {MatCell, MatHeaderCell, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSort} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {RelativeDatePipe} from '../../pipes/relative-date.pipe';

@Component({
  selector: 'app-measurement-list',
  imports: [CommonModule, MatTableModule, MatHeaderCell, MatCell, MatButtonModule, MatCardModule, MatIconModule, MatPaginatorModule, RelativeDatePipe],
  templateUrl: './measurement-list.component.html',
  styleUrl: './measurement-list.component.css'
})
export class MeasurementListComponent {
  @Input() measurements: Measurement[] = [];

  displayedColumns: string[] = ['icon', 'date', 'systolic', 'diastolic', 'pulse'];
  dataSource = new MatTableDataSource<Measurement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges() {
    this.dataSource.data = this.measurements;
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
