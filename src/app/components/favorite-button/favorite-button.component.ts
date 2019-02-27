import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
export class FavoriteButtonComponent implements OnInit {

  @Input('isFavorite') isFavorite: boolean;
  @Output() isFavoriteChanged = new EventEmitter<boolean>();

  buttonColor: string = "light";
  buttonText: string;
  starState: string;

  constructor() { }

  ngOnInit() {
    this.updateButtonState();
  }

  onButtonClick(){
    this.isFavorite = !this.isFavorite;
    this.updateButtonState();
    this.emit();
  }

  private updateButtonState(){
    if (this.isFavorite === true){
      this.buttonText = "Bookmarked";
      this.starState = "star";
    }
    else {
      this.buttonText = "Add to favorites";
      this.starState = "star-outline";
    }
  }

  emit() {
    this.isFavoriteChanged.emit(this.isFavorite);
  }

}
