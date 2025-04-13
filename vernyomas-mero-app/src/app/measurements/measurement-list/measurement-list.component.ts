import {Component, Input} from '@angular/core';
import {Measurement} from '../../models/measurement';
import {CommonModule} from '@angular/common';
import {MatCell, MatHeaderCell, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {BloodPressureStatusDirective} from '../../directives/blood-pressure-status.directive';

@Component({
  selector: 'app-measurement-list',
  imports: [CommonModule, MatTableModule, MatHeaderCell, MatCell, MatButtonModule, BloodPressureStatusDirective],
  templateUrl: './measurement-list.component.html',
  styleUrl: './measurement-list.component.css'
})
export class MeasurementListComponent {
  @Input() measurements: Measurement[] = [];

  displayedColumns: string[] = ['date', 'systolic', 'diastolic', 'pulse'];

}
