import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Store } from './store.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) {}

  getListStoreByIdEntreprise(idEntreprise: String): Store[] {
    return [
            new Store("test1", "test1", "test1"),
            new Store("test2", "test2", "test2"),
            new Store("test3", "test3", "test3")
          ];
  }

  getListStoreById(idEntreprise: string): Observable<Store[]> {
    return this.http
      .get<Store[]>(
        '/stores.json?orderBy="idEntreprise"&equalTo="'+ idEntreprise + '"'
      ).pipe(
        map(storesWrapper => {
          return Object.values(storesWrapper);
      }))
  }
  
  addStore(title: string, adress: string, idEntreprise: string) {
    const store = new Store(title, adress, idEntreprise);
    return this.http
      .post(
        '/stores.json', store
      );
  }
}
