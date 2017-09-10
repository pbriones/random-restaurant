import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule } from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OptionsPage } from '../pages/options/options';

import { OptionsService } from '../service/options.service';
import { GeolocationService } from '../service/geolocation.service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { PayloadService } from '../service/payload.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OptionsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
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
    GeolocationService,
    StatusBar,
    SplashScreen,
    Geolocation,
    PayloadService
  ]
})
export class AppModule {}
