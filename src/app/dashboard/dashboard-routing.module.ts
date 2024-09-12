import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './../seguranca/auth.guard';  // Importando o AuthGuard para proteção de rotas
import { DashboardComponent } from './dashboard/dashboard.component';  // Componente Dashboard

const routes: Routes = [
  {
    path: '',  // Rota principal do Dashboard
    component: DashboardComponent,  // Componente exibido
    canActivate: [authGuard],  // Proteção de rota com AuthGuard
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }  // Definição de roles para acessar a rota
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configuração de rotas filhas (forChild)
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
