import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-patient-login',
  imports: [CommonModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatIconModule],
  templateUrl: './patient-login.component.html',
  styleUrl: './patient-login.component.css'
})
export class PatientLoginComponent {

  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async login() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    try {
      await this.authService.login(email!, password!);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Bejelentkezési hiba:', error);
    }
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
