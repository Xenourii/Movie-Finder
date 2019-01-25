import { LoadingController } from '@ionic/angular';
import { SearchResult } from '../../models/searchResult';
import { Component } from '@angular/core';
import { OmdbApiService } from '../services/omdb-api.service';

@Component({
  selector: 'app-movieTab',
  templateUrl: 'movieTab.page.html',
  styleUrls: ['movieTab.page.scss']
})
export class MovieTabPage {
  searchResult: SearchResult;
  searchText: string;
  currentPageNumber: number;
  isSearchBarDisplayed: boolean = true;  

  constructor(public api: OmdbApiService, public loadingController: LoadingController) { }
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

  toggleSearchBar(){
    this.isSearchBarDisplayed = !this.isSearchBarDisplayed;
  }

}
