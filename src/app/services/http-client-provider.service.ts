import { Injectable } from '@angular/core';
import { Platform } from "@ionic/angular";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpHeaderResponse } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HttpClientProviderService {

  constructor(private http: HttpClient, private platform: Platform, private httpCordova: HTTP) { }

  async isExists(url: string) : Promise<boolean>{
    try {
      if (this.isBrowser){
        await this.http.get(url).toPromise() as HttpErrorResponse;
        //It will failed to parse image, so it enters in the catch.
      }
      else {
        var cordovaResult = await this.httpCordova.get(url, {}, {});
        if (cordovaResult.status == 404){
          return false;
        } 
      }

      return true;

    } catch (error) {
      if (error.status == 200){
        return true;
      }

      return false;
    }
  }

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
