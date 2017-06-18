import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EmployeeAddPage } from "./employee-add/employee-add";
import { DivisionService } from "../../../services/division.service";
import { DivisionModel } from "../../../models/division";
import { EmployeeService } from "../../../services/employee.service";
import { EmployeeModel } from "../../../models/employee";

/**
 * Generated class for the EmployeePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-employee',
  templateUrl: 'employee.html',
})
export class EmployeePage {

  employeeAddPage=EmployeeAddPage;
  public divisionInput:DivisionModel[]=[];
  public employees:EmployeeModel[]=[];
  /*Contructor*/
  constructor(
    public navCtrl: NavController, 
  public navParams: NavParams,
  public modalCtrl:ModalController,
  public divisionService:DivisionService,
  public employeeService:EmployeeService) {
  }
  ngOnInit(){
    /*Get Employee*/
    this.employeeService.getEmployee()
    .then(
      (result)=>{
        this.employees=result;
        console.log(this.employees);
      }
    )
    this.divisionService.getDivision()
    .then(result=>{
      this.divisionInput=result;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeePage');
  }

  addEmployee(){
    let modal= this.modalCtrl.create(this.employeeAddPage,{
      divisionsInput:this.divisionInput
    });
    modal.present();
    modal.onDidDismiss(
      ()=>{
        this.employeeService.getEmployee()
        .then(
          result=>{
            this.employees=result;
          }
        )
        .catch(err=>{console.log(err)})
      }
    )
  }
}
