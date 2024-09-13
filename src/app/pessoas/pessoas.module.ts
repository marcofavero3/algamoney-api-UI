import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';  // Adicionado para suporte a diálogos
import { PanelModule } from 'primeng/panel';    // Adicionado para suporte a painéis

import { SharedModule } from '../shared/shared.module';
import { PessoasRoutingModule } from './pessoas-routing.module';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroContatoComponent } from './pessoa-cadastro-contato/pessoa-cadastro-contato.component';  // Importação standalone

@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    DialogModule,   // Módulo de diálogo
    PanelModule,    // Módulo de painel

    SharedModule,
    PessoasRoutingModule,

    // Agora o componente standalone é importado aqui
    PessoaCadastroContatoComponent
  ],
  exports: []
})
export class PessoasModule { }
