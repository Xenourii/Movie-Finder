import { StorageService } from './storage.service';
import { BookmarkedMedia } from './../../models/bookmarkedMedia';
import { Injectable } from '@angular/core';

const bookmarkedMediaKey: string = "bookmarkedMediaKey";

@Injectable({
  providedIn: 'root'
})

export class BookmarkService {

  constructor(private storage: StorageService) { }

  async isMediaAlreadyBookmarked(media: BookmarkedMedia) : Promise<boolean> {
    try {
      var bookmarkedMedias = await this.storage.get<BookmarkedMedia[]>(bookmarkedMediaKey);
      return bookmarkedMedias.includes(media);
    } catch (error) {
      console.log(error);
    }
  }

  async saveToBookmark(media: BookmarkedMedia) {
    try {
      this.storage.add<BookmarkedMedia>(bookmarkedMediaKey, media);
    } catch (error) {
      console.log(error);
    }
  }

  async removeFromBookmarck(media: BookmarkedMedia) {
    try {
      await this.storage.remove<BookmarkedMedia>(bookmarkedMediaKey, media);
    } catch (error) {
      console.log(error);
    }
  }

  async getBookmarkedMedias() : Promise<BookmarkedMedia[]>{
    try {
      return this.storage.get<BookmarkedMedia[]>(bookmarkedMediaKey);
    } catch (error) {
      console.log("Bookmark error =" + error);
    }
  }
}
