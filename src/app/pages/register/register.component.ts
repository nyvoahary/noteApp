import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
    password: new FormControl('',Validators.compose([
      Validators.required,
      // Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,30}'), //must be at least 1 upperCase,lowerCase,digit and between 8-30
      Validators.minLength(6)])),
    displayName: new FormControl('',Validators.required),
  })
  constructor(
    private todoService: TodoService,
    private fb: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {}

  register() {
    let record: User = this.registerForm.value;
    this.todoService.register(record).then(() => {
    }).catch((error)=>{
      console.log(error.t.message);
    })
  }

}
