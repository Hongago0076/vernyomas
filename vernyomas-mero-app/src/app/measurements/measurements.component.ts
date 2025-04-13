import {Component, OnInit} from '@angular/core';
import {MeasurementFormComponent} from './measurement-form/measurement-form.component';
import {Measurement} from '../models/measurement';
import {MeasurementListComponent} from './measurement-list/measurement-list.component';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';


@Component({
  selector: 'app-measurements',
  imports: [MeasurementFormComponent, MeasurementListComponent, MatCard, MatCardTitle, MatCardContent],
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

  addMeasurement(newMeasurement: Measurement) {
    this.measurements.push(newMeasurement);
    this.saveMeasurements();  // Adatok mentése
  }

  saveMeasurements() {
    // A measurements tömb mentése a localStorage-ba
    localStorage.setItem('measurements', JSON.stringify(this.measurements));
  }
}
