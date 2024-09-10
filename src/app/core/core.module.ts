import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ConfirmationService, MessageService } from 'primeng/api';  // PrimeNG services
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { ErrorHandlerService } from './error-handler.service';  // Verifique o caminho correto
import { NavbarComponent } from './navbar/navbar.component';  // Verifique se o componente existe

// Registrar o idioma português do Brasil
registerLocaleData(localePt, 'pt-BR');

// Função de fábrica para carregar as traduções via Http
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    NavbarComponent  // Declaração do NavbarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,

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
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [
    DatePipe,  // Serviço DatePipe para formatação de datas
    ErrorHandlerService,  // Serviço para tratamento de erros
    MessageService,  // Serviço para exibir mensagens
    ConfirmationService,  // Serviço de confirmação de diálogos
    TranslateService  // Serviço de tradução
  ]
})
export class CoreModule { }
