import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteButtonComponent } from './favorite-button/favorite-button.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FavoriteButtonComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [FavoriteButtonComponent]
})
export class ComponentsModule { }
