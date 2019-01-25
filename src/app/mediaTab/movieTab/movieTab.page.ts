import { LoadingController } from '@ionic/angular';
import { OmdbApiService } from './../../services/omdb-api.service';
import { Component } from '@angular/core';
import { MediaTabPage } from './../mediaTab.page';
import { MediaType } from 'src/models/media-type.enum';

@Component({
    selector: 'app-mediaTab',
    templateUrl: '../mediaTab.page.html',
    styleUrls: ['../mediaTab.page.scss']
  })

export class MovieTabPage extends MediaTabPage {
    constructor(public api: OmdbApiService, public loadingController: LoadingController){
        super(api, loadingController, MediaType.Movie);
    }
}
