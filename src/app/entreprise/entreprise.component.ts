import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Entreprise } from './entreprise.model';
import { EntrepriseService } from './entreprise.service';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {
  @ViewChild('entrepriseForm', { static: false }) entrepriseForm: NgForm = null!;
  isLoading = false;
  private userId = null;
  isSucessSave = false;
  isNewEntreprise = false;

  constructor(private entrepriseService: EntrepriseService, private router: Router) { }

  ngOnInit() {
    const currentUserJson = localStorage.getItem('userData');
    const currentUser = currentUserJson !== null ? JSON.parse(currentUserJson) : null;
    this.userId = currentUser.id;
    this.entrepriseService.getEntrepriseByIdUser(currentUser.id).subscribe((entreprise: Entreprise) => {
        this.isNewEntreprise = !entreprise;
        this.entrepriseForm.setValue({
          company: entreprise.name,
          domain: entreprise.domain,
          adress: entreprise.adress
        })
    })

  }

  saveEntreprise(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;

    this.entrepriseService.storeEntreprise(form.value.company, form.value.domain, form.value.adress, this.userId!).subscribe(
      resData => {
        this.isLoading = false;
        this.isSucessSave = true;
      },
      errorMessage => {
        console.log(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

}
