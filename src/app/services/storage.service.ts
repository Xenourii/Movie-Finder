import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  async get<T>(key: string){
    if(!this.contains){
      var obj: T;
      return obj;
    }
    return await this.getItem<T>(key);
  }

  async add<T>(key: string, item: T) {
    var items: T[];

    if(this.contains(key)){
      items = await this.getItem<T[]>(key);
      if (!items.includes(item)){
        items.push(item);      
      }
    }
    else {
      items = [item];
    }
    await this.set(key, items);
  }

  async remove<T>(key: string, item: T){
    if(!this.contains(key)) return;
    
    var items = await this.getItem<T[]>(key);
    items = items.remove(item);
    await this.set(key, items);
  }

  async removeAll(key: string){
    if(!this.contains(key)) return;
    
    var storage = await this.getStorage();
    await storage.removeItem(key);
  }

  async clear(){
    var storage = await this.getStorage();
    await storage.clear();
  }

  private async set<T>(key: string, items: T){
    var storage = await this.getStorage();
    await storage.setItem(key, items);
  }

  private async getItem<T>(key: string) : Promise<T> {
    var storage = await this.getStorage();
    return await storage.getItem(key);
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