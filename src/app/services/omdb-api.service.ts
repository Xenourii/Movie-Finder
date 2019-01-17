import { HttpClientProviderService } from './http-client-provider.service';
import { Injectable } from '@angular/core';

import { forkJoin } from 'rxjs';import { Observable, of, throwError } from 'rxjs';

//https://www.djamware.com/post/5b94bb1d80aca74669894415/ionic-4-angular-6-tutorial-call-multiple-services-at-once

const omdbApiUrl: string = "http://www.omdbapi.com/?apikey=75522b56";
const omdbImageApiUrl: string = "http://img.omdbapi.com/";

@Injectable({
  providedIn: 'root'
})

export class OmdbApiService {

  constructor(private http: HttpClientProviderService) { }
  getMovieByName(name: string): Observable<any> {
    const url = `${omdbApiUrl}&t=${name}`;
    let response = this.http.get(url);
    return response;
  }

  getMoviesByName(name: string): Observable<any> {
    const url = `${omdbApiUrl}&s=${name}*`;
    let response = this.http.get(url);
    return response;
  }
}
