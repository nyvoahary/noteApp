import { FirestoreService } from './services/firestore.service';
import { TodoService } from './services/todo.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  us$ =this.firestoreService.userDetails$ 
  constructor(
    private todoService:TodoService,
    private firestoreService:FirestoreService,
    ){}
  logOut(){
    this.todoService.logOut()
  }
  getUserDetails(){
  this.firestoreService.getUserDetails().subscribe((userData)=>{
    console.log(userData);
  })
  }
}
