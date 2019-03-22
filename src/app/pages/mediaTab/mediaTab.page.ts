import { SearchMedia } from './../../../models/searchMedia';
import { SearchResult } from './../../../models/searchResult';

export abstract class MediaTabPage {
  searchResult: SearchResult;
  
  currentPageNumber: number;
  isSearchBarDisplayed: boolean = true;

  searchText: string = "";

  abstract async goToDetails(media : SearchMedia);

  abstract async getMediaResult() : Promise<SearchResult>;

  async getMedia(searchBar) {
    this.searchText = searchBar.detail.value;
    this.searchResult = await this.getMediaResult();
    this.currentPageNumber = 1;
  }

  async getMoreMovies(infiniteScroll){
    this.currentPageNumber++;

    if(this.currentPageNumber * 10 < this.searchResult.totalResults){
      console.log("page=" + this.currentPageNumber + " total=" + this.searchResult.totalResults);
      var res = await this.getMediaResult();
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