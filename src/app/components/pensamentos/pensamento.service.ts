import { Pensamento } from './../pensamento/pensamento';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly API_ENDPOINT = 'http://localhost:3001/pensamentos';
  constructor(private http: HttpClient) {}

  getPensamentos(
    pagina: number,
    filtro?: string,
    favoritos?: boolean
  ): Observable<HttpResponse<Pensamento[]>> {
    const itensPorPagina = 6;
    let params = new HttpParams()
      .set('_page', pagina)
      .set('_limit', itensPorPagina);
    if (filtro && filtro.trim().length > 0) {
      params = params.set('q', filtro);
    }
    if (favoritos) {
      params = params.set('favorito', true);
    }
    return this.http.get<Pensamento[]>(`${this.API_ENDPOINT}`, {
      params,
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

  favoritarPensamento(
    pesamentoId: number,
    pesamentoFavorito: boolean
  ): Observable<HttpResponse<Pensamento>> {
    return this.http.patch<Pensamento>(
      `${this.API_ENDPOINT}/${pesamentoId}`,
      { favorito: pesamentoFavorito },
      {
        observe: 'response',
      }
    );
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
