import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  async get<T>(key: string) : Promise<T> {
    if (await this.contains(key) === false) {
      return null;
    }
    var storage = await this.getStorage();
    return await storage.getItem(key) as T;
  }

  async set<T>(key: string, items: T){
    var storage = await this.getStorage();
    await storage.setItem(key, items);
  }

  async remove(key: string){
    if (await this.contains(key) === false) return;
    
    var storage = await this.getStorage();
    await storage.removeItem(key);
  }

  async clear(){
    var storage = await this.getStorage();
    await storage.clear();
  }

  private async contains(key: string) : Promise<Boolean> {
    var storage = await this.getStorage();
    var keys = await storage.keys();
    return keys.includes(key);
  }

  private async getStorage() : Promise<LocalForage> {
    return await this.storage.ready();
  }
}