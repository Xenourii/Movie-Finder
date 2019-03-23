import { TabsPage } from './tabs.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'movieTab',
        children: [
          {
            path: '',
            loadChildren: '../mediaTab/movieTab/movieTab.module#MovieTabPageModule'
          }
        ]
      },
      {
        path: 'serieTab',
        children: [
          {
            path: '',
            loadChildren: '../mediaTab/serieTab/serieTab.module#SerieTabPageModule'
          }
        ]
      },
      {
        path: 'userTab',
        children: [
          {
            path: '',
            loadChildren: '../userTab/userTab.module#UserTabPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'movieTab',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
