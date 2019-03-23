import { BookmarkedMedia } from './../../../../../models/bookmarkedMedia';
import { Serie } from './../../../../../models/serie';
import { BookmarkService } from './../../../../services/bookmark.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { OmdbApiService } from 'src/app/services/omdb-api.service';
import { MediaDetailPage } from '../media-detail.page';

@Component({
  selector: 'app-serie-detail',
  templateUrl: './serie-detail.page.html',
  styleUrls: ['./../media-detail.page.scss'],
})
export class SerieDetailPage extends MediaDetailPage {

  serie: Serie;
  imageUrl: string;
  isFavorite: boolean;
  seasons: string[];

  constructor(public router: Router,
    public api: OmdbApiService,
    private route: ActivatedRoute,
    bookmarkService: BookmarkService) {
      super(bookmarkService);
     }

    async ionViewWillEnter(){
      var id = this.route.snapshot.paramMap.get('id');
      this.serie = await this.api.getMediaInfo<Serie>(id);
      this.imageUrl = await this.api.getImageUrl(id);
  
      this.bookemarkedMedia = <BookmarkedMedia> {
        Title: this.serie.Title,
        imdbID: this.serie.imdbID,
        Type: this.serie.Type,
      };
  
      this.isFavorite = await this.bookmarkService.isMediaAlreadyBookmarked(this.bookemarkedMedia);
    
      var numberOfSeasons = parseInt(this.serie.totalSeasons);
      this.createSeasonsArray(numberOfSeasons);
    }

    createSeasonsArray(numberOfSeasons: number){
      this.seasons = new Array();
      for (let i = 1; i <= numberOfSeasons; i++) {
        this.seasons.push(i.toString());
      }
    }
    
    async onSeasonClicked(seasonNumber){
      await this.router.navigate(['/season-detail/' + this.serie.imdbID + '/' + seasonNumber]);
    }

}
