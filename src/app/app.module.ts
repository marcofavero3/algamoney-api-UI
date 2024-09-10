import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';  // Importação do HttpClient
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';  // Certifique-se de que o caminho está correto
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';  // Certifique-se que este pacote está instalado
import { TranslateHttpLoader } from '@ngx-translate/http-loader';  // Carregador de traduções

// Função de fábrica para carregar as traduções via Http
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent  // Certifique-se de que o AppComponent está corretamente declarado
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    CoreModule,  // Certifique-se de que o CoreModule está corretamente configurado
    LancamentosModule,
    PessoasModule,

    AppRoutingModule,

    // Módulo de Tradução
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
