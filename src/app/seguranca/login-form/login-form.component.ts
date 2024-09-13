import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  // Função para realizar o login e resetar o formulário após sucesso
  login(usuario: string, senha: string, form: NgForm) {
    this.auth.login(usuario, senha)
      .then(() => {
        // Redireciona para a rota de lançamentos após o login
        this.router.navigate(['/lancamentos']);
        form.reset();  // Reseta o formulário após login bem-sucedido
      })
      .catch(erro => {
        this.errorHandler.handle(erro);  // Lida com erros de login
      });
  }
}
