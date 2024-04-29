import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { IslandCardComponent } from './components/island-card/island-card.component';
import { CommonModule } from '@angular/common';
import { IslandsService } from './services/islands.service';
import { Island } from './interfaces/island';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, IslandCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  islands: Island[] = [];

  constructor(private islandsService: IslandsService) {}

  ngOnInit() {
    this.islandsService.fetchIslands().subscribe({
      next: (response: any) => {
        this.islands = response;
      },
      error: (err: any) => console.error('Error fetching islands:', err),
    });
  }
}
