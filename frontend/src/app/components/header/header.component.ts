import { Component } from '@angular/core';
import { IslandsService } from '../../services/islands.service';
import { Island } from '../../interfaces/island';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ApiResponse } from '../../interfaces/apiResponse';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchResults: Island[] | null = null;
  searchInput = new Subject<string>();

  constructor(
    private authService: AuthService,
    private islandsService: IslandsService
  ) {
    this.setupSearch();
  }

  handleSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target && target.value) {
      this.searchInput.next(target.value);
    }
  }

  handleLogin(): void {
    this.authService.login('admin', 'admin').subscribe({
      next: (response: ApiResponse) =>
        this.authService.setAuthData(response.data),
      error: (error) => {
        throw new Error('Error logging in', error);
      },
    });
  }

  handleLogout(): void {
    this.authService.logout().subscribe({
      next: (response: ApiResponse) => {
        this.authService.clearAuthData();

        if (window.location.href.endsWith('/edit')) {
          window.location.href = window.location.href.slice(0, -5);
        }
      },

      error: (error) => {
        throw new Error('Error logging out', error);
      },
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  setupSearch(): void {
    this.searchInput
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.islandsService.find(term))
      )
      .subscribe((response: ApiResponse) => {
        this.searchResults = response.data;
      });
  }

  redirectToIndex(): void {
    this.islandsService.redirectToIndex();
  }

  redirectToShow(id: string): void {
    this.searchResults = null;

    this.islandsService.redirectToShow(id);
  }

  redirectToLogin(): void {
    this.authService.redirectToLogin();
  }
}
