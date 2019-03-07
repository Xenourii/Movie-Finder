import { Router } from '@angular/router';
import { BookmarkedMedia } from './../../models/bookmarkedMedia';
import { BookmarkService } from './../services/bookmark.service';
import { Component } from '@angular/core';
import * as papa from 'papaparse';
@Component({
  selector: 'app-userTab',
  templateUrl: 'userTab.page.html',
  styleUrls: ['userTab.page.scss']
})
export class UserTabPage {

  medias: BookmarkedMedia[];
  file: File;

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

  async onImportClicked(event){
    var file = event.target.files[0] as File;
    const data = await new Response(file).text();

    if (file.type == "text/xml") {
      console.log("upload xml");
      await this.importXml(data);
    }
    else if (file.type == "application/json"){
      console.log("upload json");
      await this.importJson(data);
    }
    else {
      console.log("unkown format");
    }  
  }

  async onExportClicked(){

  }

  async importJson(data: string){
    var medias = JSON.parse(data) as BookmarkedMedia[];
    await this.addToBookMarck(medias); 
  }

  async importXml(data: string){
    var medias = papa.parse(data).data;
    await this.addToBookMarck(medias);
  }

  async addToBookMarck(medias: BookmarkedMedia[]){
    for (var i in medias) {
      var media = medias[i];
      if (await this.bookmarkService.isMediaAlreadyBookmarked(media) === false){
        await this.bookmarkService.saveToBookmark(media);
      }     
    }
  }
}
