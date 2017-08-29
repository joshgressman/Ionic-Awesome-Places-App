import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Location } from '../../models/location';

@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {
   location: Location;
   marker: Location;
  //accessing navigation object set in params from add-place page
  constructor(private navParams: NavParams){
    this.location = this.navParams.get('location');
  }
  //map location will be handled by an Angular package
  //   npm install - - save @agm/core
  onSetMarker(event: any){
    this.marker = new Location(event.coords.lat, event.coords.lng)
    console.log(this.marker);
  }
}
