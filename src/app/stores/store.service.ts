import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Store } from './store.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  currentStores = new BehaviorSubject<Store[]>(null!);

  constructor(private http: HttpClient) {}

  getListStoreById(idEntreprise: string): Observable<Store[]> {
    return this.http
      .get<Store[]>(
        '/stores.json?orderBy="idEntreprise"&equalTo="'+ idEntreprise + '"'
      ).pipe(
        map(storesWrapper => {
          const stores = Object.values(storesWrapper);
          stores.forEach((value, index) => {
            value.idStore = Object.keys(storesWrapper)[index];
          });
          this.currentStores.next(stores);
          return stores;
      }))
  }

  getStoreById(idStore: string) {
    return this.http
      .get<Store>('/stores/' + idStore + '.json');
  }
  
  addStore(title: string, adress: string, idEntreprise: string) {
    const store = new Store(title, adress, idEntreprise);
    return this.http
      .post(
        '/stores.json', store
      );
  }

  editSore(idStore: string, store: Store) {
    return this.http
      .put(
        '/stores/' + idStore + '.json', store
      );
  }

  deleteStore(idStore: string) {
    this.removeStore(idStore, this.currentStores.getValue());
    return this.http
    .delete(
      '/stores/' + idStore + '.json'
    );
  }

  private removeStore(idStore: string, listStore: Store[]) {
    let indexStore = 0;
    for(let i = 0; i < listStore.length ; i++){
      if(idStore === listStore[i].idStore){
        indexStore = i;
        break;
      }
    }
    
    listStore.splice(indexStore, 1);
    this.currentStores.next(listStore.slice());
  }
}
