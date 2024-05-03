import { Component, OnInit } from '@angular/core';
import { IslandsService } from '../../services/islands.service';
import { Island } from '../../interfaces/island';
import { CommonModule } from '@angular/common';
import { IslandCardComponent } from '../island-card/island-card.component';
import { ApiResponse } from '../../interfaces/apiResponse';

@Component({
  selector: 'app-island-index',
  standalone: true,
  imports: [CommonModule, IslandCardComponent],
  templateUrl: './island-index.component.html',
  styleUrl: './island-index.component.css',
})
export class IslandIndexComponent implements OnInit {
  islands: Island[] = [];
  loading: boolean = true;
  numberOfSkeletonCards: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

  constructor(private islandsService: IslandsService) {}

  ngOnInit() {
    this.islandsService.find().subscribe({
      next: (response: ApiResponse) => {
        this.islands = response.data;
        this.loading = false;
      },
      error: (err) => {
        throw new Error('Failed to fetch islands: ', err);
      },
    });
  }
}
