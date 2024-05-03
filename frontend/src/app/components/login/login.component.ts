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
          error: (error) => {
            this.loading = false;
            console.log(error);
          },
        });
    }
  }

  formIsValid(): boolean {
    return this.loginForm.valid;
  }
}
