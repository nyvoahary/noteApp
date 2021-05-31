import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReplayService {
  repSubj = new ReplaySubject<number>(2)
  constructor() { }
}
