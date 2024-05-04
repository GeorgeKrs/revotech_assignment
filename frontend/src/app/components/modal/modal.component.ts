import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Island } from '../../interfaces/island';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() island!: Island;
  @Input() show: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  close() {
    this.closeModal.emit();
  }
}
