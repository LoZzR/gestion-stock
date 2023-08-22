import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StoreService } from '../store.service';
import { EntrepriseService } from 'src/app/entreprise/entreprise.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../store.model';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.css']
})
export class EditStoreComponent implements OnInit, OnDestroy {

  private entrepriseWrapperSub: Subscription = null!;
  isLoading = false;
  isSucessSave = false;
  private idCurrentEntreprise: string = null!;
  private idCurrentStore: string = null!;
  store: Store = new Store('', '', '', '');

  constructor(private storeService: StoreService,
              private entrepriseService: EntrepriseService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.entrepriseWrapperSub = this.entrepriseService.currentEntrepriseId.subscribe((entrepriseId: string) => {
      this.idCurrentEntreprise = entrepriseId;
    });
    const isStoreParams = this.route.snapshot.paramMap.get('storeId');
    if(isStoreParams !== null) {
      this.idCurrentStore = String(isStoreParams);
      this.storeService.getStoreById(this.idCurrentStore).subscribe((store: Store) => {
        this.store = store;
      });
    }
  }

  addStore(form: NgForm) {
    if (!form.valid) {
      return;
    }
    
    this.isLoading = true;

    if(this.idCurrentStore === null) {
      this.storeService.addStore(form.value.title, form.value.adress, this.idCurrentEntreprise).subscribe(
        resData => {
          this.isLoading = false;
          this.isSucessSave = true;
        },
        errorMessage => {
          console.log(errorMessage);
          this.isLoading = false;
          this.isSucessSave = false;
        }
      );
    }
    else {
      this.editStore();
    }

    form.reset();
  }

  editStore() {
    this.storeService.editSore(this.idCurrentStore, this.store).subscribe(resData => {
      this.isLoading = false;
      this.isSucessSave = true;
    },
    errorMessage => {
      console.log(errorMessage);
      this.isLoading = false;
      this.isSucessSave = false;
    });
  }

  previousPage() {
    this.router.navigate(['/main/magasins']);
  }

  ngOnDestroy() {
    this.entrepriseWrapperSub.unsubscribe();
  }

}
