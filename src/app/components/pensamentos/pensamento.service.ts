import { Pensamento } from './../pensamento/pensamento';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly API_ENDPOINT = 'http://localhost:3001/pensamentos';
  constructor(private http: HttpClient) {}

  getPensamentos(): Observable<HttpResponse<Pensamento[]>> {
    return this.http.get<Pensamento[]>(this.API_ENDPOINT, {
      observe: 'response',
    });
  }

  getPensamentoPorId(
    pensamentoId: number
  ): Observable<HttpResponse<Pensamento>> {
    return this.http.get<Pensamento>(`${this.API_ENDPOINT}/${pensamentoId}`, {
      observe: 'response',
    });
  }

  createPensamento(
    pensamento: Pensamento
  ): Observable<HttpResponse<Pensamento>> {
    return this.http.post<Pensamento>(this.API_ENDPOINT, pensamento, {
      observe: 'response',
    });
  }
  updatePensamento(pensamento: Pensamento) {
    return this.http.put<HttpResponse<Pensamento>>(
      `${this.API_ENDPOINT}/${pensamento.id}`,
      pensamento,
      {
        observe: 'response',
      }
    );
  }
  deletePensamento(pensamentoId: number): Observable<HttpResponse<Pensamento>> {
    return this.http.delete<Pensamento>(
      `${this.API_ENDPOINT}/${pensamentoId}`,
      {
        observe: 'response',
      }
    );
  }
}
