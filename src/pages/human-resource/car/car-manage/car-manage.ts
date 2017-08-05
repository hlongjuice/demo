
import { CarManageService } from './../../../../services/human-resource/car/car-manage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the CarManagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-manage',
  templateUrl: 'car-manage.html',
})
export class CarManagePage {

  selectedType: string;
  carTypes: any[];
  cars: any[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public carService: CarManageService,
    public modalCtrl:ModalController) {
  }

  ngOnInit() {
    this.carTypes=[];
    this.cars = [];
    this.selectedType = 'all';
    this.carService.getCarType()
      .then(
      result => {
        this.carTypes = result;
        console.log(result);
        /*Get All Cars*/
        this.carService.getCar(this.selectedType)
          .then(result => {
            this.cars = result;
          }).catch(err => { console.log(err) })
      }
      ).catch(err => { console.log(err) });
  }

  /*Get Car*/
  getCar() {
    this.carService.getCar(this.selectedType)
      .then(
      result => {
        this.cars = result;
      }
      ).catch(err => { console.log(err) })
  }

  /*Add Car*/
  addCar(){
    let modal=this.modalCtrl.create('CarAddPage',{'carTypes':this.carTypes})
    modal.present();
    modal.onDidDismiss(()=>{
      this.getCar()
    });
  }

}
