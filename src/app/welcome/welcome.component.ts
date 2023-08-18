import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/services/user.model';
import { EntrepriseService } from '../entreprise/entreprise.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  private userSub: Subscription = null!;
  userName: string = '';

  constructor(private authService: AuthService, private entrepriseService: EntrepriseService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user: User) => {
      this.entrepriseService.getEntrepriseByIdUser(user.id).subscribe();
      if(!!user) this.userName = user.firstname + ' ' + user.lastname
    });
  }
  

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
