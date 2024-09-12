import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  // Obtém as estatísticas de lançamentos por categoria
  lancamentosPorCategoria(): Promise<Array<any>> {
    return firstValueFrom(
      this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-categoria`)
    );
  }

  // Obtém as estatísticas de lançamentos por dia
  lancamentosPorDia(): Promise<Array<any>> {
    return firstValueFrom(
      this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-dia`)
    ).then(dados => {
      this.converterStringsParaDatas(dados);
      return dados;
    });
  }

  // Converte strings em formato de data para objetos Date
  private converterStringsParaDatas(dados: Array<any>) {
    const offset = new Date().getTimezoneOffset() * 60000;

    for (const dado of dados) {
      dado.dia = new Date(new Date(dado.dia).getTime() + offset);
    }
  }
}
