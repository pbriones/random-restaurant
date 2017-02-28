import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Subject } from 'rxjs/subject';
import 'rxjs/add/operator/map';
@Injectable()
export class RestaurantService{
  private url: string = 'http://localhost:8080/api/restaurant';
  private restaurant$: Subject<any> = new Subject();
  constructor(
    private http: Http
  ){}

  getRestaurant(query: any): Subject<any>{
    this.http
      .post(this.url + '/random', query)
      .map((r: Response) => r.json())
      .subscribe(restaurant => this.restaurant$.next(restaurant));

    return this.restaurant$;
  }
}