import { Todo } from './../model/todo.model';
import { TodoService } from './todo.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  todoList: Todo[]=[];
  constructor(
    private db: AngularFirestore,
    private todoService: TodoService,
  ) {
    this.todoService.authState$.subscribe(user => {
      if (user) {
        this.todoCollection = this.userCollection.doc(`${user.uid}`).collection('todoList');
        this.getTodoList()
        this.userDocument = this.userCollection.doc(`${user.uid}`);
        //listening to the userDetails
        this.userDocument!.valueChanges().subscribe((userData) => {
          this.userDetails = userData
          this.userDetails$.next(userData)
        })
      }
    });
  }

  userDetails: any;
  userDetails$ = new BehaviorSubject<any>(null)

  userCollection = this.db.collection('users');
  userDocument: AngularFirestoreDocument | undefined
  todoCollection: AngularFirestoreCollection | undefined;

  getTodoList() {
    this.todoCollection!.snapshotChanges().subscribe((res) => {
      this.todoList = res.map((users) => {
        return {
          ...(users.payload.doc.data() as Todo),
          id: users.payload.doc.id
        }
      })
      // console.log(this.todoList);

    })
  }
  addTodo(record: Todo) {
    return this.todoCollection!.add(record)
  }


  deleteTodo(todo:Todo){
    return this.todoCollection!.doc(`${todo.id}`).delete();
  }

  getUserDetails() {
    return this.userDocument!.snapshotChanges();
  }

  //call on signup
  addUrl() {
    return this.userDocument!.set({ downloadUrl: "https://firebasestorage.googleapis.com/v0/b/naut-kou.appspot.com/o/default%2Favatar.png?alt=media&token=e988b2e9-e418-4ec6-b538-1dbe68fb8175" })
  }

  //on upload
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
