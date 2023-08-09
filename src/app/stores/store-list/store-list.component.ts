import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '../store.model';
import { Entreprise } from 'src/app/entreprise/entreprise.model';
import { Subscription } from 'rxjs';
import { EntrepriseService } from 'src/app/entreprise/entreprise.service';
import { StoreService } from '../store.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent  implements OnInit, OnDestroy {

  private entrepriseWrapperSub: Subscription = null!;
  entreprise: Entreprise = null!;
  stores: Store[] = null!;
  editStore = false;

  constructor(private entrepriseService: EntrepriseService, private storeService: StoreService, private router: Router) { }

  ngOnInit(): void {
    this.entrepriseWrapperSub = this.entrepriseService.currentEntrepriseId.subscribe((entrepriseId: String) => {
      this.stores = this.storeService.getListStoreByIdEntreprise(entrepriseId);
    });
  }

  addSotre() {
    this.router.navigateByUrl ('/main/edit-magasin');
  }

  ngOnDestroy() {
    this.entrepriseWrapperSub.unsubscribe();
  }

}
