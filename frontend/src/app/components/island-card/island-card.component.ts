import { Component, Input } from '@angular/core';
import { Island } from '../../interfaces/island';
import { CommonModule } from '@angular/common';
import { IslandsService } from '../../services/islands.service';

@Component({
  selector: 'app-island-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './island-card.component.html',
  styleUrl: './island-card.component.css',
})
export class IslandCardComponent {
  @Input() island!: Island;

  constructor(private islandsService: IslandsService) {}

  redirectToShow(): void {
    this.islandsService.redirectToShow(this.island.objectId);
  }
}
