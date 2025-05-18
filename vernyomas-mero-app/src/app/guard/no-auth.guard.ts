import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.currentUser.pipe(
    take(1),
    map(user => {
      if (!user) {
        // Ha nincs user, akkor mehet az adott oldal (pl. login vagy register)
        return true;
      }
      // Ha van user, akkor irányítsd át mondjuk a főoldalra (pl. '/')
      router.navigate(['/home']);
      return false;
    })
  );
};
