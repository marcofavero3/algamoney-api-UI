import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../seguranca/auth.service'; // Certifique-se de que o caminho está correto
import { ErrorHandlerService } from './../error-handler.service'; // Certifique-se de que o caminho está correto

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
    // Captura o nome do usuário logado a partir do payload JWT
    this.usuarioLogado = this.auth.getJwtPayload()?.nome || 'Usuário';
  }

  // Verifica se o usuário tem permissão específica
  temPermissao(permissao: string): boolean {
    return this.auth.temPermissao(permissao);
  }

  // Função para fazer logout e redirecionar o usuário
  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigate(['/login']); // Redireciona para a página de login
      })
      .catch(erro => {
        this.errorHandler.handle(erro); // Lida com erros de logout
      });
  }
}
