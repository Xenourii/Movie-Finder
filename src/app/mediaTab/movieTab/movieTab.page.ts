import { SearchResult } from './../../../models/searchResult';
import { SearchMedia } from './../../../models/searchMedia';
import { OmdbApiService } from './../../services/omdb-api.service';
import { Component } from '@angular/core';
import { MediaTabPage } from './../mediaTab.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mediaTab',
  templateUrl: '../mediaTab.page.html',
  styleUrls: ['../mediaTab.page.scss']
})

export class MovieTabPage extends MediaTabPage {
  constructor(public api: OmdbApiService, public router: Router){
      super();
  }

  async goToDetails(media : SearchMedia){
    await this.router.navigate(['/movie-detail/' + media.imdbID]);
  }

  async getMediaResult() : Promise<SearchResult>{
    return await this.api.getMoviesByName(this.searchText, this.currentPageNumber);
  }
}
