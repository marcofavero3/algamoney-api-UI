import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Pessoa } from '../core/model';
import { environment } from './../../environments/environment';  // Importando o environment para usar a URL correta

export class PessoaFiltro {
  nome?: string;
  pagina: number = 0;
  itensPorPagina: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  pessoasUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;  // URL para o backend
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const headers = this.getAuthHeaders();  // Função para obter o cabeçalho com autenticação

    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return firstValueFrom(
      this.http.get<any>(this.pessoasUrl, { headers, params })
    ).then(response => {
      const pessoas = response.content;
      const resultado = {
        pessoas,
        total: response.totalElements
      };
      return resultado;
    }).catch(erro => {
      console.error('Erro ao buscar pessoas', erro);
      throw erro;
    });
  }

  listarTodas(): Promise<any> {
    const headers = this.getAuthHeaders();

    return firstValueFrom(
      this.http.get<any>(this.pessoasUrl, { headers })
    ).then(response => response.content)
      .catch(erro => {
        console.error('Erro ao listar todas as pessoas', erro);
        throw erro;
      });
  }

  excluir(codigo: number): Promise<void> {
    const headers = this.getAuthHeaders();

    return firstValueFrom(
      this.http.delete<void>(`${this.pessoasUrl}/${codigo}`, { headers })
    ).catch(erro => {
      console.error('Erro ao excluir pessoa', erro);
      throw erro;
    });
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = this.getAuthHeaders()
      .append('Content-Type', 'application/json');

    return firstValueFrom(
      this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
    ).catch(erro => {
      console.error('Erro ao mudar status da pessoa', erro);
      throw erro;
    });
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = this.getAuthHeaders()
      .append('Content-Type', 'application/json');

    return firstValueFrom(
      this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers })
    ).catch(erro => {
      console.error('Erro ao adicionar pessoa', erro);
      throw erro;
    });
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = this.getAuthHeaders()
      .append('Content-Type', 'application/json');

    return firstValueFrom(
      this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, { headers })
    ).catch(erro => {
      console.error('Erro ao atualizar pessoa', erro);
      throw erro;
    });
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    const headers = this.getAuthHeaders();

    return firstValueFrom(
      this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`, { headers })
    ).catch(erro => {
      console.error('Erro ao buscar pessoa por código', erro);
      throw erro;
    });
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');  // Cabeçalho de autorização básico
  }
}
