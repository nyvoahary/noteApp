import { TodoService } from './services/todo.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  state: any;
  userEmail: any
  us$ = this.todoService.userDetails$
  constructor(
    public todoService: TodoService,
  ) {
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.todoService.authState$.subscribe((user) => {
      if (user) {
        console.log(user);
        this.state = user
        this.userEmail = this.todoService.currentUserName
        console.log(this.userEmail);
      }
    });
  }
  logOut() {
    this.todoService.logOut()
  }
  getUserDetails() {
    this.todoService.getUserDetails().subscribe((userData) => {
      console.log(userData);
    })
  }
}
