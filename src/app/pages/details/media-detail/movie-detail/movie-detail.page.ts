import { BookmarkedMedia } from './../../../../../models/bookmarkedMedia';
import { BookmarkService } from './../../../../services/bookmark.service';
import { Movie } from './../../../../../models/movie';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbApiService } from 'src/app/services/omdb-api.service';
import { MediaDetailPage } from '../media-detail.page';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./../media-detail.page.scss'],
})
export class MovieDetailPage extends MediaDetailPage {

  movie: Movie;
  imageUrl: string;
  isFavorite: boolean;

  constructor(public api: OmdbApiService,
    private route: ActivatedRoute,
    bookmarkService: BookmarkService) { 
      super(bookmarkService);
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
}
