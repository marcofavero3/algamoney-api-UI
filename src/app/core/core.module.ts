import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import localePt from '@angular/common/locales/pt';

import { NgModule } from '@angular/core';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';

// Registrar o idioma português do Brasil
registerLocaleData(localePt, 'pt-BR');

// Função de fábrica para carregar as traduções do ngx-translate via Http
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    NavbarComponent
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
    NavbarComponent,

    // Exportação dos módulos para uso externo
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [
    DatePipe,
    ErrorHandlerService,
    MessageService,
    ConfirmationService,
    TranslateService
  ]
})
export class CoreModule { }
