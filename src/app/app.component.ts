import { TodoService } from './services/todo.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Application';
  constructor(private todoService:TodoService){}
  logOut(){
    this.todoService.logOut()
  }
}
