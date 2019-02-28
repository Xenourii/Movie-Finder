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

  constructor(private bookmarkService: BookmarkService) {}

  async ionViewWillEnter(){
    this.medias = await this.bookmarkService.getBookmarkedMedias();
    console.log(this.medias);
  }

  onBookmarkedMediaClick(media){
    // TODO Go to detail page?
  }

  async onBookmarkedMediaRemove(media){
    await this.bookmarkService.removeFromBookmark(media);
    this.medias = await this.bookmarkService.getBookmarkedMedias();
  }
}
