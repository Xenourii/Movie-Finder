import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private file: File) { }

  async createFile(type: string, data: string) : Promise<string> {
    var filename = "favorites";
    if (type === "json") {
      filename += ".json";
    }
    else {
      filename += ".csv";
    }

    await this.file.copyFile(this.file.applicationDirectory + '/www/assets/exports', 'empty', this.file.applicationStorageDirectory, filename);
    await this.file.writeExistingFile(this.file.applicationStorageDirectory, filename, data);
    
    var filePath = this.file.applicationStorageDirectory + "/" + filename;
    return filePath;
  }

}
