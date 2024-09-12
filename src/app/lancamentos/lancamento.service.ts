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

  lancamentosUrl = `${environment.apiUrl}/lancamentos`;  // Ajustando a URL para o Heroku

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer YOUR_TOKEN_HERE'); // Substitua com o token correto

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

      const resultado = {
        lancamentos,
        total: response.totalElements
      };

      return resultado;
    }).catch(erro => {
      console.error('Erro ao buscar lançamentos', erro); // Tratamento de erro
      throw erro;
    });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer YOUR_TOKEN_HERE'); // Substitua com o token correto

    return firstValueFrom(
      this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`, { headers })
    ).catch(erro => {
      console.error('Erro ao excluir lançamento', erro); // Tratamento de erro
      throw erro;
    });
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer YOUR_TOKEN_HERE') // Substitua com o token correto
      .append('Content-Type', 'application/json');

    return firstValueFrom(
      this.http.post<Lancamento>(this.lancamentosUrl, lancamento, { headers })
    ).catch(erro => {
      console.error('Erro ao adicionar lançamento', erro); // Tratamento de erro
      throw erro;
    });
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer YOUR_TOKEN_HERE') // Substitua com o token correto
      .append('Content-Type', 'application/json');

    return firstValueFrom(
      this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento, { headers })
    ).then((response: any) => {
      this.converterStringsParaDatas([response]);
      return response;
    }).catch(erro => {
      console.error('Erro ao atualizar lançamento', erro); // Tratamento de erro
      throw erro;
    });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer YOUR_TOKEN_HERE'); // Substitua com o token correto

    return firstValueFrom(
      this.http.get<any>(`${this.lancamentosUrl}/${codigo}`, { headers })
    ).then((response: any) => {
      this.converterStringsParaDatas([response]);
      return response;
    }).catch(erro => {
      console.error('Erro ao buscar lançamento por código', erro); // Tratamento de erro
      throw erro;
    });
  }

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
