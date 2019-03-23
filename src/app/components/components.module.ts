import { BackButtonTabsDirective } from './back-button-tabs/back-button-tabs.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteButtonComponent } from './favorite-button/favorite-button.component';
import { IonicModule } from '@ionic/angular';
import { BackButtonTabsComponent } from './back-button-tabs/back-button-tabs.component';

@NgModule({
  declarations: [FavoriteButtonComponent, BackButtonTabsDirective, BackButtonTabsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [FavoriteButtonComponent, BackButtonTabsComponent]
})
export class ComponentsModule { }
