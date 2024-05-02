import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Island } from '../../interfaces/island';
import { IslandsService } from '../../services/islands.service';
import { GoogleService } from '../../services/google.service';
import { ApiResponse } from '../../interfaces/apiResponse';

@Component({
  selector: 'app-island-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './island-show.component.html',
  styleUrl: './island-show.component.css',
})
export class IslandShowComponent implements OnInit {
  islandId: string = '';
  island!: Island;
  loading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private islandsService: IslandsService,
    private googleService: GoogleService
  ) {}

  ngOnInit(): void {
    this.islandId = this.route.snapshot.paramMap.get('id') ?? '';

    this.islandsService.get(this.islandId).subscribe({
      next: (response: ApiResponse) => {
        if (response.status === 200) {
          this.island = response.data;
        }

        if (response.status === 404) {
          this.router.navigate(['/not-found']);
        }

        this.loading = false;
      },
      error: (err) => {
        throw new Error('Failed to fetch island details:', err);
      },
    });
  }

  goToIndex(): void {
    this.router.navigate(['/']);
  }

  openGoogleMaps(): void {
    this.googleService.openInGoogleMaps(
      this.island.location[0],
      this.island.location[1]
    );
  }
}
