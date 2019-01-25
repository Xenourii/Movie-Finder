import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieTabPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: MovieTabPage,
    children: [
      {
        path: 'movieTab',
        children: [
          {
            path: '',
            loadChildren: '../movieTab/movieTab.module#MovieTabPageModule'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
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
