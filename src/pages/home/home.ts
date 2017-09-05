import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place'
import { Place } from '../../models/place';
import { PlacesService } from '../../services/places';
import { PlacePage } from '../place/place';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(public modalCtrl: ModalController, private placesService: PlacesService) {

  }

  ionViewWillEnter(){
    this.places = this.placesService.loadPlace();
  }

  //will open the place page in a modal with the idevidual place data passed within the object
  onOpenPlace(place: Place){
   const modal = this.modalCtrl.create(PlacePage, {place: place});
   modal.present();
  }
}
