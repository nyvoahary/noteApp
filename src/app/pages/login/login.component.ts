import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private todoService: TodoService) { }
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  ngOnInit(): void {
  }

  logIn() {
    let record = this.loginForm.value;
    this.todoService.logIn(record.email, record.password);
  }
}
