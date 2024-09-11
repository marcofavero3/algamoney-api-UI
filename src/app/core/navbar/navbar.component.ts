import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../seguranca/auth.service'; // Verifique o caminho correto
import { ErrorHandlerService } from './../error-handler.service'; // Verifique o caminho correto

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu: boolean = false;
  usuarioLogado: string = '';

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    // Aqui capturamos o nome do usuário logado a partir do getter público do jwtPayload
    this.usuarioLogado = this.auth.getJwtPayload()?.nome || 'Usuário';
  }

  temPermissao(permissao: string): boolean {
    // Verifica se o usuário tem a permissão necessária
    return this.auth.temPermissao(permissao);
  }

  logout() {
    this.auth.logout()
      .then(() => {
        // Redireciona o usuário para a página de login após o logout
        this.router.navigate(['/login']);
      })
      .catch(erro => {
        // Tratamento de erro utilizando o serviço de tratamento de erros
        this.errorHandler.handle(erro);
      });
  }
}
