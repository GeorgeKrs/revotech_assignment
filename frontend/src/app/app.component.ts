import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { IslandCardComponent } from './components/island-card/island-card.component';
import { CommonModule } from '@angular/common';
import { IslandsService } from './services/islands.service';
import { Island } from './interfaces/island';
import { IslandShowComponent } from './components/island-show/island-show.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    IslandCardComponent,
    IslandShowComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  islands: Island[] = [];
  singleIsland: Island | null = null;

  constructor(private islandsService: IslandsService) {}

  ngOnInit() {
    this.islandsService.find().subscribe({
      next: (response: any) => {
        this.islands = response;
      },
      error: (err: any) => console.error('Error fetching islands:', err),
    });
  }
}
