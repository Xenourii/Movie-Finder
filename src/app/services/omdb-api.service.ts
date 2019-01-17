import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';

//https://www.djamware.com/post/5b94bb1d80aca74669894415/ionic-4-angular-6-tutorial-call-multiple-services-at-once

const omdbApiUrl: string = "http://www.omdbapi.com/?apikey=75522b56";
const omdbImageApiUrl: string = "http://img.omdbapi.com/";
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class OmdbApiService {

  constructor(private http: HttpClient) { }
  getMovieByName(name: string): Observable<any> {
    const url = `${omdbApiUrl}&t=${name}`;
    let response = this.http.get(url);
    return response;
  }






  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  // getMovieByName(name: string): Observable<any> {
  //   const url = `${omdbApiUrl}&t=${name}`;
  //   console.log("Debug 1");

  //   this.http.get(url, httpOptions).subscribe((res) => {
  //     console.log("Debug 2");
  //     console.log(res);
  //   })

  //   return this.http.get(url, httpOptions).pipe(
  //     map(this.extractData),
  //     catchError(this.handleError));
  // }
}
