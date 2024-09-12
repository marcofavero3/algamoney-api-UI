import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ConfirmationService, MessageService } from 'primeng/api';  // Serviços do PrimeNG
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { AuthService } from '../seguranca/auth.service';

// Registrar o idioma português do Brasil
registerLocaleData(localePt, 'pt-BR');

// Função de fábrica para carregar as traduções via HTTP
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent  // Adicionando os componentes do código APOIO
  ],
  imports: [
    CommonModule,
    HttpClientModule,  // Importando o HttpClientModule
    RouterModule,  // Adicionado para roteamento interno

    // Módulos do PrimeNG
    ToastModule,
    ConfirmDialogModule,

    // Configuração do TranslateModule para internacionalização
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    NavbarComponent,  // Exporta o NavbarComponent para uso em outros módulos

    // Exportação dos módulos do PrimeNG
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [
    DatePipe,  // Serviço DatePipe para formatação de datas
    ErrorHandlerService,  // Serviço para tratamento de erros
    AuthService,  // Serviço de autenticação
    MessageService,  // Serviço para exibir mensagens
    ConfirmationService,  // Serviço de confirmação de diálogos
    TranslateService,  // Serviço de tradução
  ]
})
export class CoreModule { }
