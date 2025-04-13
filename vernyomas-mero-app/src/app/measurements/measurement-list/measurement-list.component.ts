import {Component, Input} from '@angular/core';
import {Measurement} from '../../models/measurement';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-measurement-list',
  imports: [CommonModule],
  templateUrl: './measurement-list.component.html',
  styleUrl: './measurement-list.component.css'
})
export class MeasurementListComponent {
  @Input() measurements: Measurement[] = [];

}
