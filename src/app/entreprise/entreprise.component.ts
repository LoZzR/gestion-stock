import { Component, OnInit } from '@angular/core';
import { Entreprise } from './entreprise.model';
import { EntrepriseService } from './entreprise.service';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {

  listEntreprise: Entreprise[] = [];

  constructor(private entrepriseService: EntrepriseService) { }

  ngOnInit(): void {
    /*this.entrepriseService.getListEntreprise().subscribe((entreprises: Entreprise[]) => {
      console.log(entreprises);
      this.listEntreprise = entreprises
    });*/
  }

}
