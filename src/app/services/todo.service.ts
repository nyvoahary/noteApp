import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  authState: any = {};

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) {

    this.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.authState = user
        console.log('UserId', user);
      } else {
        console.log('User signed out');
      }
    })
  }

  //  REGISTER
  register(record: User) {
    return this.fireAuth.createUserWithEmailAndPassword(record.email, record.password).then((user) => {
      this.authState = user.user;
      this.authState.updateProfile({ displayName: record.displayName });
      this.authState.sendEmailVerification();
      console.log(this.authState);

    }).catch((error) => {
      console.log(error.message);
      this.router.navigate(['register'])
    });
  }

  // LOGOUT
  logOut(): void {
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log(error);
    })
  }

  // LOGIN
  logIn(email: string, password: any) {
    return this.fireAuth.signInWithEmailAndPassword(email, password).then((user) => {
      this.authState = user.user;
      console.log(user);
      console.log('Login Successfully');

      this.router.navigate(['/todo'])
    }).catch((error) => {
      console.log(error);
      console.log('Error Message: ' + error.message);

      if (error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
        this.router.navigate(['/register'])
      } else {
        this.router.navigate(['/login'])
      }
    })
  }

  // Firebase data getter functions
  get isUserAnonymousLoggedIn(): boolean {
    return this.authState !== null ? this.authState.isAnonymous : false;
  }
  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }
  get currentUserName(): string {
    return this.authState['email'];
  }
  get currentUser(): any {
    return this.authState !== null ? this.authState : null;
  }
  get isUserEmailLoggedIn(): boolean {
    if (this.authState !== null && !this.isUserAnonymousLoggedIn) {
      return true;
    } else {
      return false;
    }
  }
}
