import { MediaType } from './../../models/media-type.enum';
import { LoadingController } from '@ionic/angular';
import { SearchResult } from './../../models/searchResult';
import { OmdbApiService } from '../services/omdb-api.service';

export class MediaTabPage {
  searchResult: SearchResult;
  
  currentPageNumber: number;
  isSearchBarDisplayed: boolean = true;

  searchText: string;

  constructor(public api: OmdbApiService, public loadingController: LoadingController, public mediaType : MediaType) { }

  async getMediaByName(searchBar) {
    var name = searchBar.detail.value;
    this.searchText = name;
    
    if(this.mediaType == MediaType.Movie){
      await this.getMoviesByName(name);
    }
    else {
      await this.getSeriesByName(name);
    }
    this.currentPageNumber = 1;
  }

  async getMoviesByName(searchText) {
    this.searchResult = await this.api.getMoviesByName(searchText, this.currentPageNumber);
  }

  async getSeriesByName(searchText) {
    this.searchResult = await this.api.getSeriesByName(searchText, this.currentPageNumber); //Todo: Create a common searchResult between series and movies.
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