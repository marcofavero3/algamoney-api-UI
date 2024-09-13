import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';  // Para o calendário do PrimeNG

import { SharedModule } from './../shared/shared.module';  // Módulo compartilhado para componentes reutilizáveis
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';  // Certifique-se de que o componente existe
import { RelatoriosRoutingModule } from './relatorios-routing.module';  // Roteamento dos relatórios

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,  // Módulo de calendário para seleção de datas
    SharedModule,  // Módulo compartilhado para reutilização
    RelatoriosRoutingModule,  // Roteamento das rotas dos relatórios
    RelatorioLancamentosComponent  // Importando o componente standalone
  ]
})
export class RelatoriosModule { }
