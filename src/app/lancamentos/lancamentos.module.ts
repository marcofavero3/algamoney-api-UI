import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { SharedModule } from '../shared/shared.module';  // Certifique-se de que o SharedModule está corretamente configurado
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosRoutingModule } from './lancamentos-routing.module';  // Certifique-se de que o nome do arquivo de rotas está correto

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    // Módulos do PrimeNG
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,

    SharedModule,  // Certifique-se de que o SharedModule possui todos os componentes compartilhados
    LancamentosRoutingModule  // Certifique-se de que o caminho está correto
  ],
  declarations: [
    LancamentoCadastroComponent,  // Declaração dos componentes necessários
    LancamentosPesquisaComponent
  ],
  exports: []  // Se necessário exportar componentes ou módulos, adicionar aqui
})
export class LancamentosModule { }
