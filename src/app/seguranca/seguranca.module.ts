import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SegurancaRoutingModule } from './seguranca-routing.module'; // Certifique-se de que o caminho está correto

import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    SegurancaRoutingModule  // Corrija a importação do SegurancaRoutingModule
  ]
})
export class SegurancaModule { }
