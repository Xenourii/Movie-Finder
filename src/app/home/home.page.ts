import { Movie } from './../../models/movie';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { OmdbApiService } from '../services/omdb-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  movie: Movie;
  constructor(public api: OmdbApiService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.getMovies();
  }

  async getMovies() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.api.getMovieByName("Hello")
      .subscribe(res => {
        console.log(res);
        this.movie = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
