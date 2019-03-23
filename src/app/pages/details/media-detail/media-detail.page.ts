import { BookmarkService } from './../../../services/bookmark.service';
import { BookmarkedMedia } from './../../../../models/bookmarkedMedia';

export class MediaDetailPage {
  isFavorite: boolean;

  protected bookemarkedMedia: BookmarkedMedia;

  constructor(protected bookmarkService: BookmarkService) { }

  async onFavoriteButtonClicked(){
    this.isFavorite = !this.isFavorite;

    if (this.isFavorite == true){
      await this.saveMediaToBookmark();
    }
    else {
      this.removeMediaFromBookmark();
    }
  }

  async saveMediaToBookmark(){
    await this.bookmarkService.saveToBookmark(this.bookemarkedMedia);
  }

  async removeMediaFromBookmark(){
    await this.bookmarkService.removeFromBookmark(this.bookemarkedMedia);
  }

}