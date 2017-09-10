import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Payload } from '../entity/payload';
import {ReplaySubject} from 'rxjs/replaySubject'

@Injectable()
export class PayloadService {
  private payload$ = new ReplaySubject<Payload>(1);
  get payload(): Observable<Payload>{
    return this.payload$.asObservable();
  }

  set payload(payload: Observable<Payload>) {
    payload
      .subscribe(payload =>
        this.payload$.next(this.cleanPayload(payload)));
  }

  private cleanPayload(payload: Payload): Payload {
    Object.keys(payload).forEach(key => {
      if (!payload[key]) delete payload[key];
    });
    return payload;
  }
}