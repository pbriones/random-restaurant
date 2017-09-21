import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Subject } from 'rxjs/subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs/Observable";
import { Restaurant } from '../entity/restaurant';
@Injectable()
export class RestaurantService {
  private url = 'http://brownies-server.azurewebsites.net/api/restaurant';
  constructor(
    private http: Http
  ) { }

  getRestaurant(query: any): Observable<Restaurant> {
    return this.http 
      .post(this.url + '/random', query)
      .map((r: Response) => r.json())
      .catch(() => Observable.of(null))
  }
}