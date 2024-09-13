import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs'; // Substitui o uso do toPromise
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  private lancamentosUrl: string;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  // Gera o relatório de lançamentos por pessoa em um intervalo de datas
  relatorioLancamentosPorPessoa(inicio: Date, fim: Date): Promise<Blob> {
    const params = new HttpParams()
      .set('inicio', this.datePipe.transform(inicio, 'yyyy-MM-dd')!)
      .set('fim', this.datePipe.transform(fim, 'yyyy-MM-dd')!);

    return firstValueFrom(
      this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`, {
        params,
        responseType: 'blob' // Espera um arquivo Blob (PDF, CSV, etc)
      })
    );
  }
}
