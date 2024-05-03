import { Component } from '@angular/core';
import { IslandsService } from '../../services/islands.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  constructor(private islandsService: IslandsService) {}

  redirectToIndex(): void {
    this.islandsService.redirectToIndex();
  }
}
