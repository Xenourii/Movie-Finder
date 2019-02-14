import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  private movieId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id');
  }

}
