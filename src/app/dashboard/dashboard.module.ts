import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';

import { SharedModule } from './../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent  // Incluindo o DashboardComponent
  ],
  imports: [
    CommonModule,       // Importação do CommonModule
    DashboardRoutingModule,  // Configurações de rota para o Dashboard

    // PrimeNG Modules
    PanelModule,
    ChartModule,

    SharedModule  // Módulo compartilhado
  ],
  providers: [
    DecimalPipe  // Fornecendo o DecimalPipe para formatação de números
  ]
})
export class DashboardModule { }
