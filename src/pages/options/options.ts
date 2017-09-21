import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OptionsService } from '../../service/options.service';
import { Payload } from '../../entity/payload';
import { Options } from '../../entity/options';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { PayloadService } from '../../service/payload.service';

@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage implements OnInit {
  optionsForm: FormGroup;
  payload$ = new Subject<Payload>();
  constructor(
    public navCtrl: NavController,
    private optionsService: OptionsService,
    private payloadService: PayloadService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.optionsForm = this.createOptionsForm();
    this.optionsForm
      .setValue(this.optionsService.formValue);
    this.payloadService.payload = this.optionsForm
      .valueChanges
      .debounceTime(300)
      .do(value => this.optionsService.formValue = value)
      .map(options => this.createPayload(options));  
  }

  private createPayload(options: any): Payload{
    return {
      radius: options.radius * 1609.344,
      price: this.arrayToCSV(options.prices),
      categories: this.arrayToCSV(options.categories)
    }
  }

  private arrayToCSV(array: any[]): string {
    return array.join(',');
  }

  private createOptionsForm(): FormGroup {
    return this.formBuilder.group({
      prices: [[]],
      radius: 1,
      categories: [[]]
    })
  }
}
