import { TodoService } from './../../services/todo.service';
import { Router } from '@angular/router';
import { Todo } from '../../model/todo.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoList:Todo[]=[]
  todoForm = new FormGroup({
    title : new FormControl('',Validators.required),
    description : new FormControl('',Validators.required)
  })
  constructor(
    private firestoreService:FirestoreService,
    private router: Router,
    public todoService:TodoService
  ) {
  }

  addTodo(){
    let todo:Todo = this.todoForm.value;
    todo.timeStamp = new Date(Date.now());
    todo.state = 'pending';

    this.todoService.addTodo(todo).then(()=>{
      this.todoForm.patchValue({
        title:'',
        description:'',
      });

    }).catch((error)=>{
      console.log(error);
    })
  }
  ngOnInit(): void {
    if(this.todoService.currentUser.userDetails$)
    {this.getTodoList()}
  }

  getTodoList(){
    this.todoService.getTodo().subscribe((res)=>{
      this.todoList = res.map((todo)=>{
        return {
          ...(todo.payload.doc.data() as Todo),
          id: todo.payload.doc.id
        }
      })
    })
  }

}
