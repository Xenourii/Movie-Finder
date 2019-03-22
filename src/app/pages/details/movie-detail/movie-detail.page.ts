import { BookmarkedMedia } from './../../../../models/bookmarkedMedia';
import { BookmarkService } from './../../../services/bookmark.service';
import { Movie } from './../../../../models/movie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbApiService } from 'src/app/services/omdb-api.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  movie: Movie;
  imageUrl: string;
  isFavorite: boolean;

  private bookemarkedMedia: BookmarkedMedia;

  constructor(public api: OmdbApiService, private route: ActivatedRoute, private bookmarkService: BookmarkService) { }

  async ngOnInit() {
  }

  async ionViewWillEnter(){
    var id = this.route.snapshot.paramMap.get('id');
    this.movie = await this.api.getMediaInfo<Movie>(id);
    this.imageUrl = await this.api.getImageUrl(id);

    this.bookemarkedMedia = <BookmarkedMedia> {
      Title: this.movie.Title,
      imdbID: this.movie.imdbID,
      Type: this.movie.Type,
    };

    this.isFavorite = await this.bookmarkService.isMediaAlreadyBookmarked(this.bookemarkedMedia);
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
}
