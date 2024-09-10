import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';  // Certifique-se de que o TranslateService está instalado
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'algamoney-ui';

  constructor(
    private config: PrimeNGConfig,
    private translateService: TranslateService  // Injetando o TranslateService
  ) { }

  ngOnInit() {
    // Define o idioma padrão como português
    this.translateService.setDefaultLang('pt');

    // Obtém as traduções do PrimeNG para o idioma selecionado e aplica-as
    this.translateService.get('primeng').subscribe(res => {
      if (res) {
        this.config.setTranslation(res);
      }
    });
  }
}
