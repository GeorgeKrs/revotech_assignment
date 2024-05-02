import { Routes } from '@angular/router';
import { IslandShowComponent } from './components/island-show/island-show.component';
import { IslandIndexComponent } from './components/island-index/island-index.component';

export const routes: Routes = [
  { path: '', component: IslandIndexComponent },
  { path: 'islands', component: IslandIndexComponent },
  { path: 'islands/:id', component: IslandShowComponent },
];
