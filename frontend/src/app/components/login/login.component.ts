import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ApiResponse } from '../../interfaces/apiResponse';
import { IslandsService } from '../../services/islands.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;

  errorMessage: string | null = null;
  timeoutDurationInMs = 5000;
  timeLeft = this.timeoutDurationInMs;
  timeDecreaseInMs = 50;
  intervalId: any;

  constructor(
    private authService: AuthService,
    private islandService: IslandsService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit(): void {
    if (this.loginForm.valid) {
      this.loading = true;

      this.authService
        .login(
          this.loginForm.get('username')!.value,
          this.loginForm.get('password')!.value
        )
        .subscribe({
          next: (response: ApiResponse) => {
            this.authService.setAuthData(response.data);
            this.islandService.redirectToIndex();
          },
          error: (response) => {
            this.loading = false;
            this.triggerAutoClearErrorMessage();
            this.errorMessage = response.error.message;
          },
        });
    }
  }

  formIsValid(): boolean {
    return this.loginForm.valid;
  }

  triggerAutoClearErrorMessage() {
    this.timeLeft = this.timeoutDurationInMs;
    this.intervalId = setInterval(() => {
      this.timeLeft -= this.timeDecreaseInMs;
      if (this.timeLeft <= 0) {
        this.clearErrorMessage();
      }
    }, this.timeDecreaseInMs);
  }

  clearErrorMessage() {
    this.errorMessage = null;
    clearInterval(this.intervalId);
  }
}
