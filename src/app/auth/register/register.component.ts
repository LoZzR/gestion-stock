import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  passwordValue = null;
  passwordConfirmationValue = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;

    this.authService.signup(form.value.email,
      form.value.password,
      form.value.firstname,
      form.value.lastname).subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/main']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
