import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Subject } from 'rxjs/subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from "rxjs/Observable";
@Injectable()
export class RestaurantService{
  private url: string = 'http://brownies-server.azurewebsites.net/api/restaurant';
  private restaurant$: Subject<any> = new Subject();
  constructor(
    private http: Http
  ){}

  getRestaurant(query: any){
    this.http
      .post(this.url + '/random', query)
      .map((r: Response) => r.json())
      .switchMap(data => Observable.of(data))
      .subscribe(
      restaurant => this.restaurant$.next(restaurant),
      err => this.restaurant$.next(err)
    );
  }

  get restaurant(): Subject<any>{
    return this.restaurant$;
  }
}