import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// Desativar a segurança temporariamente
export const authGuard: CanActivateFn = () => true;

// Para reativar a segurança, utilize o código abaixo, descomentando e removendo a linha acima
/*
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);  // Injeção de dependência
  const router = inject(Router);  // Injeção de dependência

  if (auth.isAccessTokenInvalido()) {
    console.log('Navegação com access token inválido. Obtendo novo token...');

    return auth.obterNovoAccessToken().then(() => {
      if (auth.isAccessTokenInvalido()) {
        router.navigate(['/login']);
        return false;
      }
      return podeAcessarRota(route.data['roles']);
    });
  }

  return podeAcessarRota(route.data['roles']);
};

const podeAcessarRota = (roles: string[]): boolean => {
  const auth = inject(AuthService);

  if (roles && !auth.temQualquerPermissao(roles)) {
    const router = inject(Router);
    router.navigate(['/nao-autorizado']);
    return false;
  }

  return true;
};
*/
