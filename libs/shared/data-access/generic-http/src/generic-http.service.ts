import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ModelAdapter } from './model-adapter.interface';

@Injectable({
  providedIn: 'root',
})
export abstract class GenericHttpService<T, S> {
  protected url: string;
  defaultHeaders = new HttpHeaders();

  protected readonly httpClient = inject(HttpClient);

  constructor(
    private endpoint: string,
    private baseUrl: string,
    private adapter: ModelAdapter<T, S>
  ) {
    this.url = this.baseUrl + '/api' + this.endpoint;
  }

  public get(extraHttpRequestParams?: Partial<HttpHeaders>): Observable<S[]> {
    return this.httpClient
      .get<T[]>(
        `${this.url}`,
        this.prepareRequestOptions(extraHttpRequestParams)
      )
      .pipe(
        map((data: T[]) => data.map((item) => this.adapter.fromDto(item) as S))
      );
  }

  public getById(
    id: number | string,
    extraHttpRequestParams?: Partial<HttpHeaders>
  ): Observable<S> {
    return this.httpClient
      .get(
        `${this.url}/${id}`,
        this.prepareRequestOptions(extraHttpRequestParams)
      )
      .pipe(map((data) => this.adapter.fromDto(data as T)));
  }

  public post(
    body: S,
    extraHttpRequestParams?: Partial<HttpHeaders>
  ): Observable<S> {
    return this.httpClient
      .post(
        `${this.url}`,
        this.adapter.toDto(body),
        this.prepareRequestOptions(extraHttpRequestParams)
      )
      .pipe(map((data) => this.adapter.fromDto(data as T)));
  }

  public put(
    body: S,
    extraHttpRequestParams?: Partial<HttpHeaders>
  ): Observable<S> {
    return this.httpClient
      .put(
        `${this.url}`,
        this.adapter.toDto(body),
        this.prepareRequestOptions(extraHttpRequestParams)
      )
      .pipe(map((data) => this.adapter.fromDto(data as T)));
  }

  public patch(
    body: S,
    extraHttpRequestParams?: Partial<HttpHeaders>
  ): Observable<S> {
    return this.httpClient
      .patch(
        `${this.url}`,
        this.adapter.toDto(body),
        this.prepareRequestOptions(extraHttpRequestParams)
      )
      .pipe(map((data) => this.adapter.fromDto(data as T)));
  }

  public delete(
    id: number | string,
    extraHttpRequestParams?: Partial<HttpHeaders>
  ): Observable<S> {
    return this.httpClient
      .delete(
        `${this.url}/${id}`,
        this.prepareRequestOptions(extraHttpRequestParams)
      )
      .pipe(map((data) => this.adapter.fromDto(data as T)));
  }

  public prepareRequestOptions(extraHttpRequestParams = {}) {
    return {
      headers: Object.assign(this.defaultHeaders, extraHttpRequestParams),
    };
  }
}
