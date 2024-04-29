import { Component, Input } from '@angular/core';
import { Island } from '../../interfaces/island';

@Component({
  selector: 'app-island-show',
  standalone: true,
  imports: [],
  templateUrl: './island-show.component.html',
  styleUrl: './island-show.component.css',
})
export class IslandShowComponent {
  @Input() island!: Island;
}
