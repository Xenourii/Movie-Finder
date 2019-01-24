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
  currentPageNumber : number;

  constructor(public api: OmdbApiService, public loadingController: LoadingController) { }

  ngOnInit() {
    //this.getMoviesByName("superman");
  }

  async getMoviesByName() {
    this.currentPageNumber = 1;
    this.searchResult = await this.api.getMoviesByName(this.searchText, this.currentPageNumber);
  }

  async getMoreMovies(infiniteScroll){
    this.currentPageNumber++;

    if(this.currentPageNumber * 10 < this.searchResult.totalResults){
      console.log("page=" + this.currentPageNumber + " total=" + this.searchResult.totalResults);
      var res = await this.api.getMoviesByName(this.searchText, this.currentPageNumber);
      res.Search.forEach(element => {
        this.searchResult.Search.push(element);
      });
        
    };
      console.log('Async operation has ended');
        infiniteScroll.target.complete();
        console.log("complete");
    
  }
}
