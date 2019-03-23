import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'movie-detail/:id', loadChildren: './pages/details/media-detail/movie-detail/movie-detail.module#MovieDetailPageModule' },
  { path: 'serie-detail/:id', loadChildren: './pages/details/media-detail/serie-detail/serie-detail.module#SerieDetailPageModule' },
  { path: 'season-detail/:id/:season', loadChildren: './pages/details/season-detail/season-detail.module#SeasonDetailPageModule' },
  { path: 'episode-detail/:id', loadChildren: './pages/details/media-detail/episode-detail/episode-detail.module#EpisodeDetailPageModule' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
