import { TestBed } from '@angular/core/testing';

import { BSubjectService } from './b-subject.service';

describe('BSubjectService', () => {
  let service: BSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
