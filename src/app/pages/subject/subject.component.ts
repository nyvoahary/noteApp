import { ReplayService } from './../../services/replay.service';
import { FormControl } from '@angular/forms';
import { SubjectService } from './../../services/subject.service';
import { Component, OnInit } from '@angular/core';
import { BSubjectService } from 'src/app/services/b-subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  inputBinding$ = new FormControl()
  test: any | undefined
  subject: number | undefined;
  bSubject: number | undefined;
  repData: number[] = [];
  constructor(
    private subjectService: SubjectService,
    private bSubjectService: BSubjectService,
    private replayService: ReplayService
  ) { }

  ngOnInit(): void {
    this.subjectService.subj.next(2)
    this.subjectService.subj.subscribe((value) => {
      this.subject = value;
      console.log('Subject loaded');

    })
    this.bSubjectService.bSubj.next(2)
    this.bSubjectService.bSubj.subscribe((value) => {
      this.bSubject = value;
      console.log('BehavoirSubject loaded');
    })
    //InputBinding
    this.inputBinding$.valueChanges.subscribe((val) => {
      this.test = val
    })

    //replaySubject
    this.replayService.repSubj.next(1)
    this.replayService.repSubj.next(2)
    this.replayService.repSubj.next(3)
    this.replayService.repSubj.next(4)
    this.replayService.repSubj.next(5)
    this.replayService.repSubj.next(6)
    this.replayService.repSubj.subscribe((data) => {
      this.repData.push(data)
    })
  }
  sendData() {
    this.subjectService.subj.next(Math.floor(Math.random() * 100) + 1);
    this.bSubjectService.bSubj.next(Math.floor(Math.random() * 100) + 1);
  }
}
