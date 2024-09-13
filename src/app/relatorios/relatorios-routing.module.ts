import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../seguranca/auth.guard';  // Certifique-se de que o AuthGuard está corretamente implementado
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';  // Certifique-se de que o componente existe

const routes: Routes = [
  {
    path: 'lancamentos',
    component: RelatorioLancamentosComponent,
    canActivate: [authGuard],  // Proteção da rota usando AuthGuard
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }  // Requer a permissão específica para acessar
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
