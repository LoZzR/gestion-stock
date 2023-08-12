import { Component, OnDestroy, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Entreprise } from './entreprise.model';
import { EntrepriseService } from './entreprise.service';
import { USER_KEY } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit, OnDestroy  {
  @ViewChildren('entrepriseForm') entrepriseForm: QueryList<NgForm> = null!;
  private entrepriseSub: Subscription = null!;
  private entrepriseIdSub: Subscription = null!;
  isLoading = false;
  private userId = null;
  isSucessSave = false;
  isNewEntreprise = false;
  isModify = false;

  constructor(private entrepriseService: EntrepriseService) { }

  ngOnInit() {
    this.getCurrentEntreprise();
  }

  saveEntreprise(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;

    if(!this.isNewEntreprise) {
      this.entrepriseIdSub = this.entrepriseService.currentEntrepriseId.subscribe((entrepriseId: string) => {
        this.entrepriseService.updateEntreprise(entrepriseId, new Entreprise(form.value.company, form.value.domain, form.value.adress, this.userId!)).subscribe(
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
      });
    }
    else {
      this.entrepriseService.storeEntreprise(form.value.company, form.value.domain, form.value.adress, this.userId!).subscribe(
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

    form.reset();
  }

  modifyEntreprise() {
    this.isModify = true;
  }

  cancel(){
    this.getCurrentEntreprise();
    this.isModify = false;
  }

  createNewEntreprise() {
    this.isNewEntreprise = false;
    this.isModify = true;
  }

  ngOnDestroy() {
    this.entrepriseSub.unsubscribe();
    if(this.entrepriseIdSub !== null) this.entrepriseIdSub.unsubscribe();
  }

  private getCurrentEntreprise() {
    const currentUserJson = localStorage.getItem(USER_KEY);
    const currentUser = currentUserJson !== null ? JSON.parse(currentUserJson) : null;
    this.userId = currentUser.id;
    this.entrepriseSub = this.entrepriseService.currentEntreprise.subscribe((entreprise: Entreprise) => {
        this.isNewEntreprise = !entreprise;
        if(!this.isNewEntreprise) {
          setTimeout(() => {
            this.entrepriseForm.first.setValue({
              company: entreprise.name,
              domain: entreprise.domain,
              adress: entreprise.adress
            })
          });
        }
    });
  }

}
