import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  if (auth.isAuthenticated()) return true;
  inject(Router).navigate(['/connexion']);
  return false;
};

export const agentGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  if (auth.isAgent()) return true;
  inject(Router).navigate(['/espace-membre']);
  return false;
};
