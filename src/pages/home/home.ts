import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { NavController } from 'ionic-angular';
import { RestaurantService } from '../../service/restaurant.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [RestaurantService]
})
export class HomePage implements OnInit{
  private restaurant$: Observable<any>;
  constructor(
    public navCtrl: NavController,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void{
    let query = {
      latitude: 39.1812610,
      longitude: -84.2715900
    };
    this.restaurant$ = this.restaurantService
      .getRestaurant(query);
    this.restaurant$
      .subscribe(restaurant => console.log(restaurant));
  }

}
