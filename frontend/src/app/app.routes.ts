import { Routes } from '@angular/router';
import { IslandShowComponent } from './components/island-show/island-show.component';
import { IslandIndexComponent } from './components/island-index/island-index.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { IslandEditComponent } from './components/island-edit/island-edit.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: IslandIndexComponent },
  { path: 'islands', component: IslandIndexComponent },
  { path: 'islands/:id', component: IslandShowComponent },
  {
    path: 'islands/:id/edit',
    component: IslandEditComponent,
    canActivate: [AuthGuard],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: '**', redirectTo: '/not-found' },
];
