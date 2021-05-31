import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../model/todo.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  //AUTHSTATE
  authState: any = {};
  authState$ = new BehaviorSubject<any | null>(null)

  //FIREBASE
  //User
  userDocument: AngularFirestoreDocument | undefined
  userCollection = this.db.collection('users');
  userDetails: any;
  userDetails$ = new BehaviorSubject<any>(null)
  //Todo
  todoCollection: AngularFirestoreCollection | undefined;
  todoList: Todo[] = [];



  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
  ) {
    this.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.authState = user
        console.log(user)
        this.authState$.next(user)
        this.authState$.subscribe(user => {
          if (user) {
            this.todoCollection = this.userCollection.doc(user.uid).collection('todoList')
            this.userDocument = this.userCollection.doc(user.uid)
            this.getTodoList()
            //listening to the userDetails
            this.userDocument!.valueChanges().subscribe((userData) => {
              this.userDetails = userData
              this.userDetails$.next(userData)
            })
          }
        })
      } else {
        this.authState = null
        this.authState$.next(null)
        this.userDetails$.next(null)
        console.log('User signed out');
      }
    })
  }

  //USER MANAGEMENT
  //  REGISTER
  register(record: User) {
    return this.fireAuth.createUserWithEmailAndPassword(record.email, record.password).then((user) => {
      if (user) {
        this.authState$.next(user.user)
      }
      this.authState = user.user;
      this.authState.updateProfile({ displayName: record.displayName });
      this.authState.sendEmailVerification();
      console.log(this.authState);
      this.addUrl();
      this.router.navigate(['/upload'])
    }).catch((error) => {
      console.log(error.message);
      this.router.navigate(['/register'])
    });
  }

  // LOGOUT
  logOut(): void {
    this.fireAuth.signOut()
    this.router.navigate(['/login']);
  }


  // LOGIN
  logIn(email: string, password: any) {
    return this.fireAuth.signInWithEmailAndPassword(email, password).then((user) => {
      if (user) {
        this.authState$.next(user.user);
      }
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
    return this.authState$ !== null ? this.authState.isAnonymous : false;
  }
  get currentUserId(): string {
    return this.authState$ !== null ? this.authState.uid : '';
  }
  get currentUserName(): string {
    return this.authState !== null ? this.authState['displayName'] : '';
  }
  get currentUserEmail(): string {
    return this.authState !== null ? this.authState['email'] : '';
  }
  get isVerified(): boolean {
    return this.authState !== null ? this.authState['emailVerified'] : null;
  }
  get currentUser(): any {
    return this.authState$ !== null ? this.authState$ : null;
  }
  get isUserEmailLoggedIn(): boolean {
    if (this.authState !== null && !this.isUserEmailLoggedIn) {
      return true;
    } else {
      return false;
    }
  }


  //FIREBASE SERVICES
  //TODO
  addTodo(record: Todo) {
    return this.todoCollection!.add(record)
  }
  getTodo() {
    return this.todoCollection!.snapshotChanges();
  }
  getTodoList() {
    if (this.currentUser) {
      this.todoCollection!.snapshotChanges().subscribe((res) => {
        this.todoList = res.map((users) => {
          return {
            ...(users.payload.doc.data() as Todo),
            id: users.payload.doc.id
          }
        })
        console.log(this.todoList);
      })
    } else {
      console.log('User signedOut, Impossible to fetch todoList');
    }
  }
  deleteTodo(todo: Todo) {
    return this.todoCollection!.doc(todo.id)
  }
  //USER
  getUserDetails() {
    return this.userDocument!.snapshotChanges();
  }
  addUrl() {
    return this.userDocument!.set({ downloadUrl: "https://firebasestorage.googleapis.com/v0/b/naut-kou.appspot.com/o/default%2Favatar.png?alt=media&token=e988b2e9-e418-4ec6-b538-1dbe68fb8175" })
  }
  updateUrl(url: any) {
    console.log(url);
    this.userDocument!.update({
      downloadUrl: url
    }).then(() => {
      this.router.navigate(['/todo']).catch((error) => {
        console.log(error);
      })
    })
  }
}
