import { BookmarkedMedia } from './../../../models/bookmarkedMedia';
import { BookmarkService } from './../../services/bookmark.service';
import { Movie } from './../../../models/movie';
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

  constructor(public api: OmdbApiService, private route: ActivatedRoute, private bookmarkService: BookmarkService) { }

  async ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');
    this.movie = await this.api.getMediaInfo<Movie>(id);
    this.imageUrl = this.api.getImageUrl(id);

    this.isFavorite = true; // TODO read favorite from storage
  }

  async onFavoriteButtonClicked(isFavorite: boolean){
    console.log("isFavorite event=" + isFavorite);
  }

}
