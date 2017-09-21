import { Injectable } from '@angular/core';

@Injectable()
export class OptionsService {
  private _formValue: { [key: string]: any };
  constructor() {
    this._formValue = {
      prices: ['1', '2'],
      radius: 5,
      categories: []
    }
  }
  get formValue() {
    return this._formValue;
  }
  set formValue(value: { [key: string]: any }) {
    this._formValue = value;
  }
}