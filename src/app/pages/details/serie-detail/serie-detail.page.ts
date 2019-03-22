import { BookmarkedMedia } from './../../../../models/bookmarkedMedia';
import { Serie } from './../../../../models/serie';
import { BookmarkService } from './../../../services/bookmark.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { OmdbApiService } from 'src/app/services/omdb-api.service';

@Component({
  selector: 'app-serie-detail',
  templateUrl: './serie-detail.page.html',
  styleUrls: ['./serie-detail.page.scss'],
})
export class SerieDetailPage {

  serie: Serie;
  imageUrl: string;
  isFavorite: boolean;
  seasons: string[];

  private bookemarkedMedia: BookmarkedMedia;

  constructor(public router: Router,
    public api: OmdbApiService,
    private route: ActivatedRoute,
    private bookmarkService: BookmarkService) { }

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
        this.seasons.push("Season " + i);
      }
    }
  
    async onFavoriteButtonClicked(){
      this.isFavorite = !this.isFavorite;
  
      if (this.isFavorite == true){
        await this.saveMovieToBookmark();
      }
      else {
        this.removeFromBookmark();
      }
    }
  
    async saveMovieToBookmark(){
      await this.bookmarkService.saveToBookmark(this.bookemarkedMedia);
    }
  
    async removeFromBookmark(){
      await this.bookmarkService.removeFromBookmark(this.bookemarkedMedia);
    }

    async onSeasonClicked(){

    }

}
