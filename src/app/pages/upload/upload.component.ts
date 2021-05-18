import { AngularFireAuth } from '@angular/fire/auth';
import { UploadService } from '../../services/upload.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators'
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  loading$: any ;
  downloadUrl$: any;
  fileSize: number = 0;
  units: string = '';
  fileLength: number = 0;
  file: File | undefined;
  url = '../../assets/images/blank.png';
  fileName: string = '';

  fileForm = new FormGroup({
    file: new FormControl('', Validators.required)
  });


  constructor(
    private todoService: TodoService,
    private router: Router,
    private uploadService: UploadService,
    private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
  }
  onChange(event: any) {
    // File affect
    const file = event.target.files;
    this.file = file[0];
    this.fileName = file[0].name;
    this.fileLength = file.length;

    // URL Setter
    var reader = new FileReader;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.url = event.target.result;
    }

    //Image size
    if (event.target.files[0].size / 1024 / 1024 < 1) {
      this.fileSize = event.target.files[0].size / 1024;
      this.units = 'Kb'
    } else {
      this.fileSize = event.target.files[0].size / 1024 / 1024;
      this.units = 'Mb'
    }
  }

  uploadTasks() {
    const filePath = 'profilePicture/' + this.todoService.currentUserId + '/' + this.file?.name;
    const fileRef = this.storage.ref(filePath)
    const task = this.uploadService.uploadTask(filePath, this.file);

    //Percentage change
    this.loading$ = task.percentageChanges();

    //DownloadUrl
    task.snapshotChanges().pipe(finalize(() => {
      this.downloadUrl$ = fileRef.getDownloadURL();
      this.todoService.currentUser.updatePicture(this.downloadUrl$);
    })).subscribe()
  }
}
