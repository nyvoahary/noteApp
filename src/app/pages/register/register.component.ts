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
    email: new FormControl(''),
    password: new FormControl(''),
    displayName: new FormControl(''),
  })
  constructor(private todoService: TodoService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {}

  register() {
    let record: User = this.registerForm.value;
    this.todoService.register(record).then(() => {
      this.router.navigate(['/todo']);
    }).catch((error)=>{
      console.log(error.t.message);
    })
  }

}
