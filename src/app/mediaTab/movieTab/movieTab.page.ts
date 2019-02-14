import { SearchResult } from './../../../models/searchResult';
import { SearchMedia } from './../../../models/searchMedia';
import { LoadingController } from '@ionic/angular';
import { OmdbApiService } from './../../services/omdb-api.service';
import { Component } from '@angular/core';
import { MediaTabPage } from './../mediaTab.page';
import { MediaType } from 'src/models/media-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mediaTab',
  templateUrl: '../mediaTab.page.html',
  styleUrls: ['../mediaTab.page.scss']
})

export class MovieTabPage extends MediaTabPage {
  constructor(public api: OmdbApiService, public loadingController: LoadingController, public router: Router){
      super(api, loadingController, MediaType.Movie, router);
  }

  async goToDetails(media : SearchMedia){
    await this.router.navigate(['/movie-detail/' + media.imdbID]);
  }

  async getMediaResult() : Promise<SearchResult>{
    return await this.api.getMoviesByName(this.searchText, this.currentPageNumber);
  }
}
