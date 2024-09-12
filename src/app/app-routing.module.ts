import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

// Rotas atualizadas com base no código APOIO, incluindo lazy loading e redirecionamentos do código ATUAL
const routes: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },  // Redirecionamento para 'lancamentos' como no código ATUAL

  // Lazy loading dos módulos conforme no código APOIO
  { path: 'dashboard', loadChildren: () => import('../app/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'lancamentos', loadChildren: () => import('../app/lancamentos/lancamentos.module').then(m => m.LancamentosModule) },
  { path: 'pessoas', loadChildren: () => import('../app/pessoas/pessoas.module').then(m => m.PessoasModule) },
  { path: 'relatorios', loadChildren: () => import('../app/relatorios/relatorios.module').then(m => m.RelatoriosModule) },

  // Rotas de erro e não autorizado como no código ATUAL
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },

  // Redirecionamento de fallback como no código ATUAL
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
