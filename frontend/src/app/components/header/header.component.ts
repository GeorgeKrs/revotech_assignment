import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IslandsService } from '../../services/islands.service';
import { Island } from '../../interfaces/island';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ApiResponse } from '../../interfaces/apiResponse';

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

  constructor(private router: Router, private islandsService: IslandsService) {
    this.setupSearch();
  }

  handleSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target && target.value) {
      this.searchInput.next(target.value);
    }
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

  goToIndex(): void {
    this.router.navigate(['/']);
  }

  goToIsland(id: string): void {
    this.searchResults = null;

    this.router.navigate(['/islands', id]);
  }
}
