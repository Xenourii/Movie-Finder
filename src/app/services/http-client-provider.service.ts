import { Injectable } from '@angular/core';
import { Platform } from "@ionic/angular";

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';



@Injectable({
  providedIn: 'root'
})
export class HttpClientProviderService {

  constructor(private http: HttpClient, private platform: Platform, private httpCordova: HTTP) { }

  get(url: string): Observable<any>{
    if (this.isBrowser){
      return this.http.get(url);
    }
    else {
      
      this.httpCordova.get(url, {}, {})
      .then(data => {
        console.log("loul");
        console.log(data);
        console.log(data.data); // data received by server
        console.log(data.headers);
        return data;
      })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
    }
  }

  private isBrowser(){
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        return false;
      } else {
        return true;
      }
    });
  }
}
