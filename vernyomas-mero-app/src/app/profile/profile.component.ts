import {Component, OnInit} from '@angular/core';
import {Patient} from '../models/patient.model';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent{
  patient: Patient = new Patient(
    'Gipsz Jakab',
    '1995-06-14',
    '123456789',
    'jakab.gipsz@gmail.com',
    '340782',
    '005771'
  );
}
