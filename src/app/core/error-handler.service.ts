import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotAuthenticatedError } from '../seguranca/money-http-interceptor';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router) { }

  handle(errorResponse: any): void {
    let msg: string;

    // Verifica se o erro é uma string
    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    // Tratamento específico para erro de autenticação
    } else if (errorResponse instanceof NotAuthenticatedError) {
      console.log('Erro de autenticação: refresh token inválido.');

      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    // Tratamento para erros HTTP entre 400 e 499
    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = 'Ocorreu um erro ao processar a sua solicitação.';

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação.';
      }

      try {
        msg = errorResponse.error[0].mensagemUsuario || msg;
      } catch (e) {
        // Mantém a mensagem padrão
      }

      console.error('Erro HTTP 4xx:', errorResponse);

    // Tratamento para erros genéricos
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Erro no serviço remoto:', errorResponse);
    }

    // Exibe a mensagem de erro no PrimeNG MessageService
    this.messageService.add({ severity: 'error', detail: msg });
  }
}
