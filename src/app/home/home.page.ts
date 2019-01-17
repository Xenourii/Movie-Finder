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

    this.api.getMoviesByName(this.searchText, this.currentPageNumber)
      .subscribe(res => {
        console.log(res);
        this.searchResult = res;
        console.log("DEBUG : " + this.searchResult.Search);
      }, err => {
        console.log(err);
      });
  }

getMoreMovies(infiniteScroll){
    this.currentPageNumber++;

    setTimeout(() => {
      if(this.currentPageNumber * 10 < this.searchResult.totalResults){
        console.log("page=" + this.currentPageNumber + " total=" + this.searchResult.totalResults);
        this.api.getMoviesByName(this.searchText, this.currentPageNumber)
        .subscribe(res => {
          res.Search.array.forEach(element => {
            this.searchResult.Search.push(element);
          });
          console.log('Async operation has ended');
          infiniteScroll.target.complete();
        }, err => {
          console.log(err);
        });
      };
    }, 500);



    
  }
}
