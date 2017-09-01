import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Payload } from '../entity/payload';

@Injectable()
export class OptionsService {
  private payload: Payload = {
    price: '1,2',
    radius: 5 * 1609.344
  }
  private options$ = new BehaviorSubject<Payload>(this.payload);
  get options(): Payload {
    return this.options$.getValue();
  }

  set options(payload: Payload) {
    this.options$.next(payload);
  }

  getOptions(): BehaviorSubject<Payload>{
    return this.options$;
  }
}