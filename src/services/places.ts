import { Place } from '../models/place';
import { Location } from '../models/location';
import { Injectable } from '@angular/core';
//ionic storage
import { Storage } from '@ionic/storage';

@Injectable()
export class PlacesService {
  private places: Place[] = [];

  constructor(private storage: Storage){}

  addPlace(title: string, description: string, location: Location, imageUrl: string){
   const place = new Place(title, description, location, imageUrl);
   this.places.push(place);
   //using storage by setting key value pairs
   //'places' is the key this.places[] is the value
   this.storage.set('places', this.places)
   .then(
     data => {
       console.log("place saved to storage", this.storage);
     }
   )
   .catch(
     err => {
       this.places.splice(this.places.indexOf(place, 1));
     }
   )
  }

  loadPlace(){
    return this.places.slice();
  }

  //fetch places from storage
  fetchData(){
    this.storage.get('places')
    .then(
      (places: Place[]) => {
        this.places = places != null ? places : [];
      }
    )
    .catch(
      err => {
        console.log(err)
      }
    )
  }

  deletePlace(index: number){
    this.places.splice(index, 1);
  }

}
