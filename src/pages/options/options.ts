import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OptionsService } from '../../service/options.service';
import { Payload } from '../../entity/payload';
import { Options } from '../../entity/options';

@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage implements OnInit {
  options: Options;
  constructor(
    public navCtrl: NavController,
    private optionsService: OptionsService,
  ) { }

  ngOnInit(): void {
    this.options = this.createOptions(this.optionsService.options);
  }

  onChange() {
    let payload = this.createPayload(this.options);
    this.optionsService.options = payload;
  }
  private createOptions(payload: Payload): Options {
    let options: Options = {
      prices: payload.price.split(','),
      radius: Math.abs(payload.radius / 1609.344),
      categories: payload.categories? payload.categories.split(',') : []
    }
    return options;
  }
  private createPayload(options) {
    let payload: any = {};
    if (options.prices.length === 0) {
      payload.price = '1,2,3,4';
    } else {
      payload.price = options.prices.join(',');
    }

    payload.radius = options.radius * 1609.344;
    if (options.categories.length > 0) {
      payload.categories = options.categories.join(',');
    }
    return payload;
  }
}
