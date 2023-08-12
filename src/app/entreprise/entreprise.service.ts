import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Entreprise } from './entreprise.model';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  
  currentEntrepriseId = new BehaviorSubject<string>(null!);
  currentEntreprise = new BehaviorSubject<Entreprise>(null!);

  constructor(private http: HttpClient) {
  }

  getEntrepriseByIdUser(userId: string): Observable<void> {
    return this.http
      .get<Entreprise>(
        '/entreprises.json?orderBy="userId"&equalTo="'+ userId + '"'
      ).pipe(
        tap( (entrepriseWrapper) => {
          if(entrepriseWrapper === null) {}
          else this.currentEntrepriseId.next(Object.keys(entrepriseWrapper)[0]);
        }),
        map(entrepriseWrapper => {
          this.currentEntreprise.next(Object.values(entrepriseWrapper)[0]);;
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
