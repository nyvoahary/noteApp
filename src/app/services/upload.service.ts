import { TodoService } from './todo.service';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage: AngularFireStorage, private todoService: TodoService) { }
  uploadTask(filePath: any, file: any) {
    return this.storage.upload(filePath, file)
  }
}
