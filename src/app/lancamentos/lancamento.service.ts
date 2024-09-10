import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Lancamento } from '../core/model';  // Certifique-se de importar o modelo correto

// Classe para filtro de lançamentos
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
  private lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  // Método para pesquisar lançamentos com filtro
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
      params = params.set('dataVencimentoDe', filtro.dataVencimentoInicio.toISOString());
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', filtro.dataVencimentoFim.toISOString());
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

  // Método para adicionar um novo lançamento
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

  // Método para excluir um lançamento
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
}
