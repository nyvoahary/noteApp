import { TodoService } from './todo.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Todo } from '../model/note';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private db: AngularFirestore,
    private todoService: TodoService,
  ) { }

  userCollection = this.db.collection('users');
  todoCollection = this.userCollection.doc(`${this.todoService.currentUserId}`).collection('todoList');
  todoCollectionSpecific = this.userCollection.doc(`DkSnCEypd6O5CoU1AzTlMWSv4f53`).collection('todoList');

  addTodo(record:Todo){
    return this.todoCollectionSpecific.add(record)
  }

}
