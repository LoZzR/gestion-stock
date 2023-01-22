import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EntrepriseService } from './entreprise.service';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {
  isLoading = false;
  userId = null;
  isSucessSave = false;

  constructor(private entrepriseService: EntrepriseService, private router: Router) { }

  ngOnInit() {
    const currentUserJson = localStorage.getItem('userData');
    const currentUser = currentUserJson !== null ? JSON.parse(currentUserJson) : null;
    this.userId = currentUser.id;
    this.entrepriseService.getEntrepriseByIdUser(currentUser.id).subscribe(responseData => {
      console.log('*****************************');
      console.log(responseData);
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
