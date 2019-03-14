import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
export class FavoriteButtonComponent {

  @Input('isFavorite') isFavorite: boolean;
  @Output() isFavoriteChanged = new EventEmitter<boolean>();

  buttonColor: string = "light";
  buttonText: string;
  starState: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) { 
    let chng = changes['isFavorite'];
    this.isFavorite = JSON.parse(chng.currentValue);

    this.updateButtonState();
  }

  private updateButtonState(){
    if (this.isFavorite == true){
      this.buttonText = "Bookmarked";
      this.starState = "star";
    }
    else {
      this.buttonText = "Add to favorites";
      this.starState = "star-outline";
    }
  }

}
