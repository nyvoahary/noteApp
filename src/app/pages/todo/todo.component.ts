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
  todoForm = new FormGroup({
    title : new FormControl('',Validators.required),
    description : new FormControl('',Validators.required)
  })
  constructor(
    private firestoreService:FirestoreService,
    private router: Router,
  ) { }

  addTodo(){
    let todo:Todo = this.todoForm.value;
    todo.timeStamp = new Date(Date.now());
    todo.state = 'pending';

    this.firestoreService.addTodo(todo).then(()=>{
      this.todoForm.patchValue({
        title:'',
        description:'',
      });
      console.log();

    }).catch((error)=>{
      console.log(error);

    })
  }
  ngOnInit(): void {
  }

}
