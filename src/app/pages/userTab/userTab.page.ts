import { FileService } from './../../services/file.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { BookmarkedMedia } from './../../../models/bookmarkedMedia';
import { BookmarkService } from './../../services/bookmark.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
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
  isCordova: boolean;

  constructor(private bookmarkService: BookmarkService,
    private router: Router,
    private socialSharing: SocialSharing,
    private platform: Platform,
    private fileService: FileService) {}

  async ionViewWillEnter(){
    this.medias = await this.bookmarkService.getBookmarkedMedias();
    console.log(this.medias);
    await this.setHrefExportJsonBrowser();
    await this.setHrefExportCsvBrowser();
    this.isCordova = this.platform.is("cordova");
  }

  async onDeleteAllClicked(){
    await this.bookmarkService.clear();
    this.medias = await this.bookmarkService.getBookmarkedMedias();
  }

  async onBookmarkedMediaClick(media: BookmarkedMedia){
    console.log(media.Type);
    if (media.Type == "movie"){
      await this.router.navigate(['/movie-detail/' + media.imdbID]);
    }
    else if (media.Type == "series"){
      await this.router.navigate(['/serie-detail/' + media.imdbID]);
    }
    else if (media.Type == "episode"){
      await this.router.navigate(['/episode-detail/' + media.imdbID]);
    }
    else {
      console.log("Unknown media Type (" + media.Type + ")");
    }
  }

  async onBookmarkedMediaRemove(media){
    await this.bookmarkService.removeFromBookmark(media);
    this.medias = await this.bookmarkService.getBookmarkedMedias();
  }

  async onImportClicked(event) {
    try {
      var file = event.target.files[0] as File;
      const data = await new Response(file).text();

      if (file.type == "text/csv" || "application/vnd.ms-excel") {
        await this.importCsv(data);
      }
      else if (file.type == "application/json"){
        await this.importJson(data);
      }
      else {
        console.log("unkown format");
      }
      
      this.medias = await this.bookmarkService.getBookmarkedMedias();
    } catch (error) {
      console.log(error);
    }
  }

  async onExportJsonClicked(){
    var medias = await this.bookmarkService.getBookmarkedMedias();
    var json = JSON.stringify(medias);
    var filePath = await this.fileService.createFile('json', json);
    this.socialSharing.share("Exported favorite media", "Get your medias as Json", filePath);
  }

  async onExportCsvClicked(){
    var medias = await this.bookmarkService.getBookmarkedMedias();
    var csv = papa.unparse(medias);
    var filePath = await this.fileService.createFile('csv', csv);
    this.socialSharing.share("Exported favorite media", "Get your medias as CSV", filePath);
  }
 
  async importJson(data: string){
    var medias = JSON.parse(data) as BookmarkedMedia[];
    await this.addToBookMarck(medias);
  }

  async importCsv(data: string){
    var medias = papa.parse(data, {header:true}).data;
    await this.addToBookMarck(medias);
  }

  async addToBookMarck(medias: BookmarkedMedia[]) {
    for (var i in medias) {
      var media = medias[i];
      if (await this.bookmarkService.isMediaAlreadyBookmarked(media) === false){
        await this.bookmarkService.saveToBookmark(media);
      }     
    }
  }

  async setHrefExportJsonBrowser() {
    var medias = await this.bookmarkService.getBookmarkedMedias();
    var json = JSON.stringify(medias);
    var data = "application/json;charset=utf-8," + encodeURIComponent(json);
    var element = document.getElementById("exportJsonButton");
    element.setAttribute("href", "data:" + data);    
  }

  async setHrefExportCsvBrowser() {
    var medias = await this.bookmarkService.getBookmarkedMedias();
    var csv = papa.unparse(medias);
    var data = "text/csv;charset=utf-8," + encodeURIComponent(csv);
    var element = document.getElementById("exportCsvButton");
    element.setAttribute("href", "data:" + data);
  }
}