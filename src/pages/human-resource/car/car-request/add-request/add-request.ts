import { DateService } from './../../../../../services/date.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the AddRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-request',
  templateUrl: 'add-request.html',
})
export class AddRequestPage {

  items: string[];
  allEmployees: any[];
  requestEmployees: any[];
  divisions: any[];
  selectedDivision: number;
  selectedPassengerDivision: number[];
  selectedEmployee: number;
  selectedCarType: number;
  rank: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  hasPassenger: boolean;
  passengers: any[];
  passengerNumber: number;
  passengerRow: number[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dateService: DateService,
    public modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    this.hasPassenger = false;
    this.passengerNumber = 0;
    this.passengerRow = [];
    this.passengers = [];
    this.selectedPassengerDivision = [];
    this.startDate = this.dateService.getDate();
    this.endDate = this.dateService.getDate();
    this.startTime = this.dateService.getTime().currentTime;
    this.endTime = this.dateService.getTime().currentTime;
    this.allEmployees = this.navParams.data.employees;
    this.divisions = this.navParams.data.divisions;
    console.log(this.allEmployees);
  }


  /* Get Employee who can request */
  getRequestEmployees() {
    console.log(this.selectedDivision);
    this.requestEmployees = this.allEmployees.filter(item => {
      return item.division_id == this.selectedDivision && item.salary_type_id == 1 //1 is monthly
    });

    console.log(this.requestEmployees);

  }

  /* Set To Passenger Input */
  setPassengerInput(event) {
    let modal = this.modalCtrl.create('PassengerListPage', {
      'passengers': this.passengers
    })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        console.log(result);
      }
    })
    console.log(event);

  }
  /* Passenger */
  /* Get Division Employee */
  getDivisionEmployees(index) {
    this.passengers = this.allEmployees.filter(item => {
      return item.division_id == this.selectedPassengerDivision[index];
    })
    console.log(this.passengers);
  }

  /* Set Passengers */
  setPassengers() {
    console.log('In Set passenger')
    this.passengerRow.push(0);
    this.passengerNumber++;
  }

  /* deletePassenger */
  deletePassenger(index) {
    this.passengerRow.splice(index, 1);
  }

}
