import { Todo } from './../../model/note';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoForm = new FormGroup({
    title : new FormControl('',Validators.required),
    description : new FormControl('',Validators.required)
  })
  constructor(
    private firestoreService:FirestoreService,
  ) { }

  addTodo(){
    let todo:Todo = this.todoForm.value
    todo.timeStamp = new Date(Date.now())
    this.firestoreService.addTodo(todo).then(()=>{

    })
  }
  ngOnInit(): void {
  }

}
