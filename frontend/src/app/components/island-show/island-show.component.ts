import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Island } from '../../interfaces/island';
import { IslandsService } from '../../services/islands.service';
import { GoogleService } from '../../services/google.service';
import { ApiResponse } from '../../interfaces/apiResponse';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-island-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './island-show.component.html',
  styleUrl: './island-show.component.css',
})
export class IslandShowComponent implements OnInit {
  island!: Island;
  loading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private islandsService: IslandsService,
    private authService: AuthService,
    private googleService: GoogleService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(() =>
          this.islandsService.get(this.route.snapshot.paramMap.get('id') ?? '')
        )
      )
      .subscribe({
        next: (response: ApiResponse) => {
          this.island = response.data;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;

          if (error.status === 404) {
            this.router.navigate(['/not-found']);
          }
        },
      });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  redirectToIndex(): void {
    this.islandsService.redirectToIndex();
  }

  redirectToEdit(): void {
    this.islandsService.redirectToEdit(this.island.objectId);
  }

  openGoogleMaps(): void {
    this.googleService.openInGoogleMaps(
      this.island.location[0],
      this.island.location[1]
    );
  }
}
