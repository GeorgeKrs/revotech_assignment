import { Routes } from '@angular/router';
import { IslandShowComponent } from './components/island-show/island-show.component';

export const routes: Routes = [
  { path: 'islands/:id', component: IslandShowComponent },
];
