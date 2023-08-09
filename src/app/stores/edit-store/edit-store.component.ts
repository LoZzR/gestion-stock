import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StoreService } from '../store.service';
import { EntrepriseService } from 'src/app/entreprise/entreprise.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.css']
})
export class EditStoreComponent implements OnInit, OnDestroy {

  private storeWrapperSub: Subscription = null!;
  isLoading = false;
  isSucessSave = false;
  private idCurrentEntreprise: string = null!;

  constructor(private storeService: StoreService, private entrepriseService: EntrepriseService) { }

  ngOnInit(): void {
    this.storeWrapperSub = this.entrepriseService.currentEntrepriseId.subscribe((entrepriseId: string) => {
      this.idCurrentEntreprise = entrepriseId;
    });
  }

  addStore(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;

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

    form.reset();
  }

  cancel(form: NgForm){
    form.reset();
  }

  ngOnDestroy() {
    this.storeWrapperSub.unsubscribe();
  }

}
