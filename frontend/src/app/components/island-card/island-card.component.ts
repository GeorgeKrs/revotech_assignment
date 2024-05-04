import { Component, Input } from '@angular/core';
import { Island } from '../../interfaces/island';
import { CommonModule } from '@angular/common';
import { IslandsService } from '../../services/islands.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-island-card',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './island-card.component.html',
  styleUrl: './island-card.component.css',
})
export class IslandCardComponent {
  @Input() island!: Island;
  showModal: boolean = false;

  constructor(private islandsService: IslandsService) {}

  redirectToShow(): void {
    this.islandsService.redirectToShow(this.island.objectId);
  }

  openPreviewModal(): void {
    this.showModal = true;
  }

  closePreviewModal(): void {
    this.showModal = false;
  }
}
