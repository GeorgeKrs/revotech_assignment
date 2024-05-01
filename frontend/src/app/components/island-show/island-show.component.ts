import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Island } from '../../interfaces/island';
import { IslandsService } from '../../services/islands.service';

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
    private route: ActivatedRoute,
    private islandsService: IslandsService
  ) {}

  ngOnInit(): void {
    this.islandId = this.route.snapshot.paramMap.get('id') ?? '';

    this.islandsService.get(this.islandId).subscribe({
      next: (data) => {
        this.island = data;
        this.loading = false;
      },
      error: (err) => {
        throw new Error('Failed to fetch island details:', err);
      },
    });
  }
}
