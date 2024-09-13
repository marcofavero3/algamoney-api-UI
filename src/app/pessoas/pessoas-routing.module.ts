import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { authGuard } from './../seguranca/auth.guard';  // Certifique-se de que o AuthGuard está corretamente implementado
import { PessoaCadastroComponent } from "./pessoa-cadastro/pessoa-cadastro.component";
import { PessoasPesquisaComponent } from "./pessoas-pesquisa/pessoas-pesquisa.component";

const routes: Routes = [
  {
    path: 'pessoas',
    component: PessoasPesquisaComponent,
    canActivate: [authGuard],  // Usando o authGuard para proteger a rota
    data: { roles: ['ROLE_PESQUISAR_PESSOA'] }  // Definindo as permissões necessárias
  },
  {
    path: 'pessoas/nova',
    component: PessoaCadastroComponent,
    canActivate: [authGuard],  // Protegendo a rota com o authGuard
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }  // Definindo as permissões para cadastro
  },
  {
    path: 'pessoas/:codigo',
    component: PessoaCadastroComponent,
    canActivate: [authGuard],  // Protegendo a rota com o authGuard
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }  // Definindo permissões para edição de pessoa
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)  // Importando o módulo de rotas filho
  ],
  exports: [RouterModule]  // Exportando o módulo de rotas para uso em outros módulos
})
export class PessoasRoutingModule { }
