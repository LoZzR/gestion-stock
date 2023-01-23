import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/services/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;

    this.authService.signIn(form.value.email,
      form.value.password).subscribe(
      resData => {
        console.log(resData);
        this.authService.setAuthenticatedUserInfos(resData).subscribe((user: User) => {
          console.log(user);
          this.isLoading = false;
          this.router.navigate(['/main']);}
        )
      },
      errorMessage => {
        console.log(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
