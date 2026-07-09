import { Routes } from '@angular/router';
import { authGuard, agentGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'connexion',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'mot-de-passe-oublie',
    loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'opposition',
    loadComponent: () => import('./features/public/opposition/opposition.component').then(m => m.OppositionComponent)
  },
  {
    path: 'adhesion',
    loadComponent: () => import('./features/public/adhesion/adhesion.component').then(m => m.AdhesionComponent)
  },
  {
    path: 'rendez-vous',
    loadComponent: () => import('./features/public/rendez-vous/rendez-vous.component').then(m => m.RendezVousComponent)
  },
  {
    path: 'agences',
    loadComponent: () => import('./features/public/agences/agences.component').then(m => m.AgencesComponent)
  },
  {
    path: 'aide',
    loadComponent: () => import('./features/public/aide/aide.component').then(m => m.AideComponent)
  },
  {
    path: 'legal/:slug',
    loadComponent: () => import('./features/public/legal/legal.component').then(m => m.LegalComponent)
  },
  {
    path: 'espace-membre',
    canActivate: [authGuard],
    loadComponent: () => import('./features/portal/layout/portal-layout.component').then(m => m.PortalLayoutComponent),
    children: [
      { path: '', redirectTo: 'tableau-de-bord', pathMatch: 'full' },
      {
        path: 'tableau-de-bord',
        loadComponent: () => import('./features/portal/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'comptes',
        loadComponent: () => import('./features/portal/comptes/comptes.component').then(m => m.ComptesComponent)
      },
      {
        path: 'credits',
        loadComponent: () => import('./features/portal/credits/credits.component').then(m => m.CreditsComponent)
      },
      {
        path: 'parts-sociales',
        loadComponent: () => import('./features/portal/parts-sociales/parts-sociales.component').then(m => m.PartsSocialesComponent)
      },
      {
        path: 'profil',
        loadComponent: () => import('./features/portal/profil/profil.component').then(m => m.ProfilComponent)
      }
    ]
  },
  {
    path: 'back-office',
    canActivate: [authGuard, agentGuard],
    loadComponent: () => import('./features/backoffice/layout/backoffice-layout.component').then(m => m.BackofficeLayoutComponent),
    children: [
      { path: '', redirectTo: 'membres', pathMatch: 'full' },
      {
        path: 'membres',
        loadComponent: () => import('./features/backoffice/membres/membres.component').then(m => m.MembresComponent)
      },
      {
        path: 'membres/:id',
        loadComponent: () => import('./features/backoffice/fiche-membre/fiche-membre.component').then(m => m.FicheMembreComponent)
      }
    ]
  },
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  { path: '**', redirectTo: '' }
];
