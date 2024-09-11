import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '../seguranca/auth.guard'; // Certifique-se de que o AuthGuard está implementado corretamente
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

const routes: Routes = [
  {
    path: 'lancamentos',
    component: LancamentosPesquisaComponent,
    canActivate: [authGuard],  // Protegendo a rota com AuthGuard
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }  // Requer permissão para pesquisar lançamentos
  },
  {
    path: 'lancamentos/novo',
    component: LancamentoCadastroComponent,
    canActivate: [authGuard],  // Protegendo a rota com AuthGuard
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }  // Requer permissão para cadastrar lançamentos
  },
  {
    path: 'lancamentos/:codigo',
    component: LancamentoCadastroComponent,
    canActivate: [authGuard],  // Protegendo a rota com AuthGuard
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }  // Requer permissão para editar lançamentos
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
