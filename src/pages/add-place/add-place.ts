import { Component } from '@angular/core'
import { NgForm } from '@angular/forms';
import { ModalController, LoadingController, ToastController } from 'ionic-angular';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';


@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: 44.970797,
    lng: -93.3315183
  }
  locationIsSet = false;
  imageUrl = '';
  constructor(private modalCtrl: ModalController, private geolocation: Geolocation, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private camera: Camera){}

 onSubmit(form: NgForm){
  console.log(form.value);
 }

  onOpenMap(){
   const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.locationIsSet});
   modal.present();
   //listen to data from the modal
   modal.onDidDismiss(
     data => {
       if (data) {
         this.location = data.location;
         this.locationIsSet = true;
       }
     }
   );
 }


//method uses native giolocation to extract current location coordinates
 onLocate(){
   const loading = this.loadingCtrl.create({
     content: "Loading"
   });
   loading.present();

   this.geolocation.getCurrentPosition()

   .then(location => {
     loading.dismiss();
     console.log(location);
     this.location.lat = location.coords.latitude;
     this.location.lng = location.coords.longitude;
     this.locationIsSet = true;

   })
   .catch(error =>{
     loading.dismiss();
     const toast = this.toastCtrl.create({
       message: 'Could not get location, please select one manually!',
       duration: 2500,
       position: 'top'
     });
     toast.present();
   });
 }

 onTakePhoto(){
  this.camera.getPicture({
    encodingType: this.camera.EncodingType.JPEG,
    correctOrientation: true
  })
  .then(
    imageData => {
      this.imageUrl = imageData;
    }
  )
  .catch( err => {
    console.log(err);
  });
 }

}
