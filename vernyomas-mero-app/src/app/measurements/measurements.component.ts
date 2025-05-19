import {Component, OnInit} from '@angular/core';
import {MeasurementFormComponent} from './measurement-form/measurement-form.component';
import {Measurement} from '../models/measurement';
import {MeasurementListComponent} from './measurement-list/measurement-list.component';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MeasurementService} from '../services/measurement.service';


@Component({
  selector: 'app-measurements',
  imports: [MeasurementFormComponent, MeasurementListComponent],
  templateUrl: './measurements.component.html',
  styleUrl: './measurements.component.css'
})
export class MeasurementsComponent implements OnInit {
  measurements: Measurement[] = [];

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Az adatok betöltése a localStorage-ból, ha létezik
      const savedMeasurements = localStorage.getItem('measurements');
      if (savedMeasurements) {
        this.measurements = JSON.parse(savedMeasurements);
      }
    }
  }

  selectedPatientId = 'abc123';

  constructor(private measurementService: MeasurementService) {}

  addMeasurement(m: Measurement) {
    this.measurementService.addMeasurement(m).then(() => {
      console.log('Mérés hozzáadva');
    });
  }

  saveMeasurements() {
    // A measurements tömb mentése a localStorage-ba
    localStorage.setItem('measurements', JSON.stringify(this.measurements));
  }
}
