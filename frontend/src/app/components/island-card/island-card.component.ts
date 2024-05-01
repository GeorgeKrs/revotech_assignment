import { Component, Input } from '@angular/core';
import { Island } from '../../interfaces/island';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-island-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './island-card.component.html',
  styleUrl: './island-card.component.css',
})
export class IslandCardComponent {
  @Input() island!: Island;
  @Input() loading: boolean = true;

  constructor(private router: Router) {}

  goToIsland(id: string): void {
    this.router.navigate(['/islands', id]);
  }
}
