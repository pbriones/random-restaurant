import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { OptionsPage } from '../options/options';
import { OptionsService } from '../../service/options.service';
import { RestaurantService } from '../../service/restaurant.service';
import { GeolocationService } from '../../service/geolocation.service';
import 'rxjs/add/operator/distinctUntilChanged';
import { PayloadService } from "../../service/payload.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [RestaurantService]
})
export class HomePage implements OnInit {
  private restaurant: any;
  private isLoading: boolean = true;
  private isErr: boolean = false;
  private message: string = 'Nothing found. May want to change the filters!';
  private coordinates: Coordinates;
  private directions: string;
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
    // this.restaurantService.restaurant
    //   .subscribe(restaurant => {
    //     this.isLoading = false;
    //     this.isErr = false;
    //     if (restaurant.ok === false) {
    //       this.isErr = true;
    //     } else {
    //       let destination = `&daddr=${restaurant.location.destination}`;
    //       let origin = `?saddr=${restaurant.location.origin}`;
    //       this.restaurant = restaurant;
    //       this.directions = `${this.mapsUrl}${origin}${destination}`;
    //     }
    //   })
    this.geolocationService.getCurrentPosition()
      .subscribe(coords => {
        this.coordinates = coords;
        this.optionsService.getOptions()
          .subscribe(() => {
            this.getRestaurant();
          });
      });
    
    this.payloadService.payload.subscribe(console.log)
  }

  goToOptions(): void {
    this.navCtrl.push(OptionsPage);
  }
  goToLink(link: string): void {
    location.href = link;
  }

  getRestaurant(): void {
    let coordinates = this.coordinates;
    if (coordinates.latitude !== 0 &&
      coordinates.longitude !== 0) {
      let geolocation = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      };
      let query = Object.assign(
        {},
        geolocation,
        this.optionsService.options
      );
      this.isLoading = true;
      this.restaurantService.getRestaurant(query)
    }
  }

}
