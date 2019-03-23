import { SeasonResult } from './../../../../models/seasonResult';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { OmdbApiService } from 'src/app/services/omdb-api.service';
import { EpisodeResult } from 'src/models/EpisodeResult';

@Component({
  selector: 'app-season-detail',
  templateUrl: './season-detail.page.html',
  styleUrls: ['./season-detail.page.scss'],
})
export class SeasonDetailPage {

  seasonResult: SeasonResult;
  seasonNumber: string;

  constructor(public router: Router,
    public api: OmdbApiService,
    private route: ActivatedRoute) { }

    async ionViewWillEnter(){
      var id = this.route.snapshot.paramMap.get('id');
      this.seasonNumber = this.route.snapshot.paramMap.get('season');
      this.seasonResult = await this.api.getSeasonInfo(id, this.seasonNumber);
    }

    async onEpisodeClicked(episode: EpisodeResult){
      console.log(episode);
    }
}
