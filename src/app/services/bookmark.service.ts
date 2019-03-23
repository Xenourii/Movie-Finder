import { StorageService } from './storage.service';
import { BookmarkedMedia } from './../../models/bookmarkedMedia';
import { Injectable } from '@angular/core';

const bookmarkedMediaKey: string = "bookmarkedMediaKey";

@Injectable({
  providedIn: 'root'
})

export class BookmarkService {

  constructor(private storage: StorageService) { }  

  async saveToBookmark(media: BookmarkedMedia) {
    try {
      var bookmarkedMedias = await this.getBookmarkedMedias();
      if (bookmarkedMedias != null && !this.isMediaIncluedIn(media, bookmarkedMedias)) {
        bookmarkedMedias.push(media);
      }
      else {
        bookmarkedMedias = [media];
      }

      await this.storage.set(bookmarkedMediaKey, bookmarkedMedias);
    } catch (error) {
      console.log(error);
    }
  }

  async removeFromBookmark(media: BookmarkedMedia) {
    try {
      var bookmarkedMedias = await this.getBookmarkedMedias();
      if (bookmarkedMedias === null){
        console.log("Try to remove bookmarked media" + media.Title + ", but no one is stored.");
        return;
      };

      bookmarkedMedias = bookmarkedMedias.filter(e => e.imdbID != media.imdbID);
      await this.storage.set(bookmarkedMediaKey, bookmarkedMedias);

    } catch (error) {
      console.log(error);
    }
  }

  async getBookmarkedMedias() : Promise<BookmarkedMedia[]>{
    try {
      return await this.storage.get<BookmarkedMedia[]>(bookmarkedMediaKey);
    } catch (error) {
      console.log("Bookmark error =" + error);
    }
  }

  async isMediaAlreadyBookmarked(media: BookmarkedMedia) : Promise<boolean> {
    try {
      var bookmarkedMedias = await this.storage.get<BookmarkedMedia[]>(bookmarkedMediaKey);
      console.log(bookmarkedMedias);
      console.log(this.isMediaIncluedIn(media, bookmarkedMedias));
      return this.isMediaIncluedIn(media, bookmarkedMedias);
    } catch (error) {
      console.log(error);
    }
  }

  async clear() {
    await this.storage.clear();
  }

  private isMediaIncluedIn(media: BookmarkedMedia, medias: BookmarkedMedia[]) : boolean {
    for (let i in medias) {
      if (medias[i].imdbID == media.imdbID) {
        return true;
      }
    }
    return false;
  }
}
