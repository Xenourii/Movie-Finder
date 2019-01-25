import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MediaType } from './../../../models/media-type.enum';
import { MediaTabPage } from './../mediaTab.page';
import { OmdbApiService } from 'src/app/services/omdb-api.service';

@Component({
  selector: 'app-mediaTab',
  templateUrl: '../mediaTab.page.html',
  styleUrls: ['../mediaTab.page.scss']
})

export class SerieTabPage extends MediaTabPage {
  constructor(public api: OmdbApiService, public loadingController: LoadingController){
    super(api, loadingController, MediaType.Serie);
  }
}
