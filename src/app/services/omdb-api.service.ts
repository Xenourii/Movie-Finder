import { HttpClientProviderService } from './http-client-provider.service';
import { Injectable } from '@angular/core';
import { SearchResult } from './../../models/searchResult';

import { forkJoin } from 'rxjs';import { Observable, of, throwError } from 'rxjs';

const omdbApiUrl: string = "http://www.omdbapi.com/?apikey=75522b56";
const omdbImageApiUrl: string = "http://img.omdbapi.com/?apikey=75522b56";

@Injectable({
  providedIn: 'root'
})

export class OmdbApiService {

  constructor(private http: HttpClientProviderService) { }

  async getMoviesByName(name: string, page: number) : Promise<SearchResult> {
    const url = `${omdbApiUrl}&s=${name}*&page=${page}&type=movie`;
    return await this.fetch<SearchResult>(url);
  }

  async getSeriesByName(name: string, page: number) : Promise<SearchResult> {
    const url = `${omdbApiUrl}&s=${name}*&page=${page}&type=series`;
    return await this.fetch<SearchResult>(url);
  }

  getImageUrl(id: string) : string {
    return `${omdbImageApiUrl}&i=${id}&h=9999`;
  }

  async getMediaInfo<T>(id: string) : Promise<T> {
    const url = `${omdbApiUrl}&i=${id}&plot=full`;
    return await this.fetch<T>(url);
  }

  async fetch<T>(url: string) : Promise<T> {
    return await this.http.get(url) as T;
  }
}
