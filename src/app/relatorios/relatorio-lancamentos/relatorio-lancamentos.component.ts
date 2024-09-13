import { Component } from '@angular/core';
import { RelatoriosService } from './../relatorios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-relatorio-lancamentos',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarModule, ButtonModule],
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent {

  periodoInicio?: Date;
  periodoFim?: Date;

  constructor(private relatoriosService: RelatoriosService) { }

  gerar() {
    if (this.periodoInicio && this.periodoFim) {
      this.relatoriosService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
        .then(relatorio => {
          const url = window.URL.createObjectURL(relatorio);
          window.open(url);
        })
        .catch(error => console.error('Erro ao gerar relatório:', error));
    } else {
      console.error('Período inválido');
    }
  }
}
