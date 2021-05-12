import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  authState: any = {};

  constructor(
    private fireAuth: AngularFireAuth,
  ) { }
  register(record: User) {
    return this.fireAuth.createUserWithEmailAndPassword(record.email, record.password).then((user) => {
      this.authState = user.user;
      user.user?.updateProfile({ displayName: record.displayName })
    })
  }
}
