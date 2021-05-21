import { FirestoreService } from './../../services/firestore.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UploadService } from '../../services/upload.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators'
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  loading$: any;
  // urlPhoto:any='';
  downloadUrl$ = new BehaviorSubject<any | null>(null)
  downloadUrl: any;
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
    private firestoreService: FirestoreService,
    private storage: AngularFireStorage) {
    this.downloadUrl$.subscribe((url) => {
      this.downloadUrl = url;
    })
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
      let urlPhoto = fileRef.getDownloadURL();
      this.downloadUrl$.next(urlPhoto);
      urlPhoto.subscribe((test) => {
        console.log(test);
        urlPhoto = test;
        this.firestoreService.updateUrl(urlPhoto)
      })
      console.log('voantso service');


    })).subscribe();


  }
}
