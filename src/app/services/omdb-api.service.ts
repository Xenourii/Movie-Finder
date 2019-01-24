import { HttpClientProviderService } from './http-client-provider.service';
import { Injectable } from '@angular/core';
import { SearchResult } from './../../models/searchResult';

import { forkJoin } from 'rxjs';import { Observable, of, throwError } from 'rxjs';

//https://www.djamware.com/post/5b94bb1d80aca74669894415/ionic-4-angular-6-tutorial-call-multiple-services-at-once

const omdbApiUrl: string = "http://www.omdbapi.com/?apikey=75522b56";
const omdbImageApiUrl: string = "http://img.omdbapi.com/?apikey=75522b56";

@Injectable({
  providedIn: 'root'
})

export class OmdbApiService {

  constructor(private http: HttpClientProviderService) { }

  async getMovieByName(name: string) {
    const url = `${omdbApiUrl}&t=${name}`;
    let response = await this.http.get(url);
    return response;
  }

  async getMoviesByName(name: string, page: number) : Promise<SearchResult> {
    const url = `${omdbApiUrl}&s=${name}*&page=${page}`;
    let response = await this.http.get(url);
    var searchResult = response as SearchResult;
    return searchResult;
  }
}
