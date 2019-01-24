import { Injectable } from '@angular/core';
import { Platform } from "@ionic/angular";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';



@Injectable({
  providedIn: 'root'
})
export class HttpClientProviderService {

  constructor(private http: HttpClient, private platform: Platform, private httpCordova: HTTP) { }

  async get(url: string) {
    try {
      if (this.isBrowser){
        return await this.http.get(url).toPromise();
      }
      else {
        return await this.httpCordova.get(url, {}, {});
      }
    } catch (error) {
      console.log(error);
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
