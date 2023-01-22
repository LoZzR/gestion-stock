import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entreprise } from './entreprise.model';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor(private http: HttpClient) {
  }

  getListEntreprise(): Observable<Entreprise[]> {
    return this.http
      .get<Entreprise[]>(
        '/entreprises.json'
      );
  }

  getEntrepriseById(): Observable<Entreprise> {
    return this.http
      .get<Entreprise>(
        '/entreprises/-NMBNbtM_mX4Eoak-n00.json'
      );
  }

  storeListEntreprise() {
    const entreprise = new Entreprise('test2', 'test2', 'test2');
    return this.http
      .post(
        '/entreprises.json', entreprise
      ).subscribe(response => {
        console.log(response);
      });
  }
}
