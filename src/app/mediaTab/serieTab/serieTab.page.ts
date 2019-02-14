import { SearchResult } from './../../../models/searchResult';
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MediaType } from './../../../models/media-type.enum';
import { MediaTabPage } from './../mediaTab.page';
import { OmdbApiService } from 'src/app/services/omdb-api.service';
import { Router } from '@angular/router';
import { SearchMedia } from './../../../models/searchMedia';

@Component({
  selector: 'app-mediaTab',
  templateUrl: '../mediaTab.page.html',
  styleUrls: ['../mediaTab.page.scss']
})

export class SerieTabPage extends MediaTabPage {
  constructor(public api: OmdbApiService, public loadingController: LoadingController, public router: Router){
    super(api, loadingController, MediaType.Serie, router);
  }

  async goToDetails(media : SearchMedia){
    await this.router.navigate(['/serie-detail/' + media.imdbID]);
  }
  async getMediaResult() : Promise<SearchResult>{
    return await this.api.getSeriesByName(this.searchText, this.currentPageNumber);
  }
}
