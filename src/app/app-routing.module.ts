import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'movie-detail/:id', loadChildren: './pages/details/movie-detail/movie-detail.module#MovieDetailPageModule' },
  { path: 'serie-detail/:id', loadChildren: './pages/details/serie-detail/serie-detail.module#SerieDetailPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
