import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { OptionsPage } from '../options/options';
import { OptionsService } from '../../service/options.service';
import { RestaurantService } from '../../service/restaurant.service';
import { GeolocationService } from '../../service/geolocation.service';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import { PayloadService } from "../../service/payload.service";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Restaurant } from '../../entity/restaurant';
import { Payload } from '../../entity/payload';
import { Coords } from '../../entity/coords';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [RestaurantService]
})
export class HomePage implements OnInit {
  restaurant: Restaurant;
  isLoading: boolean = true;
  isErr: boolean = false;
  message: string = 'Nothing found. May want to change the filters!';
  directions: string;
  private newRestaurant$ = new Subject<boolean>();
  private coordinates: Coordinates;
  private mapsUrl: string = 'https://maps.apple.com/maps';
  constructor(
    public navCtrl: NavController,
    private popoverCtrl: PopoverController,
    private restaurantService: RestaurantService,
    private optionsService: OptionsService,
    private geolocationService: GeolocationService,
    private payloadService: PayloadService
  ) { }

  ngOnInit(): void {
    this.geolocationService
      .getCurrentPosition()
      .map(position => this.getLatLong(position))
      .filter(coords => coords.latitude !== 0 &&
        coords.longitude !== 0)
      .switchMap(coords => this.getPayload(coords))
      .switchMap(payload => this.newRestaurant(payload))
      .do(() => this.isLoading = true)
      .switchMap(payload => this.restaurantService
        .getRestaurant(payload))
      .do(() => this.isLoading = false)
      .subscribe(restaurant => this.handleRestaurant(restaurant),
      () => this.isErr = true);
  }

  goToOptions(): void {
    this.navCtrl.push(OptionsPage);
  }
  goToMap(restaurant: any): void {
    let destination = `&daddr=${restaurant.location.destination}`;
    let origin = `?saddr=${restaurant.location.origin}`;
    location.href = `${this.mapsUrl}${origin}${destination}`;;
  }
  call(phone: string): void {
    location.href = `tel:${phone}`;
  }

  getRestaurant(): void {
    this.newRestaurant$.next(true);
  }
  private getLatLong(position: Coordinates): Coords {
    return {
      latitude: position.latitude,
      longitude: position.longitude
    }
  }

  private handleRestaurant(restaurant: any): void {
    if (!restaurant) {
      this.isErr = true;
      return;
    };
    this.isErr = false;
    this.restaurant = restaurant;
  }

  private getPayload(coords: Coords): Observable<Payload> {
    return this.payloadService.payload
      .startWith({ price: '1,2', radius: 5 * 1609.344 })
      .map(payload => Object.assign({}, payload, coords));
  }

  private newRestaurant(payload: Payload): Observable<Payload> {
    return this.newRestaurant$
      .asObservable()
      .startWith(true)
      .map(() => payload);
  }
}
