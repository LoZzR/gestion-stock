import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  getEntrepriseByIdUser(userId: string): Observable<Entreprise> {
    return this.http
      .get<Entreprise>(
        '/entreprises.json?orderBy="userId"&equalTo="'+ userId + '"'
      ).pipe(map(entrepriseWrapper => {
          return Object.values(entrepriseWrapper)[0];
      }));
  }

  storeEntreprise(name: string, domain: string, adress: string, userId: string) {
    const entreprise = new Entreprise(name, domain, adress, userId);
    return this.http
      .post(
        '/entreprises.json', entreprise
      );
  }
}
