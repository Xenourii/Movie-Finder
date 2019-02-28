import { Router } from '@angular/router';
import { BookmarkedMedia } from './../../models/bookmarkedMedia';
import { BookmarkService } from './../services/bookmark.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-userTab',
  templateUrl: 'userTab.page.html',
  styleUrls: ['userTab.page.scss']
})
export class UserTabPage {

  medias: BookmarkedMedia[];

  constructor(private bookmarkService: BookmarkService, private router: Router) {}

  async ionViewWillEnter(){
    this.medias = await this.bookmarkService.getBookmarkedMedias();
    console.log(this.medias);
  }

  async onBookmarkedMediaClick(media: BookmarkedMedia){
    console.log(media.Type);
    if (media.Type == "movie"){
      await this.router.navigate(['/movie-detail/' + media.imdbID]);
    }
    else if (media.Type == "serie"){
      await this.router.navigate(['/serie-detail/' + media.imdbID]);
    }
    else {
      console.log("Unknown media Type (" + media.Type + ")");
    }
  }

  async onBookmarkedMediaRemove(media){
    // fix(item-sliding): Sliding no longer breaks after removing an item
    // https://github.com/ionic-team/ionic/pull/17492/files
    await this.bookmarkService.removeFromBookmark(media);
    this.medias = await this.bookmarkService.getBookmarkedMedias();
  }

  async onImportClicked(){
    
  }

  async onExportClicked(){

  }
}
