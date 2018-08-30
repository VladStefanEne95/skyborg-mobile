import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class StorageProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello StorageProvider Provider');
  }

}
