import { DivisionService } from './../../../../services/division.service';
import { EmployeeService } from './../../../../services/employee.service';
import { DateService } from './../../../../services/date.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the CarRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-request',
  templateUrl: 'car-request.html',
})
export class CarRequestPage {


  allEmployees:any;
  divisions:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dateService:DateService,
    public modalCtrl:ModalController,
    public employeeService:EmployeeService,
    public divisionService:DivisionService
  ) {
  }

  ngOnInit(){
    /* Get Employee */
    this.employeeService.getAllEmployeeWithOutPage()
    .then(result=>{
      this.allEmployees=result;
    }).catch(err=>console.log(err))
    /* Get Division */
    this.divisionService.getDivision()
    .then(result=>{this.divisions=result})
    .catch(err=>{console.log(err)})
  }

  /*Get Details*/
  getDetails(){

  }

  /*Add Request*/
  addRequest(){
    console.log('Yo!!');
    let addModal=this.modalCtrl.create('AddRequestPage'
    ,{
      'employees':this.allEmployees,
      'divisions':this.divisions
    });
    addModal.present();
  }

}
