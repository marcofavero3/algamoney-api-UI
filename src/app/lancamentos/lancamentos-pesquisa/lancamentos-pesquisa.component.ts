import { Component, OnInit } from '@angular/core';
import { LancamentoFiltro, LancamentoService } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  filtro: LancamentoFiltro = new LancamentoFiltro();
  lancamentos: any[] = [];
  totalRegistros = 0;

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar(pagina = 0): void {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.lancamentos = resultado.lancamentos;
        this.totalRegistros = resultado.total;
      });
  }

  aoMudarPagina(event: any): void {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any): void {
    if (confirm(`Tem certeza que deseja excluir o lançamento ${lancamento.descricao}?`)) {
      this.lancamentoService.excluir(lancamento.codigo)
        .then(() => {
          this.pesquisar();
        });
    }
  }
}
