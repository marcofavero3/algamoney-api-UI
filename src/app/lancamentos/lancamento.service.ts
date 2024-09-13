import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Lancamento } from '../core/model';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';  // Importando o environment

export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina: number = 0;
  itensPorPagina: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = `${environment.apiUrl}/lancamentos`;  // Ajustando a URL para o backend

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  // Método para pesquisar lançamentos com filtro
  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = this.criarHeaders();
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
    }

    return firstValueFrom(
      this.http.get<any>(`${this.lancamentosUrl}?resumo`, { headers, params })
    ).then(response => {
      const lancamentos = response.content;

      return {
        lancamentos,
        total: response.totalElements
      };
    }).catch(erro => {
      console.error('Erro ao buscar lançamentos', erro);
      throw erro;
    });
  }

  // Método para excluir lançamento
  excluir(codigo: number): Promise<void> {
    const headers = this.criarHeaders();

    return firstValueFrom(
      this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`, { headers })
    ).catch(erro => {
      console.error('Erro ao excluir lançamento', erro);
      throw erro;
    });
  }

  // Método para adicionar lançamento
  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = this.criarHeadersComJson();

    return firstValueFrom(
      this.http.post<Lancamento>(this.lancamentosUrl, lancamento, { headers })
    ).catch(erro => {
      console.error('Erro ao adicionar lançamento', erro);
      throw erro;
    });
  }

  // Método para atualizar lançamento
  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = this.criarHeadersComJson();

    return firstValueFrom(
      this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento, { headers })
    ).then((response: any) => {
      this.converterStringsParaDatas([response]);
      return response;
    }).catch(erro => {
      console.error('Erro ao atualizar lançamento', erro);
      throw erro;
    });
  }

  // Método para buscar lançamento por código
  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const headers = this.criarHeaders();

    return firstValueFrom(
      this.http.get<any>(`${this.lancamentosUrl}/${codigo}`, { headers })
    ).then((response: any) => {
      this.converterStringsParaDatas([response]);
      return response;
    }).catch(erro => {
      console.error('Erro ao buscar lançamento por código', erro);
      throw erro;
    });
  }

  // Método para obter a URL de upload de anexo
  urlUploadAnexo(): string {
    return `${this.lancamentosUrl}/anexo`;
  }

  // Método para obter os headers para upload
  uploadHeaders(): HttpHeaders {
    return this.criarHeaders(); // O token está incluso neste header
  }

  // Método auxiliar para criar headers
  private criarHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  // Método auxiliar para criar headers com JSON
  private criarHeadersComJson(): HttpHeaders {
    return this.criarHeaders().append('Content-Type', 'application/json');
  }

  // Método para converter strings para datas no formato correto
  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      let offset = new Date().getTimezoneOffset() * 60000;

      lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento!).getTime() + offset);

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);
      }
    }
  }
}
