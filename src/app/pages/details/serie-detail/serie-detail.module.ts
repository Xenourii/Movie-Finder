import { ComponentsModule } from './../../../components/components.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BackButtonTabsModule } from 'ion-back-button-tabs';

import { IonicModule } from '@ionic/angular';

import { SerieDetailPage } from './serie-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SerieDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    BackButtonTabsModule,
    RouterModule.forChild(routes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [SerieDetailPage]
})
export class SerieDetailPageModule {}
