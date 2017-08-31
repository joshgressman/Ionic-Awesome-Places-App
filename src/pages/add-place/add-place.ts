import { Component } from '@angular/core'
import { NgForm } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location';

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: 44.970797,
    lng: -93.3315183
  }

  constructor(private modalCtrl: ModalController){}

 onSubmit(form: NgForm){
  console.log(form.value);
 }

  onOpenMap(){
   const modal = this.modalCtrl.create(SetLocationPage, {location: this.location});
   modal.present();
   //listen to data from the modal
   modal.onDidDismiss(
     data => {
       if (data) {
         this.location = data.location;
       }
     }
   );
 }

}
