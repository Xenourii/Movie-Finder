import { SearchResult } from './../../models/searchResult';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { OmdbApiService } from '../services/omdb-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  searchResult: SearchResult;
  searchText: string;
  constructor(public api: OmdbApiService, public loadingController: LoadingController) { }

  ngOnInit() {
    //this.getMoviesByName("superman");
  }

  async getMoviesByName() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    //await loading.present();

    this.api.getMoviesByName(this.searchText)
      .subscribe(res => {
        console.log(res);
        this.searchResult = res;
        console.log("DEBUG : " + this.searchResult.Search);
        //loading.dismiss();
      }, err => {
        console.log(err);
        //loading.dismiss();
      });
  }
}
