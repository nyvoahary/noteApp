import { TodoService } from './todo.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Todo } from '../model/todo.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private db: AngularFirestore,
    private todoService: TodoService,
  ) {
    this.todoService.authState$.subscribe(user => {
      if (user) {
        this.todoCollection = this.userCollection.doc(`${user.uid}`).collection('todoList');
        this.userDocument = this.userCollection.doc(`${user.uid}`);
        //getting 
        this.userDocument!.valueChanges().subscribe((userData)=>{
          this.userDetails= userData
          this.userDetails$.next(userData)
        })
      }
    });
  }

  userDetails:any;
  userDetails$ = new BehaviorSubject<any>(null)
  userCollection = this.db.collection('users');
  userDocument: AngularFirestoreDocument | undefined
  todoCollection: AngularFirestoreCollection | undefined;
  todoCollectionSpecific = this.userCollection.doc(`DkSnCEypd6O5CoU1AzTlMWSv4f53`).collection('todoList');

  getTodo() {
    return this.todoCollection!.snapshotChanges()
  }
  getUserDetails() {
    return this.userDocument!.snapshotChanges();
  }

  addTodo(record: Todo) {
    return this.todoCollection!.add(record)
  }

  addUrl(url: any) {
    return this.userDocument!.set({ downloadUrl: url })
  }
  updateUrl(url: any) {
    console.log(url);
    this.userDocument!.update(
      {
        downloadUrl: url
      }
    ).then(() => {
      console.log('then');
    })
  }
}
