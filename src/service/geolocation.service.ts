import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { BehaviorSubject } from 'rxjs/behaviorSubject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class GeolocationService {
  private geolocation$: BehaviorSubject<Coordinates> = new BehaviorSubject({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    speed: 0,
    init: true
  });
  constructor(
    private platform: Platform,
    private geolocationService: Geolocation
  ) { };
  getCurrentPosition(): Observable<Coordinates> {
    if (this.platform.is('android')) {
      this.geolocationService.getCurrentPosition()
        .then(pos => this.geolocation$.next(pos.coords));
    } else {
      navigator.geolocation.getCurrentPosition(
        coords => this.geolocation$.next(coords.coords),
        e => this.geolocation$.error('no geolocation')
      );
    }

    return this.geolocation$.asObservable();
  }
  
  get geolocation() {
    return this.geolocation$.getValue();
  }
}