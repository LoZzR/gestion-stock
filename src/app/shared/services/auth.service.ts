import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null!);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string, firstname: string, lastname: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBycfUGdH6urb3nVp6tSbWjEW1plCXFgqE',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            firstname,
            lastname,
            resData.idToken,
            +resData.expiresIn,
            true
          );
        })
      );
  }

  // Sign in with email/password
  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBycfUGdH6urb3nVp6tSbWjEW1plCXFgqE',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      ).pipe(catchError(this.handleError));
   
  }

  setAuthenticatedUserInfos(resData: AuthResponseData) {
    return this.http
      .get(
        '/users.json?orderBy="id"&equalTo="' + resData.localId + '"'
      )
      .pipe(
        catchError(this.handleError),
        tap((user) => {
          const userInfo = Object.values(user)[0];
          this.handleAuthentication(
            resData.email,
            resData.localId,
            userInfo['firstname'],
            userInfo['lastname'],
            resData.idToken,
            +resData.expiresIn,
            false
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      id: string;
      firstname: string;
      lastname: string;
      email: string;
     _token: string;
    _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData.firstname,
      userData.lastname,
      userData.email,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null!);
    this.router.navigate(['/signin']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private saveUser(user: User) {
    return this.http
      .post(
        '/users.json', user
      ).subscribe();
  }

  private handleAuthentication(
    email: string,
    userId: string,
    firstname: string,
    lastname: string,
    token: string,
    expiresIn: number,
    isSignup: boolean
  ) {
    const userInfo = new User(userId, firstname, lastname);
    if (isSignup) this.saveUser(userInfo);
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(userId, firstname, lastname, email, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}