import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
  { path: '', component: HomePage },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'account',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/account/account.page').then((m) => m.AccountPage),
  },
  { path: '**', redirectTo: '' },
];
