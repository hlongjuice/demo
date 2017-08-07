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
  requestEmployee: any;
  requestEmployeeID: any;
  divisions: any[];
  selectedDivision: number;
  selectedEmployee: number;
  selectedCarType: number;
  rank: string;
  rankID: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  hasPassenger: boolean;
  passengers: any[];
  passengerNumber: number;
  passengerInputs: any[];
  row: number;
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
    this.passengers = [];
    this.startDate = this.dateService.getDate();
    this.endDate = this.dateService.getDate();
    this.startTime = this.dateService.getTime().currentTime;
    this.endTime = this.dateService.getTime().currentTime;
    this.allEmployees = this.navParams.data.employees;
    this.divisions = this.navParams.data.divisions;
    this.passengerInputs = [{
      'divisions': this.divisions,
      'employee': ''
    }];
  }

  /* Get Employee who can request */
  getRequestEmployees() {
    this.requestEmployees = this.allEmployees.filter(item => {
      return item.division_id == this.selectedDivision && item.salary_type_id == 1 //1 is monthly
    });
    let modal = this.modalCtrl.create('RequestEmployeeListPage', {
      'employees': this.requestEmployees
    })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.requestEmployee = result.name + ' ' + result.lastname;//recieve employee from modal
        this.requestEmployeeID = result.em_id;
        this.rank = result.rank.name;
        console.log(result);
      }
    })
  }

  /***** Passenger ********/
  /* Set To Passenger Input */
  setPassengerInput(event, index) {
    console.log(event)
    let modal = this.modalCtrl.create('PassengerListPage', {
      'passengers': this.passengers
    })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        //  this.selectedPassengers[index]=result.name+' '+result.lastname;
      }
    })
  }

  /* Get Division Employee */
  getDivisionPassengers(index:number) {
    console.log(index);
    let divisionPassenger = new Promise((resolve, reject) => {
      this.passengers = this.allEmployees.filter(item => {
        return item.division_id == this.passengerInputs[index].division;
      })
      resolve(this.passengers);
    });
    divisionPassenger.then((result) => {
      let modal = this.modalCtrl.create('PassengerListPage', { 'passengers': result })
      modal.present();
      modal.onDidDismiss(result => {
        if (result) {
          console.log(index)
          this.passengerInputs[0].employee = result.name + ' ' + result.lastname;
          console.log(this.passengerInputs[index])
        }
      })
    })


  }

  /* Set Passengers */
  setPassengers() {
    let newInput = {
      'divisions': this.divisions,
      'employee': ''
    }
    this.passengerInputs.push(newInput);
    this.passengerNumber++;
    console.log(this.passengerInputs)
  }

  /* deletePassenger */
  deletePassenger(index) {
    this.passengerInputs.splice(index, 1);
    this.passengerInputs.splice(index, 1);
    this.passengerNumber--;
  }

}
