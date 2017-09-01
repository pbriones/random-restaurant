import { NgModule, ErrorHandler } from '@angular/core';
import {HttpModule } from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OptionsPage } from '../pages/options/options';

import { OptionsService } from '../service/options.service';
import { GeolocationService } from '../service/geolocation.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OptionsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OptionsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    OptionsService,
    GeolocationService
  ]
})
export class AppModule {}
