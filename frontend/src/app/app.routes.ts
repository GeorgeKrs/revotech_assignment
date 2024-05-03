import { Routes } from '@angular/router';
import { IslandShowComponent } from './components/island-show/island-show.component';
import { IslandIndexComponent } from './components/island-index/island-index.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { IslandEditComponent } from './components/island-edit/island-edit.component';

export const routes: Routes = [
  { path: '', component: IslandIndexComponent },
  { path: 'islands', component: IslandIndexComponent },
  { path: 'islands/:id', component: IslandShowComponent },
  { path: 'islands/:id/edit', component: IslandEditComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];
